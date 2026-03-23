/**
 * Graphs Canvas Module
 * Renders matplotlib plotting commands on HTML5 canvas
 */

const GraphsCanvas = (function() {
    let canvas, ctx;
    const PADDING = 60;
    const TITLE_PADDING = 40;

    function init() {
        canvas = document.getElementById('graphs-canvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d');

        const clearBtn = document.getElementById('btn-clear-graphs');
        if (clearBtn) {
            clearBtn.addEventListener('click', clear);
        }

        clear();
    }

    function clear() {
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function executeCommands(commands) {
        if (!commands || commands.length === 0) return;

        clear();

        // Parse commands into plot data structure
        const plotData = {
            plots: [],
            title: '',
            xlabel: '',
            ylabel: '',
            xlim: null,
            ylim: null,
            showGrid: false,
            gridAlpha: 0.3,
            showLegend: false
        };

        commands.forEach(cmd => {
            switch (cmd.type) {
                case 'plot':
                case 'bar':
                case 'scatter':
                case 'pie':
                case 'hist':
                    plotData.plots.push(cmd);
                    if (cmd.label) plotData.showLegend = true;
                    break;
                case 'title':
                    plotData.title = cmd.text;
                    break;
                case 'xlabel':
                    plotData.xlabel = cmd.text;
                    break;
                case 'ylabel':
                    plotData.ylabel = cmd.text;
                    break;
                case 'xlim':
                    plotData.xlim = { left: cmd.left, right: cmd.right };
                    break;
                case 'ylim':
                    plotData.ylim = { bottom: cmd.bottom, top: cmd.top };
                    break;
                case 'grid':
                    plotData.showGrid = cmd.visible;
                    plotData.gridAlpha = cmd.alpha;
                    break;
                case 'legend':
                    plotData.showLegend = true;
                    break;
                case 'clear':
                    clear();
                    break;
            }
        });

        if (plotData.plots.length > 0) {
            renderGraph(plotData);
        }
    }

    function renderGraph(plotData) {
        // Determine if this is a pie chart (special handling)
        const isPieChart = plotData.plots.length > 0 && plotData.plots[0].type === 'pie';

        if (isPieChart) {
            renderPieChart(plotData);
            return;
        }

        // Calculate data ranges
        const ranges = calculateRanges(plotData);

        // Draw title
        if (plotData.title) {
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(plotData.title, canvas.width / 2, 25);
        }

        // Calculate plot area
        const plotArea = {
            left: PADDING,
            right: canvas.width - PADDING,
            top: plotData.title ? TITLE_PADDING + 20 : PADDING,
            bottom: canvas.height - PADDING
        };

        // Draw axes
        drawAxes(plotArea, ranges, plotData);

        // Draw grid if enabled
        if (plotData.showGrid) {
            drawGrid(plotArea, ranges, plotData.gridAlpha);
        }

        // Draw each plot
        plotData.plots.forEach((plot, index) => {
            const color = plot.color || plot.c || getDefaultColor(index);
            switch (plot.type) {
                case 'plot':
                    drawLinePlot(plot, plotArea, ranges, color);
                    break;
                case 'bar':
                    drawBarChart(plot, plotArea, ranges, color);
                    break;
                case 'scatter':
                    drawScatterPlot(plot, plotArea, ranges, color);
                    break;
                case 'hist':
                    drawHistogram(plot, plotArea, ranges, color);
                    break;
            }
        });

        // Draw legend if needed
        if (plotData.showLegend) {
            drawLegend(plotData.plots, plotArea);
        }
    }

    function calculateRanges(plotData) {
        let xMin = Infinity, xMax = -Infinity;
        let yMin = Infinity, yMax = -Infinity;

        plotData.plots.forEach(plot => {
            if (plot.type === 'hist') {
                // For histograms, calculate bins
                const data = plot.data;
                const bins = typeof plot.bins === 'number' ? plot.bins : 10;
                const dataMin = Math.min(...data);
                const dataMax = Math.max(...data);
                xMin = Math.min(xMin, dataMin);
                xMax = Math.max(xMax, dataMax);

                // Calculate histogram
                const binWidth = (dataMax - dataMin) / bins;
                const counts = new Array(bins).fill(0);
                data.forEach(val => {
                    const binIndex = Math.min(Math.floor((val - dataMin) / binWidth), bins - 1);
                    counts[binIndex]++;
                });
                yMin = 0;
                yMax = Math.max(yMax, Math.max(...counts));
            } else if (plot.x && plot.y) {
                plot.x.forEach((x, i) => {
                    const xVal = typeof x === 'string' ? i : x;
                    const yVal = plot.y[i] || plot.height?.[i] || 0;
                    xMin = Math.min(xMin, xVal);
                    xMax = Math.max(xMax, xVal);
                    yMin = Math.min(yMin, yVal);
                    yMax = Math.max(yMax, yVal);
                });
            } else if (plot.height) {
                plot.height.forEach((h, i) => {
                    xMin = Math.min(xMin, i);
                    xMax = Math.max(xMax, i);
                    yMin = Math.min(yMin, 0);
                    yMax = Math.max(yMax, h);
                });
            }
        });

        // Apply user-specified limits
        if (plotData.xlim) {
            if (plotData.xlim.left !== null) xMin = plotData.xlim.left;
            if (plotData.xlim.right !== null) xMax = plotData.xlim.right;
        }
        if (plotData.ylim) {
            if (plotData.ylim.bottom !== null) yMin = plotData.ylim.bottom;
            if (plotData.ylim.top !== null) yMax = plotData.ylim.top;
        }

        // Add padding to ranges
        const xPadding = (xMax - xMin) * 0.05 || 1;
        const yPadding = (yMax - yMin) * 0.1 || 1;

        return {
            xMin: xMin - xPadding,
            xMax: xMax + xPadding,
            yMin: yMin - yPadding,
            yMax: yMax + yPadding
        };
    }

    function drawAxes(plotArea, ranges, plotData) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        // Draw x-axis
        ctx.beginPath();
        ctx.moveTo(plotArea.left, plotArea.bottom);
        ctx.lineTo(plotArea.right, plotArea.bottom);
        ctx.stroke();

        // Draw y-axis
        ctx.beginPath();
        ctx.moveTo(plotArea.left, plotArea.top);
        ctx.lineTo(plotArea.left, plotArea.bottom);
        ctx.stroke();

        // Draw tick marks and labels
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';

        // X-axis ticks
        const xTicks = 5;
        for (let i = 0; i <= xTicks; i++) {
            const x = plotArea.left + (plotArea.right - plotArea.left) * (i / xTicks);
            const value = ranges.xMin + (ranges.xMax - ranges.xMin) * (i / xTicks);

            ctx.beginPath();
            ctx.moveTo(x, plotArea.bottom);
            ctx.lineTo(x, plotArea.bottom + 5);
            ctx.stroke();

            ctx.fillText(value.toFixed(1), x, plotArea.bottom + 20);
        }

        // Y-axis ticks
        ctx.textAlign = 'right';
        const yTicks = 5;
        for (let i = 0; i <= yTicks; i++) {
            const y = plotArea.bottom - (plotArea.bottom - plotArea.top) * (i / yTicks);
            const value = ranges.yMin + (ranges.yMax - ranges.yMin) * (i / yTicks);

            ctx.beginPath();
            ctx.moveTo(plotArea.left - 5, y);
            ctx.lineTo(plotArea.left, y);
            ctx.stroke();

            ctx.fillText(value.toFixed(1), plotArea.left - 10, y + 4);
        }

        // Draw axis labels
        if (plotData.xlabel) {
            ctx.textAlign = 'center';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(plotData.xlabel, (plotArea.left + plotArea.right) / 2, canvas.height - 10);
        }

        if (plotData.ylabel) {
            ctx.save();
            ctx.translate(15, (plotArea.top + plotArea.bottom) / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'center';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(plotData.ylabel, 0, 0);
            ctx.restore();
        }
    }

    function drawGrid(plotArea, ranges, alpha) {
        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.lineWidth = 1;

        const xTicks = 5;
        const yTicks = 5;

        // Vertical grid lines
        for (let i = 0; i <= xTicks; i++) {
            const x = plotArea.left + (plotArea.right - plotArea.left) * (i / xTicks);
            ctx.beginPath();
            ctx.moveTo(x, plotArea.top);
            ctx.lineTo(x, plotArea.bottom);
            ctx.stroke();
        }

        // Horizontal grid lines
        for (let i = 0; i <= yTicks; i++) {
            const y = plotArea.bottom - (plotArea.bottom - plotArea.top) * (i / yTicks);
            ctx.beginPath();
            ctx.moveTo(plotArea.left, y);
            ctx.lineTo(plotArea.right, y);
            ctx.stroke();
        }
    }

    function drawLinePlot(plot, plotArea, ranges, color) {
        if (!plot.x || !plot.y) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = plot.linewidth || 2;
        ctx.beginPath();

        plot.x.forEach((x, i) => {
            const xVal = typeof x === 'string' ? i : x;
            const yVal = plot.y[i];

            const canvasX = mapToCanvas(xVal, ranges.xMin, ranges.xMax, plotArea.left, plotArea.right);
            const canvasY = mapToCanvas(yVal, ranges.yMin, ranges.yMax, plotArea.bottom, plotArea.top);

            if (i === 0) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        });

        ctx.stroke();

        // Draw markers if specified
        if (plot.marker) {
            plot.x.forEach((x, i) => {
                const xVal = typeof x === 'string' ? i : x;
                const yVal = plot.y[i];
                const canvasX = mapToCanvas(xVal, ranges.xMin, ranges.xMax, plotArea.left, plotArea.right);
                const canvasY = mapToCanvas(yVal, ranges.yMin, ranges.yMax, plotArea.bottom, plotArea.top);

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, 4, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }

    function drawBarChart(plot, plotArea, ranges, color) {
        if (!plot.height) return;

        const barWidth = (plotArea.right - plotArea.left) / plot.height.length * (plot.width || 0.8);

        plot.height.forEach((h, i) => {
            const xVal = Array.isArray(plot.x) ? (typeof plot.x[i] === 'string' ? i : plot.x[i]) : i;
            const centerX = mapToCanvas(xVal, ranges.xMin, ranges.xMax, plotArea.left, plotArea.right);
            const barLeft = centerX - barWidth / 2;
            const barTop = mapToCanvas(h, ranges.yMin, ranges.yMax, plotArea.bottom, plotArea.top);
            const barBottom = mapToCanvas(0, ranges.yMin, ranges.yMax, plotArea.bottom, plotArea.top);
            const barHeight = barBottom - barTop;

            ctx.fillStyle = color;
            ctx.fillRect(barLeft, barTop, barWidth, barHeight);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.strokeRect(barLeft, barTop, barWidth, barHeight);
        });
    }

    function drawScatterPlot(plot, plotArea, ranges, color) {
        if (!plot.x || !plot.y) return;

        const size = plot.s || 20;
        ctx.fillStyle = color;

        plot.x.forEach((x, i) => {
            const xVal = typeof x === 'string' ? i : x;
            const yVal = plot.y[i];

            const canvasX = mapToCanvas(xVal, ranges.xMin, ranges.xMax, plotArea.left, plotArea.right);
            const canvasY = mapToCanvas(yVal, ranges.yMin, ranges.yMax, plotArea.bottom, plotArea.top);

            ctx.beginPath();
            ctx.arc(canvasX, canvasY, Math.sqrt(size) / 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawHistogram(plot, plotArea, ranges, color) {
        const data = plot.data;
        const bins = typeof plot.bins === 'number' ? plot.bins : 10;
        const dataMin = Math.min(...data);
        const dataMax = Math.max(...data);
        const binWidth = (dataMax - dataMin) / bins;

        // Calculate histogram
        const counts = new Array(bins).fill(0);
        data.forEach(val => {
            const binIndex = Math.min(Math.floor((val - dataMin) / binWidth), bins - 1);
            counts[binIndex]++;
        });

        // Draw bars
        const barWidth = (plotArea.right - plotArea.left) / bins;
        counts.forEach((count, i) => {
            const binStart = dataMin + i * binWidth;
            const barLeft = mapToCanvas(binStart, ranges.xMin, ranges.xMax, plotArea.left, plotArea.right);
            const barTop = mapToCanvas(count, ranges.yMin, ranges.yMax, plotArea.bottom, plotArea.top);
            const barBottom = mapToCanvas(0, ranges.yMin, ranges.yMax, plotArea.bottom, plotArea.top);
            const barHeight = barBottom - barTop;

            ctx.fillStyle = color;
            ctx.globalAlpha = plot.alpha || 0.7;
            ctx.fillRect(barLeft, barTop, barWidth, barHeight);
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.strokeRect(barLeft, barTop, barWidth, barHeight);
        });
    }

    function renderPieChart(plotData) {
        const plot = plotData.plots[0];
        const values = plot.values;
        const labels = plot.labels || values.map((_, i) => `Slice ${i + 1}`);
        const total = values.reduce((sum, val) => sum + val, 0);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 3;

        let startAngle = (plot.startangle || 0) * Math.PI / 180;

        values.forEach((value, i) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            const endAngle = startAngle + sliceAngle;

            // Draw slice
            ctx.fillStyle = plot.colors?.[i] || getDefaultColor(i);
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw label
            const labelAngle = startAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(labels[i], labelX, labelY);

            if (plot.autopct) {
                const percentage = ((value / total) * 100).toFixed(1) + '%';
                ctx.fillText(percentage, labelX, labelY + 15);
            }

            startAngle = endAngle;
        });

        // Draw title
        if (plotData.title) {
            ctx.fillStyle = 'black';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(plotData.title, canvas.width / 2, 25);
        }
    }

    function drawLegend(plots, plotArea) {
        const legendItems = plots.filter(p => p.label);
        if (legendItems.length === 0) return;

        const legendX = plotArea.right - 120;
        const legendY = plotArea.top + 10;
        const lineHeight = 20;

        // Draw legend background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeStyle = 'black';
        ctx.fillRect(legendX, legendY, 110, legendItems.length * lineHeight + 10);
        ctx.strokeRect(legendX, legendY, 110, legendItems.length * lineHeight + 10);

        // Draw legend items
        legendItems.forEach((plot, i) => {
            const y = legendY + 15 + i * lineHeight;
            const color = plot.color || plot.c || getDefaultColor(i);

            // Draw color box
            ctx.fillStyle = color;
            ctx.fillRect(legendX + 5, y - 8, 15, 15);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(legendX + 5, y - 8, 15, 15);

            // Draw label
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(plot.label, legendX + 25, y + 3);
        });
    }

    function mapToCanvas(value, dataMin, dataMax, canvasMin, canvasMax) {
        return canvasMin + (value - dataMin) / (dataMax - dataMin) * (canvasMax - canvasMin);
    }

    function getDefaultColor(index) {
        const colors = [
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ];
        return colors[index % colors.length];
    }

    return {
        init,
        clear,
        executeCommands
    };
})();
