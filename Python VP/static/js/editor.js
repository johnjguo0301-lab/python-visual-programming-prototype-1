// Blockly workspace initialization and code generation
const Editor = (() => {
    let workspace = null;
    // python_compressed.js exposes python.pythonGenerator

    function init(blocklyDiv, toolboxDef) {
        workspace = Blockly.inject(blocklyDiv, {
            toolbox: toolboxDef,
            grid: { spacing: 20, length: 3, colour: '#313244', snap: true },
            zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
            trashcan: true,
            renderer: 'zelos',
            theme: Blockly.Theme.defineTheme('darkTheme', {
                base: Blockly.Themes.Classic,
                componentStyles: {
                    workspaceBackgroundColour: '#1e1e2e',
                    toolboxBackgroundColour: '#181825',
                    toolboxForegroundColour: '#cdd6f4',
                    flyoutBackgroundColour: '#313244',
                    flyoutForegroundColour: '#cdd6f4',
                    flyoutOpacity: 0.9,
                    scrollbarColour: '#45475a',
                    scrollbarOpacity: 0.7,
                }
            }),
        });

        // Make flyout stay open — toggle on re-click of same category
        var lastSelectedCategory = null;
        var toolboxEl = workspace.getToolbox();
        if (toolboxEl) {
            var origSelect = toolboxEl.selectItemByPosition.bind(toolboxEl);
            toolboxEl.selectItemByPosition = function(position) {
                var items = toolboxEl.getToolboxItems();
                var item = items[position];
                if (item && item === lastSelectedCategory) {
                    // Re-clicked same category — close flyout
                    workspace.getFlyout().hide();
                    toolboxEl.clearSelection();
                    lastSelectedCategory = null;
                } else {
                    origSelect(position);
                    lastSelectedCategory = item;
                }
            };
            // Override setSelectedItem for click-based selection
            var origSetSelected = toolboxEl.setSelectedItem.bind(toolboxEl);
            toolboxEl.setSelectedItem = function(oldItem, newItem) {
                if (newItem && newItem === lastSelectedCategory) {
                    workspace.getFlyout().hide();
                    toolboxEl.clearSelection();
                    lastSelectedCategory = null;
                    return;
                }
                origSetSelected(oldItem, newItem);
                lastSelectedCategory = newItem;
            };
        }

        workspace.addChangeListener(() => {
            updateCode();
        });

        return workspace;
    }

    // List of block types that act as event hat blocks (entry points)
    const EVENT_BLOCKS = ['event_start', 'event_key_pressed'];

    // Auto-detect needed stdlib imports from generated code
    function addAutoImports(code) {
        if (!code.trim()) return code;
        var imports = [];
        // Check for math.* usage (but not already imported)
        if (/\bmath\./.test(code) && !/^import math$/m.test(code)) {
            imports.push('import math');
        }
        // Check for random.* usage
        if (/\brandom\./.test(code) && !/^import random$/m.test(code)) {
            imports.push('import random');
        }
        // Check for time.* usage
        if (/\btime\./.test(code) && !/^import time$/m.test(code)) {
            imports.push('import time');
        }
        // Check for sys.* usage
        if (/\bsys\./.test(code) && !/^import sys$/m.test(code)) {
            imports.push('import sys');
        }
        if (imports.length > 0) {
            return imports.join('\n') + '\n\n' + code;
        }
        return code;
    }

    // Only generate code from blocks inside event hat blocks
    function generateFromEvents() {
        if (!workspace) return '';
        const generator = python.pythonGenerator;
        var topBlocks = workspace.getTopBlocks(true);
        var codeChunks = [];
        for (var i = 0; i < topBlocks.length; i++) {
            var block = topBlocks[i];
            if (EVENT_BLOCKS.indexOf(block.type) === -1) continue;

            // For event_start: generate code from the chain of blocks below it
            if (block.type === 'event_start') {
                var next = block.getNextBlock();
                if (next) {
                    var code = generator.blockToCode(next);
                    if (typeof code === 'string' && code.trim()) {
                        codeChunks.push(code);
                    }
                }
            } else {
                // Other event blocks (like event_key_pressed) use statement inputs
                var code = generator.blockToCode(block);
                if (typeof code === 'string' && code.trim()) {
                    codeChunks.push(code);
                }
            }
        }
        var raw = codeChunks.join('');
        // Remove inline import statements that blocks emit (we auto-add them at top)
        raw = raw.replace(/^import (time|sys|math|random)\n/gm, '');
        return addAutoImports(raw);
    }

    function updateCode() {
        if (!workspace) return '';
        var code = generateFromEvents();
        const codeEl = document.getElementById('code-preview');
        if (codeEl) {
            codeEl.textContent = code || '# Place blocks inside a "when program starts" block!';
            if (window.hljs) {
                codeEl.removeAttribute('data-highlighted');
                hljs.highlightElement(codeEl);
            }
        }
        return code;
    }

    function getCode() {
        if (!workspace) return '';
        return generateFromEvents();
    }

    function getWorkspaceJSON() {
        if (!workspace) return '{}';
        const state = Blockly.serialization.workspaces.save(workspace);
        return JSON.stringify(state);
    }

    function loadWorkspaceJSON(json) {
        if (!workspace) return;
        try {
            const state = typeof json === 'string' ? JSON.parse(json) : json;
            Blockly.serialization.workspaces.load(state, workspace);
        } catch (e) {
            console.error('Failed to load workspace:', e);
        }
    }

    function clearWorkspace() {
        if (workspace) workspace.clear();
    }

    function getWorkspace() { return workspace; }

    // Flyout auto-hide setting: when false, flyout stays open even during drag
    var flyoutAutoHide = true;
    function setFlyoutAutoHide(val) {
        flyoutAutoHide = val;
        if (!workspace) return;
        var flyout = workspace.getFlyout();
        if (flyout) {
            flyout.autoClose = val;
        }
    }

    return { init, getCode, updateCode, getWorkspaceJSON, loadWorkspaceJSON, clearWorkspace, getWorkspace, setFlyoutAutoHide };
})();
