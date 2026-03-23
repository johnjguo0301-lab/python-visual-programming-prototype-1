/**
 * Panel Tabs Module
 * Handles switching between Code and Canvas tabs
 */

const PanelTabs = (function() {
    let currentTab = 'code';

    function init() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                switchTab(tabName);
            });
        });
    }

    function switchTab(tabName) {
        currentTab = tabName;

        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.querySelectorAll('.tab-content').forEach(content => {
            if (content.id === `tab-${tabName}`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    function showCanvas() {
        switchTab('canvas');
    }

    function showGraphs() {
        switchTab('graphs');
    }

    function showProcessing() {
        switchTab('processing');
    }

    function showCode() {
        switchTab('code');
    }

    return {
        init,
        switchTab,
        showCanvas,
        showGraphs,
        showProcessing,
        showCode
    };
})();
