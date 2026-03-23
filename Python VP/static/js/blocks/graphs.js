/**
 * Matplotlib (Graphs) Blocks
 * Blocks for creating data visualizations with matplotlib
 */

// ===== Data Creation Blocks =====

Blockly.Blocks['graph_create_list'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('list')
            .appendField(new Blockly.FieldTextInput('[1, 2, 3, 4]'), 'VALUES');
        this.setOutput(true, null);
        this.setColour('#f97316');
        this.setTooltip('Create a list of numbers');
    }
};

python.pythonGenerator.forBlock['graph_create_list'] = function(block, generator) {
    const values = block.getFieldValue('VALUES');
    return [values, generator.ORDER_ATOMIC];
};

Blockly.Blocks['graph_range'] = {
    init: function() {
        this.appendValueInput('START')
            .setCheck('Number')
            .appendField('range from');
        this.appendValueInput('STOP')
            .setCheck('Number')
            .appendField('to');
        this.appendValueInput('STEP')
            .setCheck('Number')
            .appendField('step');
        this.setOutput(true, null);
        this.setColour('#f97316');
        this.setTooltip('Generate a range of numbers');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['graph_range'] = function(block, generator) {
    const start = generator.valueToCode(block, 'START', generator.ORDER_ATOMIC) || '0';
    const stop = generator.valueToCode(block, 'STOP', generator.ORDER_ATOMIC) || '10';
    const step = generator.valueToCode(block, 'STEP', generator.ORDER_ATOMIC) || '1';
    return [`list(range(${start}, ${stop}, ${step}))`, generator.ORDER_FUNCTION_CALL];
};

// ===== Plot Blocks =====

Blockly.Blocks['graph_plot'] = {
    init: function() {
        this.appendValueInput('X')
            .setCheck(null)
            .appendField('plot line x:');
        this.appendValueInput('Y')
            .setCheck(null)
            .appendField('y:');
        this.appendValueInput('COLOR')
            .setCheck('String')
            .appendField('color:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Create a line plot');
    }
};

python.pythonGenerator.forBlock['graph_plot'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC);
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC);
    const color = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC);

    let code = 'plt.plot(';
    if (x && y) {
        code += `${x}, ${y}`;
    } else if (y) {
        code += y;
    }
    if (color) {
        code += `, color=${color}`;
    }
    code += ')\n';
    return code;
};

Blockly.Blocks['graph_bar'] = {
    init: function() {
        this.appendValueInput('X')
            .setCheck(null)
            .appendField('bar chart x:');
        this.appendValueInput('HEIGHT')
            .setCheck(null)
            .appendField('height:');
        this.appendValueInput('COLOR')
            .setCheck('String')
            .appendField('color:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Create a bar chart');
    }
};

python.pythonGenerator.forBlock['graph_bar'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC);
    const height = generator.valueToCode(block, 'HEIGHT', generator.ORDER_ATOMIC);
    const color = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC);

    let code = 'plt.bar(';
    if (x && height) {
        code += `${x}, ${height}`;
    } else if (height) {
        code += `range(len(${height})), ${height}`;
    }
    if (color) {
        code += `, color=${color}`;
    }
    code += ')\n';
    return code;
};

Blockly.Blocks['graph_scatter'] = {
    init: function() {
        this.appendValueInput('X')
            .setCheck(null)
            .appendField('scatter plot x:');
        this.appendValueInput('Y')
            .setCheck(null)
            .appendField('y:');
        this.appendValueInput('COLOR')
            .setCheck('String')
            .appendField('color:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Create a scatter plot');
    }
};

python.pythonGenerator.forBlock['graph_scatter'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC);
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC);
    const color = generator.valueToCode(block, 'COLOR', generator.ORDER_ATOMIC);

    let code = `plt.scatter(${x}, ${y}`;
    if (color) {
        code += `, c=${color}`;
    }
    code += ')\n';
    return code;
};

Blockly.Blocks['graph_pie'] = {
    init: function() {
        this.appendValueInput('VALUES')
            .setCheck(null)
            .appendField('pie chart values:');
        this.appendValueInput('LABELS')
            .setCheck(null)
            .appendField('labels:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Create a pie chart');
    }
};

python.pythonGenerator.forBlock['graph_pie'] = function(block, generator) {
    const values = generator.valueToCode(block, 'VALUES', generator.ORDER_ATOMIC);
    const labels = generator.valueToCode(block, 'LABELS', generator.ORDER_ATOMIC);

    let code = `plt.pie(${values}`;
    if (labels) {
        code += `, labels=${labels}`;
    }
    code += ')\n';
    return code;
};

Blockly.Blocks['graph_hist'] = {
    init: function() {
        this.appendValueInput('DATA')
            .setCheck(null)
            .appendField('histogram data:');
        this.appendValueInput('BINS')
            .setCheck('Number')
            .appendField('bins:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Create a histogram');
    }
};

python.pythonGenerator.forBlock['graph_hist'] = function(block, generator) {
    const data = generator.valueToCode(block, 'DATA', generator.ORDER_ATOMIC);
    const bins = generator.valueToCode(block, 'BINS', generator.ORDER_ATOMIC);

    let code = `plt.hist(${data}`;
    if (bins) {
        code += `, bins=${bins}`;
    }
    code += ')\n';
    return code;
};

// ===== Customization Blocks =====

Blockly.Blocks['graph_title'] = {
    init: function() {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('title:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Set the plot title');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['graph_title'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '""';
    return `plt.title(${text})\n`;
};

Blockly.Blocks['graph_xlabel'] = {
    init: function() {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('x-axis label:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Set the x-axis label');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['graph_xlabel'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '""';
    return `plt.xlabel(${text})\n`;
};

Blockly.Blocks['graph_ylabel'] = {
    init: function() {
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField('y-axis label:');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Set the y-axis label');
        this.setInputsInline(true);
    }
};

python.pythonGenerator.forBlock['graph_ylabel'] = function(block, generator) {
    const text = generator.valueToCode(block, 'TEXT', generator.ORDER_ATOMIC) || '""';
    return `plt.ylabel(${text})\n`;
};

Blockly.Blocks['graph_grid'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('show grid')
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'VISIBLE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Show or hide grid lines');
    }
};

python.pythonGenerator.forBlock['graph_grid'] = function(block, generator) {
    const visible = block.getFieldValue('VISIBLE') === 'TRUE';
    return `plt.grid(${visible})\n`;
};

Blockly.Blocks['graph_legend'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('show legend');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Show the legend');
    }
};

python.pythonGenerator.forBlock['graph_legend'] = function(block, generator) {
    return 'plt.legend()\n';
};

Blockly.Blocks['graph_show'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('show plot');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#f97316');
        this.setTooltip('Display the plot');
    }
};

python.pythonGenerator.forBlock['graph_show'] = function(block, generator) {
    return 'plt.show()\n';
};

Blockly.Blocks['graph_color'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('color')
            .appendField(new Blockly.FieldDropdown([
                ['red', 'red'],
                ['blue', 'blue'],
                ['green', 'green'],
                ['orange', 'orange'],
                ['purple', 'purple'],
                ['pink', 'pink'],
                ['cyan', 'cyan'],
                ['yellow', 'yellow'],
                ['black', 'black']
            ]), 'COLOR');
        this.setOutput(true, 'String');
        this.setColour('#f97316');
        this.setTooltip('Select a color');
    }
};

python.pythonGenerator.forBlock['graph_color'] = function(block, generator) {
    const color = block.getFieldValue('COLOR');
    return [`'${color}'`, generator.ORDER_ATOMIC];
};
