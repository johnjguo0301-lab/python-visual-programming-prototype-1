// Main app initialization - wires everything together
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Blockly editor
    Editor.init('blockly-div', toolbox);

    // Initialize theme (after Blockly so workspace exists)
    Themes.init();

    // Block search
    BlockSearch.buildIndex(toolbox);
    var searchInput = document.getElementById('block-search');
    searchInput.addEventListener('input', function() {
        var query = searchInput.value;
        if (!query.trim()) { BlockSearch.hideResults(); return; }
        BlockSearch.showResults(BlockSearch.search(query), Editor.getWorkspace());
    });
    searchInput.addEventListener('blur', function() {
        setTimeout(function() { BlockSearch.hideResults(); }, 200);
    });

    // Clean up button
    document.getElementById('btn-cleanup').addEventListener('click', function() {
        var ws = Editor.getWorkspace();
        if (ws) ws.cleanUp();
    });

    // Theme selector
    document.getElementById('theme-select').addEventListener('change', (e) => {
        Themes.apply(e.target.value);
    });

    // Initialize runner
    Runner.init();

    // Console buttons
    document.getElementById('btn-run').addEventListener('click', () => {
        Runner.run(Editor.getCode());
    });
    document.getElementById('btn-stop').addEventListener('click', () => Runner.stop());
    document.getElementById('btn-clear').addEventListener('click', () => Runner.clearConsole());

    // === Main Menu ===
    var menuBtn = document.getElementById('btn-menu');
    var mainMenu = document.getElementById('main-menu');
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mainMenu.style.display = mainMenu.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', function() { mainMenu.style.display = 'none'; });
    mainMenu.addEventListener('click', function(e) { e.stopPropagation(); });
    // Menu items
    document.getElementById('menu-new').addEventListener('click', function() {
        mainMenu.style.display = 'none';
        if (confirm('Start a new project? Unsaved changes will be lost.')) {
            Editor.clearWorkspace();
            document.getElementById('project-name').value = 'Untitled Project';
            Runner.clearConsole();
            delete sessionStorage.currentProjectId;
        }
    });
    document.getElementById('menu-save').addEventListener('click', function() {
        mainMenu.style.display = 'none';
        Projects.save();
    });
    document.getElementById('menu-load').addEventListener('click', function() {
        mainMenu.style.display = 'none';
        Projects.showLoadModal();
    });
    document.getElementById('menu-login').addEventListener('click', function() {
        mainMenu.style.display = 'none';
        Auth.showModal('login');
    });
    document.getElementById('menu-register').addEventListener('click', function() {
        mainMenu.style.display = 'none';
        Auth.showModal('register');
    });
    document.getElementById('menu-logout').addEventListener('click', function() {
        mainMenu.style.display = 'none';
        Auth.logout();
    });
    document.getElementById('menu-settings').addEventListener('click', function() {
        mainMenu.style.display = 'none';
        document.getElementById('settings-modal').style.display = 'flex';
    });

    // === Settings ===
    var flyoutAutoHide = document.getElementById('setting-flyout-autohide');
    flyoutAutoHide.checked = localStorage.getItem('pvp-flyout-autohide') !== 'false';
    flyoutAutoHide.addEventListener('change', function() {
        localStorage.setItem('pvp-flyout-autohide', flyoutAutoHide.checked);
        Editor.setFlyoutAutoHide(flyoutAutoHide.checked);
    });
    Editor.setFlyoutAutoHide(flyoutAutoHide.checked);

    // === Code Panel Toggle ===
    var codePanel = document.getElementById('code-panel');
    var toggleCodeBtn = document.getElementById('btn-toggle-code');
    var editorArea = document.getElementById('editor-area');
    toggleCodeBtn.addEventListener('click', function() {
        var isHidden = codePanel.classList.toggle('hidden');
        editorArea.classList.toggle('editor-code-hidden', isHidden);
        toggleCodeBtn.classList.toggle('panel-hidden', isHidden);
        toggleCodeBtn.innerHTML = isHidden ? '&lsaquo;' : '&rsaquo;';
        setTimeout(function() { Blockly.svgResize(Editor.getWorkspace()); }, 250);
    });

    // === Blockly Controls Toggle ===
    var controlsVisible = true;
    document.getElementById('btn-toggle-controls').addEventListener('click', function() {
        controlsVisible = !controlsVisible;
        var blocklyDiv = document.getElementById('blockly-div');
        // Blockly zoom controls and trash can be SVG groups or wrapper divs
        var zoomEls = blocklyDiv.querySelectorAll('.blocklyZoom');
        var trashEls = blocklyDiv.querySelectorAll('.blocklyTrash');
        zoomEls.forEach(function(el) { el.style.display = controlsVisible ? '' : 'none'; });
        trashEls.forEach(function(el) { el.style.display = controlsVisible ? '' : 'none'; });
        // Also try the g elements inside the main SVG
        var ws = Editor.getWorkspace();
        if (ws) {
            var svg = ws.getParentSvg();
            if (svg) {
                svg.querySelectorAll('.blocklyZoom, .blocklyTrash').forEach(function(el) {
                    el.style.display = controlsVisible ? '' : 'none';
                });
            }
            // Blockly also wraps controls in a div.blocklyWidgetDiv sometimes
            var parent = svg.parentElement;
            if (parent) {
                parent.querySelectorAll('.blocklyZoom, .blocklyTrash').forEach(function(el) {
                    el.style.display = controlsVisible ? '' : 'none';
                });
            }
        }
    });
    // === Flyout Resize Handle ===
    (function() {
        var flyoutEl = null;
        var handle = document.createElement('div');
        handle.className = 'flyout-resize-handle';
        var dragging = false, startX = 0, startW = 0;

        function findFlyout() {
            var svg = Editor.getWorkspace().getParentSvg();
            return svg ? svg.parentElement.querySelector('.blocklyFlyout') : null;
        }

        function attachHandle() {
            flyoutEl = findFlyout();
            if (!flyoutEl || !flyoutEl.parentElement) return;
            var container = flyoutEl.closest('.injectionDiv') || flyoutEl.parentElement;
            if (!container.querySelector('.flyout-resize-handle')) {
                container.style.position = 'relative';
                container.appendChild(handle);
            }
            updateHandlePos();
        }

        function updateHandlePos() {
            if (!flyoutEl) return;
            var rect = flyoutEl.getBoundingClientRect();
            var parentRect = handle.parentElement.getBoundingClientRect();
            handle.style.left = (rect.right - parentRect.left - 2) + 'px';
            handle.style.top = '0';
            handle.style.height = '100%';
        }

        handle.addEventListener('mousedown', function(e) {
            flyoutEl = findFlyout();
            if (!flyoutEl) return;
            dragging = true;
            startX = e.clientX;
            var flyoutSvg = flyoutEl;
            startW = parseFloat(flyoutSvg.getAttribute('width')) || flyoutSvg.getBoundingClientRect().width;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!dragging || !flyoutEl) return;
            var delta = e.clientX - startX;
            var newW = Math.max(120, Math.min(500, startW + delta));
            flyoutEl.setAttribute('width', newW);
            var bg = flyoutEl.querySelector('.blocklyFlyoutBackground');
            if (bg) bg.setAttribute('width', newW);
            updateHandlePos();
        });

        document.addEventListener('mouseup', function() { dragging = false; });

        // Re-attach handle when flyout opens
        var observer = new MutationObserver(function() { attachHandle(); });
        setTimeout(function() {
            var injDiv = document.querySelector('.injectionDiv');
            if (injDiv) observer.observe(injDiv, { childList: true, subtree: true, attributes: true });
        }, 500);
    })();

    // Update auth menu items based on login state
    function updateAuthMenu() {
        var user = Auth.getCurrentUser();
        var loginItem = document.getElementById('menu-login');
        var registerItem = document.getElementById('menu-register');
        var logoutItem = document.getElementById('menu-logout');
        var display = document.getElementById('username-display');
        if (user) {
            loginItem.style.display = 'none';
            registerItem.style.display = 'none';
            logoutItem.style.display = '';
            display.textContent = user;
        } else {
            loginItem.style.display = '';
            registerItem.style.display = '';
            logoutItem.style.display = 'none';
            display.textContent = '';
        }
    }
    // Patch Auth to update menu on login/logout
    var origCheckSession = Auth.checkSession;
    Auth.checkSession = function() { origCheckSession(); setTimeout(updateAuthMenu, 50); };
    Auth.checkSession();
    setInterval(updateAuthMenu, 1000);

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => { btn.closest('.modal').style.display = 'none'; });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    });

    // Handle window resize for Blockly
    window.addEventListener('resize', () => { Blockly.svgResize(Editor.getWorkspace()); });
});
