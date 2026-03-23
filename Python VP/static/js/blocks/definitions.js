// Function definition blocks for Python Visual Programming
// Defines Blockly blocks for def, return, and function calls

Blockly.common.defineBlocksWithJsonArray([
  // --- STATEMENT BLOCKS ---
  {
    "type": "def_function",
    "message0": "def %1 ():",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "my_function"}
    ],
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "BODY"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Define a function with no parameters.",
    "helpUrl": ""
  },
  {
    "type": "def_function_params",
    "message0": "def %1 ( %2 ):",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "my_function"},
      {"type": "field_input", "name": "PARAMS", "text": "x, y"}
    ],
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "BODY"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Define a function with parameters. Type parameter names separated by commas.",
    "helpUrl": ""
  },
  {
    "type": "return_block",
    "message0": "return %1",
    "args0": [
      {"type": "input_value", "name": "VALUE"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Return a value from a function.",
    "helpUrl": ""
  },
  // --- OUTPUT BLOCKS ---
  {
    "type": "call_function",
    "message0": "%1 ( %2 )",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "my_function"},
      {"type": "field_input", "name": "ARGS", "text": ""}
    ],
    "output": null,
    "colour": 290,
    "tooltip": "Call a function with optional arguments.",
    "helpUrl": ""
  },
  {
    "type": "param_get",
    "message0": "parameter %1",
    "args0": [
      {"type": "field_input", "name": "PARAM_NAME", "text": "x"}
    ],
    "output": null,
    "colour": 290,
    "tooltip": "Get the value of a function parameter. Type the parameter name.",
    "helpUrl": ""
  },
  {
    "type": "call_function_statement",
    "message0": "call %1 ( %2 )",
    "args0": [
      {"type": "field_input", "name": "NAME", "text": "my_function"},
      {"type": "field_input", "name": "ARGS", "text": ""}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Call/run a function as a statement. Type arguments separated by commas.",
    "helpUrl": ""
  }
]);

// =============================================================================
// Python Generators
// =============================================================================

// --- def_function ---
python.pythonGenerator.forBlock['def_function'] = function(block, generator) {
  var name = block.getFieldValue('NAME');
  var body = generator.statementToCode(block, 'BODY') || generator.INDENT + 'pass\n';
  return 'def ' + name + '():\n' + body;
};

// --- def_function_params ---
python.pythonGenerator.forBlock['def_function_params'] = function(block, generator) {
  var name = block.getFieldValue('NAME');
  var params = block.getFieldValue('PARAMS');
  var body = generator.statementToCode(block, 'BODY') || generator.INDENT + 'pass\n';
  return 'def ' + name + '(' + params + '):\n' + body;
};

// --- return_block ---
python.pythonGenerator.forBlock['return_block'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE);
  if (value) {
    return 'return ' + value + '\n';
  }
  return 'return\n';
};

// --- call_function ---
python.pythonGenerator.forBlock['call_function'] = function(block, generator) {
  var name = block.getFieldValue('NAME');
  var args = block.getFieldValue('ARGS');
  var code = name + '(' + args + ')';
  return [code, generator.ORDER_FUNCTION_CALL];
};

// --- param_get ---
python.pythonGenerator.forBlock['param_get'] = function(block, generator) {
  var paramName = block.getFieldValue('PARAM_NAME');
  return [paramName, generator.ORDER_ATOMIC];
};

// --- call_function_statement ---
python.pythonGenerator.forBlock['call_function_statement'] = function(block, generator) {
  var name = block.getFieldValue('NAME');
  var args = block.getFieldValue('ARGS');
  return name + '(' + args + ')\n';
};
