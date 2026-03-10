// Block definitions for Python variables
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "variables_create",
    "message0": "create variable %1 = %2",
    "args0": [
      { "type": "field_variable", "name": "NAME", "variable": "my_var" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null, "nextStatement": null,
    "colour": 330, "tooltip": "Create a new variable with a value"
  },
  {
    "type": "variables_set",
    "message0": "set %1 = %2",
    "args0": [
      { "type": "field_variable", "name": "NAME", "variable": "my_var" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null, "nextStatement": null,
    "colour": 330, "tooltip": "Set a variable to a value"
  },
  {
    "type": "variables_get",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "NAME",
        "variable": "my_var"
      }
    ],
    "output": null,
    "colour": 330,
    "tooltip": "Get the value of a variable. Select from dropdown to pick loop variables, parameters, etc.",
    "helpUrl": ""
  }
]);

// Python generators for variable blocks
python.pythonGenerator.forBlock['variables_create'] = function(block, generator) {
  var name = generator.getVariableName(block.getFieldValue('NAME'));
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0';
  return name + ' = ' + value + '\n';
};

python.pythonGenerator.forBlock['variables_set'] = function(block, generator) {
  var name = generator.getVariableName(block.getFieldValue('NAME'));
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0';
  return name + ' = ' + value + '\n';
};

python.pythonGenerator.forBlock['variables_get'] = function(block, generator) {
  var name = generator.getVariableName(block.getFieldValue('NAME'));
  return [name, generator.ORDER_ATOMIC];
};
