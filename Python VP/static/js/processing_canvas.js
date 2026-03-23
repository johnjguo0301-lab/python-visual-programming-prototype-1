/**
 * Processing Canvas Module
 * Renders Processing drawing commands on HTML5 canvas
 */

const ProcessingCanvas = (function() {
    let canvas, ctx;
    let state = {
        fillColor: [255, 255, 255, 255],
        strokeColor: [0, 0, 0, 255],
        strokeWidth: 1,
        noFillFlag: false,
        noStrokeFlag: false,
        textSizeValue: 12,
        transformStack: []
    };

    function init() {
        canvas = document.getElementById('processing-canvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d');

        const clearBtn = document.getElementById('btn-clear-processing');
        if (clearBtn) {
            clearBtn.addEventListener('click', clear);
        }

        clear();
    }

    function clear() {
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reset state
        state.fillColor = [255, 255, 255, 255];
        state.strokeColor = [0, 0, 0, 255];
        state.strokeWidth = 1;
        state.noFillFlag = false;
        state.noStrokeFlag = false;
        state.textSizeValue = 12;
        state.transformStack = [];
    }

    function executeCommands(commands) {
        if (!commands) return;

        clear();

        // Set canvas size if specified
        if (commands.width && commands.height) {
            canvas.width = commands.width;
            canvas.height = commands.height;
        }

        // Execute setup commands
        if (commands.setup && commands.setup.length > 0) {
            commands.setup.forEach(cmd => executeCommand(cmd));
        }

        // Execute draw commands
        if (commands.draw && commands.draw.length > 0) {
            commands.draw.forEach(cmd => executeCommand(cmd));
        }
    }

    function executeCommand(cmd) {
        switch (cmd.type) {
            case 'size':
                canvas.width = cmd.width;
                canvas.height = cmd.height;
                break;

            case 'background':
                const bg = cmd.gray !== undefined ?
                    `rgb(${cmd.gray},${cmd.gray},${cmd.gray})` :
                    `rgb(${cmd.r},${cmd.g},${cmd.b})`;
                ctx.fillStyle = bg;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                break;

            case 'fill':
                state.noFillFlag = false;
                if (cmd.gray !== undefined) {
                    state.fillColor = [cmd.gray, cmd.gray, cmd.gray, 255];
                } else {
                    state.fillColor = [cmd.r, cmd.g, cmd.b, 255];
                }
                break;

            case 'noFill':
                state.noFillFlag = true;
                break;

            case 'stroke':
                state.noStrokeFlag = false;
                if (cmd.gray !== undefined) {
                    state.strokeColor = [cmd.gray, cmd.gray, cmd.gray, 255];
                } else {
                    state.strokeColor = [cmd.r, cmd.g, cmd.b, 255];
                }
                break;

            case 'noStroke':
                state.noStrokeFlag = true;
                break;

            case 'strokeWeight':
                state.strokeWidth = cmd.weight;
                break;

            case 'ellipse':
                ctx.beginPath();
                ctx.ellipse(cmd.x, cmd.y, cmd.w / 2, cmd.h / 2, 0, 0, Math.PI * 2);
                applyFillAndStroke();
                break;

            case 'rect':
                ctx.beginPath();
                ctx.rect(cmd.x, cmd.y, cmd.w, cmd.h);
                applyFillAndStroke();
                break;

            case 'line':
                if (!state.noStrokeFlag) {
                    ctx.beginPath();
                    ctx.moveTo(cmd.x1, cmd.y1);
                    ctx.lineTo(cmd.x2, cmd.y2);
                    ctx.strokeStyle = rgbaString(state.strokeColor);
                    ctx.lineWidth = state.strokeWidth;
                    ctx.stroke();
                }
                break;

            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(cmd.x1, cmd.y1);
                ctx.lineTo(cmd.x2, cmd.y2);
                ctx.lineTo(cmd.x3, cmd.y3);
                ctx.closePath();
                applyFillAndStroke();
                break;

            case 'point':
                if (!state.noStrokeFlag) {
                    ctx.fillStyle = rgbaString(state.strokeColor);
                    ctx.fillRect(cmd.x, cmd.y, state.strokeWidth, state.strokeWidth);
                }
                break;

            case 'arc':
                ctx.beginPath();
                ctx.ellipse(cmd.x, cmd.y, cmd.w / 2, cmd.h / 2, 0, cmd.start, cmd.stop);
                applyFillAndStroke();
                break;

            case 'quad':
                ctx.beginPath();
                ctx.moveTo(cmd.x1, cmd.y1);
                ctx.lineTo(cmd.x2, cmd.y2);
                ctx.lineTo(cmd.x3, cmd.y3);
                ctx.lineTo(cmd.x4, cmd.y4);
                ctx.closePath();
                applyFillAndStroke();
                break;

            case 'text':
                if (!state.noFillFlag) {
                    ctx.font = `${state.textSizeValue}px sans-serif`;
                    ctx.fillStyle = rgbaString(state.fillColor);
                    ctx.fillText(cmd.text, cmd.x, cmd.y);
                }
                break;

            case 'textSize':
                state.textSizeValue = cmd.size;
                break;

            case 'push':
                ctx.save();
                state.transformStack.push({
                    fillColor: [...state.fillColor],
                    strokeColor: [...state.strokeColor],
                    strokeWidth: state.strokeWidth,
                    noFillFlag: state.noFillFlag,
                    noStrokeFlag: state.noStrokeFlag,
                    textSizeValue: state.textSizeValue
                });
                break;

            case 'pop':
                ctx.restore();
                if (state.transformStack.length > 0) {
                    const saved = state.transformStack.pop();
                    state.fillColor = saved.fillColor;
                    state.strokeColor = saved.strokeColor;
                    state.strokeWidth = saved.strokeWidth;
                    state.noFillFlag = saved.noFillFlag;
                    state.noStrokeFlag = saved.noStrokeFlag;
                    state.textSizeValue = saved.textSizeValue;
                }
                break;

            case 'translate':
                ctx.translate(cmd.x, cmd.y);
                break;

            case 'rotate':
                ctx.rotate(cmd.angle);
                break;

            case 'scale':
                ctx.scale(cmd.sx, cmd.sy);
                break;
        }
    }

    function applyFillAndStroke() {
        if (!state.noFillFlag) {
            ctx.fillStyle = rgbaString(state.fillColor);
            ctx.fill();
        }
        if (!state.noStrokeFlag) {
            ctx.strokeStyle = rgbaString(state.strokeColor);
            ctx.lineWidth = state.strokeWidth;
            ctx.stroke();
        }
    }

    function rgbaString(color) {
        return `rgba(${color[0]},${color[1]},${color[2]},${color[3] / 255})`;
    }

    return {
        init,
        clear,
        executeCommands
    };
})();
