// Loop blocks for Python Visual Programming
// Defines Blockly blocks for for-loops and while-loops

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "loop_for_range",
    "message0": "for %1 in range( %2 , %3 ):",
    "args0": [
      {"type": "field_variable", "name": "VAR", "variable": "i"},
      {"type": "input_value", "name": "START"},
      {"type": "input_value", "name": "END"}
    ],
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "DO"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Count with a variable from start to end. Use a variable block to access the loop variable inside.",
    "helpUrl": ""
  },
  {
    "type": "loop_for_in",
    "message0": "for %1 in %2 :",
    "args0": [
      {"type": "field_variable", "name": "VAR", "variable": "item"},
      {"type": "input_value", "name": "LIST"}
    ],
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "DO"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "For each item in a list. Use a variable block to access the loop variable inside.",
    "helpUrl": ""
  },
  {
    "type": "loop_while",
    "message0": "while %1 :",
    "args0": [
      {"type": "input_value", "name": "CONDITION"}
    ],
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "DO"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Repeat while a condition is true.",
    "helpUrl": ""
  },
  {
    "type": "loop_while_true",
    "message0": "while True:",
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "DO"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "Repeat forever (while True). Use a break block to exit.",
    "helpUrl": ""
  }
]);

// =============================================================================
// Python Generators
// =============================================================================

// --- loop_for_range ---
python.pythonGenerator.forBlock['loop_for_range'] = function(block, generator) {
  console.log('loop_for_range generator called!');
  var variable = generator.getVariableName(block.getFieldValue('VAR'));
  var start = generator.valueToCode(block, 'START', generator.ORDER_NONE) || '0';
  var end = generator.valueToCode(block, 'END', generator.ORDER_NONE) || '10';
  var body = generator.statementToCode(block, 'DO') || generator.INDENT + 'pass\n';
  var code = 'for ' + variable + ' in range(' + start + ', ' + end + '):\n' + body;
  console.log('loop_for_range generated:', code);
  return code;
};

// --- loop_for_in ---
python.pythonGenerator.forBlock['loop_for_in'] = function(block, generator) {
  var variable = generator.getVariableName(block.getFieldValue('VAR'));
  var list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE) || '[]';
  var body = generator.statementToCode(block, 'DO') || generator.INDENT + 'pass\n';
  return 'for ' + variable + ' in ' + list + ':\n' + body;
};

// --- loop_while ---
python.pythonGenerator.forBlock['loop_while'] = function(block, generator) {
  var condition = generator.valueToCode(block, 'CONDITION', generator.ORDER_NONE) || 'False';
  var body = generator.statementToCode(block, 'DO') || generator.INDENT + 'pass\n';
  return 'while ' + condition + ':\n' + body;
};

// --- loop_while_true ---
python.pythonGenerator.forBlock['loop_while_true'] = function(block, generator) {
  var body = generator.statementToCode(block, 'DO') || generator.INDENT + 'pass\n';
  return 'while True:\n' + body;
};