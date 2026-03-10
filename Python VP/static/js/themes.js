// Theme customizer - 5 color palettes
const Themes = (() => {
    const palettes = {
        catppuccin: {
            '--bg-base': '#1e1e2e', '--bg-surface': '#181825', '--bg-deep': '#11111b',
            '--border': '#313244', '--border-hover': '#45475a',
            '--text': '#cdd6f4', '--text-muted': '#a6adc8',
            '--accent': '#89b4fa', '--accent-hover': '#74c7ec',
            '--green': '#a6e3a1', '--green-hover': '#94e2d5',
            '--red': '#f38ba8', '--red-hover': '#eba0ac',
            '--yellow': '#f9e2af',
            '--btn-bg': '#313244', '--btn-hover': '#45475a',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.25)',
            '--surface-alpha': 'rgba(24,24,37,0.85)',
            blocklyBg: '#1e1e2e', toolboxBg: '#181825', toolboxText: '#cdd6f4',
            flyoutBg: '#313244', hljs: 'github-dark', gridColour: '#313244'
        },
        ocean: {
            '--bg-base': '#0d1b2a', '--bg-surface': '#1b2838', '--bg-deep': '#0a1520',
            '--border': '#1e3a5f', '--border-hover': '#2a5080',
            '--text': '#c8dce8', '--text-muted': '#7a9bb5',
            '--accent': '#48b5e0', '--accent-hover': '#6dcff6',
            '--green': '#5cb85c', '--green-hover': '#7dd87d',
            '--red': '#e06c75', '--red-hover': '#f09098',
            '--yellow': '#e5c07b',
            '--btn-bg': '#1e3a5f', '--btn-hover': '#2a5080',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.18)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.22)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.45), 0 4px 10px rgba(0,0,0,0.28)',
            '--surface-alpha': 'rgba(27,40,56,0.85)',
            blocklyBg: '#0d1b2a', toolboxBg: '#1b2838', toolboxText: '#c8dce8',
            flyoutBg: '#1e3a5f', hljs: 'github-dark', gridColour: '#1e3a5f'
        },
        forest: {
            '--bg-base': '#1a2e1a', '--bg-surface': '#152415', '--bg-deep': '#0f1c0f',
            '--border': '#2d4a2d', '--border-hover': '#3d6b3d',
            '--text': '#d4e8d4', '--text-muted': '#8aab8a',
            '--accent': '#7bc67b', '--accent-hover': '#9ddb9d',
            '--green': '#5cb85c', '--green-hover': '#7dd87d',
            '--red': '#d9534f', '--red-hover': '#e8807d',
            '--yellow': '#d4b85c',
            '--btn-bg': '#2d4a2d', '--btn-hover': '#3d6b3d',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.16)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.32), 0 2px 4px rgba(0,0,0,0.2)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.42), 0 4px 10px rgba(0,0,0,0.26)',
            '--surface-alpha': 'rgba(21,36,21,0.85)',
            blocklyBg: '#1a2e1a', toolboxBg: '#152415', toolboxText: '#d4e8d4',
            flyoutBg: '#2d4a2d', hljs: 'github-dark', gridColour: '#2d4a2d'
        },
        sunset: {
            '--bg-base': '#2b1d2e', '--bg-surface': '#231728', '--bg-deep': '#1a1020',
            '--border': '#4a2d52', '--border-hover': '#6b3d75',
            '--text': '#e8d4e8', '--text-muted': '#ab8aab',
            '--accent': '#e07bac', '--accent-hover': '#f09dc4',
            '--green': '#a6d189', '--green-hover': '#c4e4a8',
            '--red': '#e06c75', '--red-hover': '#f09098',
            '--yellow': '#f0c674',
            '--btn-bg': '#4a2d52', '--btn-hover': '#6b3d75',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.18)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.22)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.45), 0 4px 10px rgba(0,0,0,0.28)',
            '--surface-alpha': 'rgba(35,23,40,0.85)',
            blocklyBg: '#2b1d2e', toolboxBg: '#231728', toolboxText: '#e8d4e8',
            flyoutBg: '#4a2d52', hljs: 'github-dark', gridColour: '#4a2d52'
        },
        light: {
            '--bg-base': '#f5f5f5', '--bg-surface': '#e8e8e8', '--bg-deep': '#ffffff',
            '--border': '#d0d0d0', '--border-hover': '#b0b0b0',
            '--text': '#2c2c2c', '--text-muted': '#666666',
            '--accent': '#2563eb', '--accent-hover': '#1d4ed8',
            '--green': '#16a34a', '--green-hover': '#15803d',
            '--red': '#dc2626', '--red-hover': '#b91c1c',
            '--yellow': '#ca8a04',
            '--btn-bg': '#d0d0d0', '--btn-hover': '#b0b0b0',
            '--shadow-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
            '--shadow-md': '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.07)',
            '--shadow-lg': '0 8px 30px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
            '--surface-alpha': 'rgba(232,232,232,0.9)',
            blocklyBg: '#f5f5f5', toolboxBg: '#e8e8e8', toolboxText: '#2c2c2c',
            flyoutBg: '#d0d0d0', hljs: 'github', gridColour: '#c0c0c0'
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
        const saved = localStorage.getItem('pvp-theme') || 'catppuccin';
        const select = document.getElementById('theme-select');
        if (select) select.value = saved;
        apply(saved);
    }

    return { apply, init, palettes };
})();
