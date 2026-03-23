// Theme customizer - Scratch-inspired color palettes
const Themes = (() => {
    const palettes = {
        scratch: {
            '--bg-base': '#f9f9f9', '--bg-surface': '#ffffff', '--bg-deep': '#e8edf1',
            '--border': '#d9d9d9', '--border-hover': '#b5b5b5',
            '--text': '#575e75', '--text-muted': '#7c87a5',
            '--accent': '#855cd6', '--accent-hover': '#6d4aaf',
            '--header-bg': '#855cd6', '--header-text': '#ffffff',
            '--green': '#4caf50', '--green-hover': '#45a049',
            '--red': '#ff6680', '--red-hover': '#ff4d6a',
            '--yellow': '#ffbf00',
            '--btn-bg': '#ffffff', '--btn-hover': '#e9eef2',
            '--cat-motion': '#4c97ff', '--cat-looks': '#9966ff',
            '--cat-sound': '#cf63cf', '--cat-events': '#ffbf00',
            '--cat-control': '#ffab19', '--cat-sensing': '#5cb1d6',
            '--cat-operators': '#59c059', '--cat-variables': '#ff8c1a',
            '--cat-myblocks': '#ff6680',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.07)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
            '--surface-alpha': 'rgba(255,255,255,0.95)',
            blocklyBg: '#ffffff', toolboxBg: '#f9f9f9', toolboxText: '#575e75',
            flyoutBg: '#e9eef2', hljs: 'github', gridColour: '#e8e8e8'
        },
        scratchDark: {
            '--bg-base': '#1e1e2e', '--bg-surface': '#252535', '--bg-deep': '#181825',
            '--border': '#3a3a4a', '--border-hover': '#4a4a5a',
            '--text': '#e0e0e8', '--text-muted': '#a0a0b8',
            '--accent': '#9370db', '--accent-hover': '#7b5fc4',
            '--header-bg': '#6d4aaf', '--header-text': '#ffffff',
            '--green': '#4caf50', '--green-hover': '#45a049',
            '--red': '#ff6680', '--red-hover': '#ff4d6a',
            '--yellow': '#ffbf00',
            '--btn-bg': '#3a3a4a', '--btn-hover': '#4a4a5a',
            '--cat-motion': '#4c97ff', '--cat-looks': '#9966ff',
            '--cat-sound': '#cf63cf', '--cat-events': '#ffbf00',
            '--cat-control': '#ffab19', '--cat-sensing': '#5cb1d6',
            '--cat-operators': '#59c059', '--cat-variables': '#ff8c1a',
            '--cat-myblocks': '#ff6680',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.25)',
            '--surface-alpha': 'rgba(30,30,46,0.95)',
            blocklyBg: '#252535', toolboxBg: '#1e1e2e', toolboxText: '#e0e0e8',
            flyoutBg: '#3a3a4a', hljs: 'github-dark', gridColour: '#3a3a4a'
        },
        ocean: {
            '--bg-base': '#f0f7ff', '--bg-surface': '#ffffff', '--bg-deep': '#e3eef8',
            '--border': '#c5d8eb', '--border-hover': '#a0c0e0',
            '--text': '#2c4a6e', '--text-muted': '#5a7a9a',
            '--accent': '#2196f3', '--accent-hover': '#1976d2',
            '--header-bg': '#2196f3', '--header-text': '#ffffff',
            '--green': '#4caf50', '--green-hover': '#45a049',
            '--red': '#f44336', '--red-hover': '#e53935',
            '--yellow': '#ff9800',
            '--btn-bg': '#e3eef8', '--btn-hover': '#c5d8eb',
            '--cat-motion': '#4c97ff', '--cat-looks': '#9966ff',
            '--cat-sound': '#cf63cf', '--cat-events': '#ffbf00',
            '--cat-control': '#ffab19', '--cat-sensing': '#5cb1d6',
            '--cat-operators': '#59c059', '--cat-variables': '#ff8c1a',
            '--cat-myblocks': '#ff6680',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.07)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
            '--surface-alpha': 'rgba(255,255,255,0.95)',
            blocklyBg: '#ffffff', toolboxBg: '#f0f7ff', toolboxText: '#2c4a6e',
            flyoutBg: '#e3eef8', hljs: 'github', gridColour: '#e0e8f0'
        },
        forest: {
            '--bg-base': '#f0f7f0', '--bg-surface': '#ffffff', '--bg-deep': '#e3f0e3',
            '--border': '#c5dbc5', '--border-hover': '#a0c0a0',
            '--text': '#2c4a2c', '--text-muted': '#5a7a5a',
            '--accent': '#4caf50', '--accent-hover': '#388e3c',
            '--header-bg': '#4caf50', '--header-text': '#ffffff',
            '--green': '#4caf50', '--green-hover': '#45a049',
            '--red': '#f44336', '--red-hover': '#e53935',
            '--yellow': '#ff9800',
            '--btn-bg': '#e3f0e3', '--btn-hover': '#c5dbc5',
            '--cat-motion': '#4c97ff', '--cat-looks': '#9966ff',
            '--cat-sound': '#cf63cf', '--cat-events': '#ffbf00',
            '--cat-control': '#ffab19', '--cat-sensing': '#5cb1d6',
            '--cat-operators': '#59c059', '--cat-variables': '#ff8c1a',
            '--cat-myblocks': '#ff6680',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.07)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
            '--surface-alpha': 'rgba(255,255,255,0.95)',
            blocklyBg: '#ffffff', toolboxBg: '#f0f7f0', toolboxText: '#2c4a2c',
            flyoutBg: '#e3f0e3', hljs: 'github', gridColour: '#e0e8e0'
        },
        sunset: {
            '--bg-base': '#fff8f0', '--bg-surface': '#ffffff', '--bg-deep': '#f8f0e8',
            '--border': '#e8d8c8', '--border-hover': '#d0c0a0',
            '--text': '#5a4030', '--text-muted': '#8a7060',
            '--accent': '#ff7043', '--accent-hover': '#f4511e',
            '--header-bg': '#ff7043', '--header-text': '#ffffff',
            '--green': '#4caf50', '--green-hover': '#45a049',
            '--red': '#f44336', '--red-hover': '#e53935',
            '--yellow': '#ffc107',
            '--btn-bg': '#f8f0e8', '--btn-hover': '#e8d8c8',
            '--cat-motion': '#4c97ff', '--cat-looks': '#9966ff',
            '--cat-sound': '#cf63cf', '--cat-events': '#ffbf00',
            '--cat-control': '#ffab19', '--cat-sensing': '#5cb1d6',
            '--cat-operators': '#59c059', '--cat-variables': '#ff8c1a',
            '--cat-myblocks': '#ff6680',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.07)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
            '--surface-alpha': 'rgba(255,255,255,0.95)',
            blocklyBg: '#ffffff', toolboxBg: '#fff8f0', toolboxText: '#5a4030',
            flyoutBg: '#f8f0e8', hljs: 'github', gridColour: '#f0e8e0'
        }
    };

    function apply(name) {
        const p = palettes[name];
        if (!p) return;
        const root = document.documentElement;
        Object.keys(p).forEach(key => {
            if (key.startsWith('--')) root.style.setProperty(key, p[key]);
        });

        // Update Blockly workspace theme
        const ws = Editor.getWorkspace();
        if (ws) {
            const theme = Blockly.Theme.defineTheme('custom_' + name, {
                base: Blockly.Themes.Classic,
                componentStyles: {
                    workspaceBackgroundColour: p.blocklyBg,
                    toolboxBackgroundColour: p.toolboxBg,
                    toolboxForegroundColour: p.toolboxText,
                    flyoutBackgroundColour: p.flyoutBg,
                    flyoutForegroundColour: p.toolboxText,
                    flyoutOpacity: 0.9,
                    scrollbarColour: p['--border-hover'],
                    scrollbarOpacity: 0.7,
                }
            });
            ws.setTheme(theme);

            // Update grid dot colour
            var gridColour = p.gridColour || '#313244';
            var svg = ws.getParentSvg();
            if (svg) {
                var patterns = svg.querySelectorAll('pattern[id*="blocklyGridPattern"] line');
                patterns.forEach(function(line) { line.setAttribute('stroke', gridColour); });
                // Also try direct line elements in defs
                var defs = svg.querySelector('defs');
                if (defs) {
                    defs.querySelectorAll('line').forEach(function(line) {
                        line.setAttribute('stroke', gridColour);
                    });
                }
            }
        }

        // Swap highlight.js theme
        const hljsLink = document.getElementById('hljs-theme');
        if (hljsLink) {
            const style = p.hljs === 'github'
                ? 'github.min.css'
                : 'github-dark.min.css';
            hljsLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/' + style;
        }

        // Re-highlight code
        const codeEl = document.getElementById('code-preview');
        if (codeEl && window.hljs) {
            codeEl.removeAttribute('data-highlighted');
            hljs.highlightElement(codeEl);
        }

        localStorage.setItem('pvp-theme', name);
    }

    function init() {
        const saved = localStorage.getItem('pvp-theme') || 'scratch';
        const select = document.getElementById('theme-select');
        if (select) select.value = saved;
        apply(saved);
    }

    return { apply, init, palettes };
})();
