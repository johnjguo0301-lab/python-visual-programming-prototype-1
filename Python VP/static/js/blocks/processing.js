/**
 * Processing Blocks
 * Blocks for creative coding and generative art with Processing
 */

// ===== Setup Blocks =====

Blockly.Blocks['processing_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('setup');
        this.appendStatementInput('CODE')
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Setup function - runs once at start');
    }
};

python.pythonGenerator.forBlock['processing_setup'] = function(block, generator) {
    const code = generator.statementToCode(block, 'CODE');
    return 'def setup():\n' + (code || '    pass\n') + '\n';
};

Blockly.Blocks['processing_draw'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('draw');
        this.appendStatementInput('CODE')
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Draw function - runs repeatedly');
    }
};

python.pythonGenerator.forBlock['processing_draw'] = function(block, generator) {
    const code = generator.statementToCode(block, 'CODE');
    return 'def draw():\n' + (code || '    pass\n') + '\n';
};

Blockly.Blocks['processing_size'] = {
    init: function() {
        this.appendValueInput('WIDTH')
            .setCheck('Number')
            .appendField('size width:');
        this.appendValueInput('HEIGHT')
            .setCheck('Number')
            .appendField('height:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Set canvas size');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_size'] = function(block, generator) {
    const width = generator.valueToCode(block, 'WIDTH', generator.ORDER_ATOMIC) || '400';
    const height = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC) || '400';
    return `size(${width}, ${height})\n`;
};

Blockly.Blocks['processing_background'] = {
    init: function() {
        this.appendValueInput('R')
            .setCheck('Number')
            .appendField('background R:');
        this.appendValueInput('G')
            .setCheck('Number')
            .appendField('G:');
        this.appendValueInput('B')
            .setCheck('Number')
            .appendField('B:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Set background color (RGB)');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_background'] = function(block, generator) {
    const r = generator.valueToCode(block, 'R', generator.ORDER_ATOMIC) || '255';
    const g = generator.valueToCode(block, 'G', generator.ORDER_ATOMIC) || '255';
    const b = generator.valueToCode(block, 'B', generator.ORDER_ATOMIC) || '255';
    return `background(${r}, ${g}, ${b})\n`;
};

Blockly.Blocks['processing_background_gray'] = {
    init: function() {
        this.appendValueInput('GRAY')
            .setCheck('Number')
            .appendField('background gray:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Set background color (grayscale)');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_background_gray'] = function(block, generator) {
    const gray = generator.valueToCode(block, 'GRAY', generator.ORDER_ATOMIC) || '255';
    return `background(${gray})\n`;
};

// ===== Shape Blocks =====

Blockly.Blocks['processing_ellipse'] = {
    init: function() {
        this.appendValueInput('X')
            .setCheck('Number')
            .appendField('ellipse x:');
        this.appendValueInput('Y')
            .setCheck('Number')
            .appendField('y:');
        this.appendValueInput('W')
            .setCheck('Number')
            .appendField('width:');
        this.appendValueInput('H')
            .setCheck('Number')
            .appendField('height:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Draw an ellipse');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_ellipse'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
    const w = generator.valueToCode(block, 'W', generator.ORDER_ATOMIC) || '50';
    const h = generator.valueToCode(block, 'H', generator.ORDER_ATOMIC) || '50';
    return `ellipse(${x}, ${y}, ${w}, ${h})\n`;
};

Blockly.Blocks['processing_circle'] = {
    init: function() {
        this.appendValueInput('X')
            .setCheck('Number')
            .appendField('circle x:');
        this.appendValueInput('Y')
            .setCheck('Number')
            .appendField('y:');
        this.appendValueInput('D')
            .setCheck('Number')
            .appendField('diameter:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Draw a circle');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_circle'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
    const d = generator.valueToCode(block, 'D', generator.ORDER_ATOMIC) || '50';
    return `circle(${x}, ${y}, ${d})\n`;
};

Blockly.Blocks['processing_rect'] = {
    init: function() {
        this.appendValueInput('X')
            .setCheck('Number')
            .appendField('rectangle x:');
        this.appendValueInput('Y')
            .setCheck('Number')
            .appendField('y:');
        this.appendValueInput('W')
            .setCheck('Number')
            .appendField('width:');
        this.appendValueInput('H')
            .setCheck('Number')
            .appendField('height:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Draw a rectangle');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_rect'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0';
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0';
    const w = generator.valueToCode(block, 'W', generator.ORDER_ATOMIC) || '50';
    const h = generator.valueToCode(block, 'H', generator.ORDER_ATOMIC) || '50';
    return `rect(${x}, ${y}, ${w}, ${h})\n`;
};

Blockly.Blocks['processing_line'] = {
    init: function() {
        this.appendValueInput('X1')
            .setCheck('Number')
            .appendField('line from x:');
        this.appendValueInput('Y1')
            .setCheck('Number')
            .appendField('y:');
        this.appendValueInput('X2')
            .setCheck('Number')
            .appendField('to x:');
        this.appendValueInput('Y2')
            .setCheck('Number')
            .appendField('y:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Draw a line');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_line'] = function(block, generator) {
    const x1 = generator.valueToCode(block, 'X1', generator.ORDER_ATOMIC) || '0';
    const y1 = generator.valueToCode(block, 'Y1', generator.ORDER_ATOMIC) || '0';
    const x2 = generator.valueToCode(block, 'X2', generator.ORDER_ATOMIC) || '100';
    const y2 = generator.valueToCode(block, 'Y2', generator.ORDER_ATOMIC) || '100';
    return `line(${x1}, ${y1}, ${x2}, ${y2})\n`;
};

Blockly.Blocks['processing_triangle'] = {
    init: function() {
        this.appendValueInput('X1')
            .setCheck('Number')
            .appendField('triangle x1:');
        this.appendValueInput('Y1')
            .setCheck('Number')
            .appendField('y1:');
        this.appendValueInput('X2')
            .setCheck('Number')
            .appendField('x2:');
        this.appendValueInput('Y2')
            .setCheck('Number')
            .appendField('y2:');
        this.appendValueInput('X3')
            .setCheck('Number')
            .appendField('x3:');
        this.appendValueInput('Y3')
            .setCheck('Number')
            .appendField('y3:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Draw a triangle');
    }
};

python.pythonGenerator.forBlock['processing_triangle'] = function(block, generator) {
    const x1 = generator.valueToCode(block, 'X1', generator.ORDER_ATOMIC) || '0';
    const y1 = generator.valueToCode(block, 'Y1', generator.ORDER_ATOMIC) || '0';
    const x2 = generator.valueToCode(block, 'X2', generator.ORDER_ATOMIC) || '50';
    const y2 = generator.valueToCode(block, 'Y2', generator.ORDER_ATOMIC) || '100';
    const x3 = generator.valueToCode(block, 'X3', generator.ORDER_ATOMIC) || '100';
    const y3 = generator.valueToCode(block, 'Y3', generator.ORDER_ATOMIC) || '0';
    return `triangle(${x1}, ${y1}, ${x2}, ${y2}, ${x3}, ${y3})\n`;
};

// ===== Style Blocks =====

Blockly.Blocks['processing_fill'] = {
    init: function() {
        this.appendValueInput('R')
            .setCheck('Number')
            .appendField('fill R:');
        this.appendValueInput('G')
            .setCheck('Number')
            .appendField('G:');
        this.appendValueInput('B')
            .setCheck('Number')
            .appendField('B:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Set fill color (RGB)');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_fill'] = function(block, generator) {
    const r = generator.valueToCode(block, 'R', generator.ORDER_ATOMIC) || '255';
    const g = generator.valueToCode(block, 'G', generator.ORDER_ATOMIC) || '255';
    const b = generator.valueToCode(block, 'B', generator.ORDER_ATOMIC) || '255';
    return `fill(${r}, ${g}, ${b})\n`;
};

Blockly.Blocks['processing_fill_gray'] = {
    init: function() {
        this.appendValueInput('GRAY')
            .setCheck('Number')
            .appendField('fill gray:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Set fill color (grayscale)');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_fill_gray'] = function(block, generator) {
    const gray = generator.valueToCode(block, 'GRAY', generator.ORDER_ATOMIC) || '255';
    return `fill(${gray})\n`;
};

Blockly.Blocks['processing_noFill'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('no fill');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Disable fill');
    }
};

python.pythonGenerator.forBlock['processing_noFill'] = function(block, generator) {
    return 'noFill()\n';
};

Blockly.Blocks['processing_stroke'] = {
    init: function() {
        this.appendValueInput('R')
            .setCheck('Number')
            .appendField('stroke R:');
        this.appendValueInput('G')
            .setCheck('Number')
            .appendField('G:');
        this.appendValueInput('B')
            .setCheck('Number')
            .appendField('B:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Set stroke color (RGB)');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_stroke'] = function(block, generator) {
    const r = generator.valueToCode(block, 'R', generator.ORDER_ATOMIC) || '0';
    const g = generator.valueToCode(block, 'G', generator.ORDER_ATOMIC) || '0';
    const b = generator.valueToCode(block, 'B', generator.ORDER_ATOMIC) || '0';
    return `stroke(${r}, ${g}, ${b})\n`;
};

Blockly.Blocks['processing_noStroke'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('no stroke');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Disable stroke');
    }
};

python.pythonGenerator.forBlock['processing_noStroke'] = function(block, generator) {
    return 'noStroke()\n';
};

Blockly.Blocks['processing_strokeWeight'] = {
    init: function() {
        this.appendValueInput('WEIGHT')
            .setCheck('Number')
            .appendField('stroke weight:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#8b5cf6');
        this.setTooltip('Set stroke width');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['processing_strokeWeight'] = function(block, generator) {
    const weight = generator.valueToCode(block, 'WEIGHT', generator.ORDER_ATOMIC) || '1';
    return `strokeWeight(${weight})\n`;
};
