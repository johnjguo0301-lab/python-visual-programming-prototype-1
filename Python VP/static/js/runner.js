// Server-side Python code runner
const Runner = (() => {
    let running = false;
    let abortController = null;

    const consoleOutput = () => document.getElementById('console-output');
    const statusEl = () => document.getElementById('pyodide-status');
    const btnRun = () => document.getElementById('btn-run');
    const btnStop = () => document.getElementById('btn-stop');

    function appendOutput(text, className) {
        const el = consoleOutput();
        const span = document.createElement('span');
        span.className = className || 'stdout';
        span.textContent = text;
        el.appendChild(span);
        el.scrollTop = el.scrollHeight;
    }

    function init() {
        statusEl().textContent = 'Python ready';
        statusEl().style.color = '#a6e3a1';
    }

    async function run(code) {
        if (running) return;
        if (!code || !code.trim()) {
            appendOutput('No code to run. Drag some blocks first!\n', 'stderr');
            return;
        }

        running = true;
        abortController = new AbortController();
        btnRun().disabled = true;
        btnStop().disabled = false;

        try {
            const res = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
                signal: abortController.signal
            });
            const data = await res.json();

            if (data.turtle_commands && data.turtle_commands.length > 0) {
                TurtleCanvas.clear();
                PanelTabs.showCanvas();
                TurtleCanvas.executeCommands(data.turtle_commands);
            }

            if (data.matplotlib_commands && data.matplotlib_commands.length > 0) {
                GraphsCanvas.clear();
                PanelTabs.showGraphs();
                GraphsCanvas.executeCommands(data.matplotlib_commands);
            }

            if (data.processing_commands) {
                ProcessingCanvas.clear();
                PanelTabs.showProcessing();
                ProcessingCanvas.executeCommands(data.processing_commands);
            }

            if (data.stdout) appendOutput(data.stdout, 'stdout');
            if (data.stderr) appendOutput(data.stderr, 'stderr');
        } catch (e) {
            if (e.name === 'AbortError') {
                appendOutput('--- Execution stopped ---\n', 'stderr');
            } else {
                appendOutput('Error: ' + e.message + '\n', 'stderr');
            }
        } finally {
            running = false;
            abortController = null;
            btnRun().disabled = false;
            btnStop().disabled = true;
        }
    }

    function stop() {
        if (abortController) abortController.abort();
    }

    function clearConsole() {
        consoleOutput().innerHTML = '';
    }

    function isReady() { return true; }

    return { init, run, stop, clearConsole, isReady };
})();
