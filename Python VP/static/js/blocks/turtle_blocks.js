/**
 * Turtle Graphics Blocks
 * Blocks for drawing with turtle graphics
 */

// Movement blocks
Blockly.Blocks['turtle_forward'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_forward",
            "message0": "turtle forward %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DISTANCE",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Move turtle forward by distance",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_forward'] = function(block, generator) {
    const distance = generator.valueToCode(block, 'DISTANCE', python.Order.ATOMIC) || '100';
    return `turtle.forward(${distance})\n`;
};

Blockly.Blocks['turtle_backward'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_backward",
            "message0": "turtle backward %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "DISTANCE",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Move turtle backward by distance",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_backward'] = function(block, generator) {
    const distance = generator.valueToCode(block, 'DISTANCE', python.Order.ATOMIC) || '100';
    return `turtle.backward(${distance})\n`;
};

Blockly.Blocks['turtle_right'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_right",
            "message0": "turtle turn right %1°",
            "args0": [
                {
                    "type": "input_value",
                    "name": "ANGLE",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Turn turtle right by angle",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_right'] = function(block, generator) {
    const angle = generator.valueToCode(block, 'ANGLE', python.Order.ATOMIC) || '90';
    return `turtle.right(${angle})\n`;
};

Blockly.Blocks['turtle_left'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_left",
            "message0": "turtle turn left %1°",
            "args0": [
                {
                    "type": "input_value",
                    "name": "ANGLE",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Turn turtle left by angle",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_left'] = function(block, generator) {
    const angle = generator.valueToCode(block, 'ANGLE', python.Order.ATOMIC) || '90';
    return `turtle.left(${angle})\n`;
};

Blockly.Blocks['turtle_goto'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_goto",
            "message0": "turtle go to x: %1 y: %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "X",
                    "check": "Number"
                },
                {
                    "type": "input_value",
                    "name": "Y",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Move turtle to position (x, y)",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_goto'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', python.Order.ATOMIC) || '0';
    const y = generator.valueToCode(block, 'Y', python.Order.ATOMIC) || '0';
    return `turtle.goto(${x}, ${y})\n`;
};

Blockly.Blocks['turtle_home'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_home",
            "message0": "turtle go home",
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Return turtle to center (0, 0) facing up",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_home'] = function(block, generator) {
    return 'turtle.home()\n';
};

// Pen control blocks
Blockly.Blocks['turtle_penup'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_penup",
            "message0": "turtle pen up",
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Lift pen (stop drawing)",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_penup'] = function(block, generator) {
    return 'turtle.penup()\n';
};

Blockly.Blocks['turtle_pendown'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_pendown",
            "message0": "turtle pen down",
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Put pen down (start drawing)",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_pendown'] = function(block, generator) {
    return 'turtle.pendown()\n';
};

Blockly.Blocks['turtle_pensize'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_pensize",
            "message0": "turtle pen size %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "SIZE",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Set pen width",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_pensize'] = function(block, generator) {
    const size = generator.valueToCode(block, 'SIZE', python.Order.ATOMIC) || '1';
    return `turtle.pensize(${size})\n`;
};

Blockly.Blocks['turtle_pencolor'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_pencolor",
            "message0": "turtle pen color %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "COLOR",
                    "check": "String"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Set pen color",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_pencolor'] = function(block, generator) {
    const color = generator.valueToCode(block, 'COLOR', python.Order.ATOMIC) || '"black"';
    return `turtle.pencolor(${color})\n`;
};

// Drawing blocks
Blockly.Blocks['turtle_circle'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_circle",
            "message0": "turtle draw circle radius %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "RADIUS",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Draw a circle with given radius",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_circle'] = function(block, generator) {
    const radius = generator.valueToCode(block, 'RADIUS', python.Order.ATOMIC) || '50';
    return `turtle.circle(${radius})\n`;
};

Blockly.Blocks['turtle_dot'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_dot",
            "message0": "turtle draw dot size %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "SIZE",
                    "check": "Number"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Draw a dot",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_dot'] = function(block, generator) {
    const size = generator.valueToCode(block, 'SIZE', python.Order.ATOMIC) || '5';
    return `turtle.dot(${size})\n`;
};

Blockly.Blocks['turtle_clear'] = {
    init: function() {
        this.jsonInit({
            "type": "turtle_clear",
            "message0": "turtle clear drawing",
            "previousStatement": null,
            "nextStatement": null,
            "colour": '#10b981',
            "tooltip": "Clear the drawing",
            "helpUrl": ""
        });
    }
};

python.pythonGenerator.forBlock['turtle_clear'] = function(block, generator) {
    return 'turtle.clear()\n';
};
