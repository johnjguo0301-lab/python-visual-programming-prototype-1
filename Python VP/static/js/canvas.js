/**
 * Turtle Canvas Module
 * Renders turtle graphics commands on HTML5 canvas
 */

const TurtleCanvas = (function() {
    let canvas, ctx;
    let turtle = {
        x: 0,
        y: 0,
        angle: 90,
        penDown: true,
        penColor: 'black',
        penWidth: 1
    };
    let turtleLayer = null; // Separate layer for turtle drawing

    function init() {
        canvas = document.getElementById('turtle-canvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d');

        const clearBtn = document.getElementById('btn-clear-canvas');
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

        turtle.x = canvas.width / 2;
        turtle.y = canvas.height / 2;
        turtle.angle = 90;
        turtle.penDown = true;
        turtle.penColor = 'black';
        turtle.penWidth = 1;

        drawTurtle();
    }

    function executeCommands(commands) {
        if (!commands || commands.length === 0) return;

        clear();

        let index = 0;
        function executeNext() {
            if (index >= commands.length) return;

            const cmd = commands[index];
            executeCommand(cmd);
            index++;

            setTimeout(executeNext, 20);
        }

        executeNext();
    }

    function executeCommand(cmd) {
        // Clear previous turtle before executing command
        clearTurtle();

        switch (cmd.type) {
            case 'forward':
                forward(cmd.distance);
                break;
            case 'backward':
                backward(cmd.distance);
                break;
            case 'right':
                right(cmd.angle);
                break;
            case 'left':
                left(cmd.angle);
                break;
            case 'penup':
                turtle.penDown = false;
                break;
            case 'pendown':
                turtle.penDown = true;
                break;
            case 'pencolor':
                turtle.penColor = cmd.color;
                break;
            case 'pensize':
                turtle.penWidth = cmd.width;
                break;
            case 'circle':
                circle(cmd.radius, cmd.extent);
                break;
            case 'goto':
                goto(cmd.x, cmd.y);
                break;
            case 'home':
                home();
                break;
            case 'dot':
                dot(cmd.size);
                break;
            case 'clear':
                clear();
                break;
            case 'setheading':
                turtle.angle = cmd.angle;
                break;
        }

        // Draw turtle at new position
        drawTurtle();
    }

    function forward(distance) {
        const radians = (turtle.angle * Math.PI) / 180;
        const newX = turtle.x + distance * Math.cos(radians);
        const newY = turtle.y - distance * Math.sin(radians);

        if (turtle.penDown) {
            ctx.beginPath();
            ctx.moveTo(turtle.x, turtle.y);
            ctx.lineTo(newX, newY);
            ctx.strokeStyle = turtle.penColor;
            ctx.lineWidth = turtle.penWidth;
            ctx.stroke();
        }

        turtle.x = newX;
        turtle.y = newY;
    }

    function backward(distance) {
        forward(-distance);
    }

    function right(angle) {
        turtle.angle -= angle;
    }

    function left(angle) {
        turtle.angle += angle;
    }

    function circle(radius, extent = 360) {
        const radians = (turtle.angle * Math.PI) / 180;
        const centerX = turtle.x - radius * Math.sin(radians);
        const centerY = turtle.y - radius * Math.cos(radians);

        const startAngle = (90 - turtle.angle) * Math.PI / 180;
        const endAngle = startAngle + (extent * Math.PI / 180);

        if (turtle.penDown) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, Math.abs(radius), startAngle, endAngle, radius < 0);
            ctx.strokeStyle = turtle.penColor;
            ctx.lineWidth = turtle.penWidth;
            ctx.stroke();
        }

        const finalAngle = (90 - turtle.angle - extent) * Math.PI / 180;
        turtle.x = centerX + Math.abs(radius) * Math.cos(finalAngle);
        turtle.y = centerY + Math.abs(radius) * Math.sin(finalAngle);
        turtle.angle -= extent;
    }

    function goto(x, y) {
        const canvasX = canvas.width / 2 + x;
        const canvasY = canvas.height / 2 - y;

        if (turtle.penDown) {
            ctx.beginPath();
            ctx.moveTo(turtle.x, turtle.y);
            ctx.lineTo(canvasX, canvasY);
            ctx.strokeStyle = turtle.penColor;
            ctx.lineWidth = turtle.penWidth;
            ctx.stroke();
        }

        turtle.x = canvasX;
        turtle.y = canvasY;
    }

    function home() {
        goto(0, 0);
        turtle.angle = 90;
    }

    function dot(size = 5) {
        ctx.beginPath();
        ctx.arc(turtle.x, turtle.y, size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = turtle.penColor;
        ctx.fill();
    }

    function clearTurtle() {
        if (!turtleLayer) return;

        // Restore the canvas to the state before the turtle was drawn
        ctx.putImageData(turtleLayer, 0, 0);
    }

    function drawTurtle() {
        // Save the current canvas state (without turtle)
        turtleLayer = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const size = 10;
        const radians = (turtle.angle * Math.PI) / 180;

        ctx.save();
        ctx.translate(turtle.x, turtle.y);
        ctx.rotate(-radians + Math.PI / 2);

        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-size / 2, size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.closePath();

        ctx.fillStyle = 'rgba(0, 150, 0, 0.7)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 100, 0, 0.9)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }

    return {
        init,
        clear,
        executeCommands
    };
})();
