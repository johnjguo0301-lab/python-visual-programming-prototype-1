// Logic/Conditional blocks for Python Visual Programming
// Defines Blockly blocks for if/else, comparisons, boolean logic

Blockly.common.defineBlocksWithJsonArray([
  // --- STATEMENT BLOCKS ---
  {
    "type": "logic_if",
    "message0": "if %1 :",
    "args0": [
      {"type": "input_value", "name": "CONDITION"}
    ],
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "DO"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "If the condition is true, run the statements inside.",
    "helpUrl": ""
  },
  {
    "type": "logic_if_else",
    "message0": "if %1 :",
    "args0": [
      {"type": "input_value", "name": "CONDITION"}
    ],
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "DO"}
    ],
    "message2": "else:",
    "message3": "%1",
    "args3": [
      {"type": "input_statement", "name": "ELSE"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "If the condition is true, run the first block. Otherwise, run the second block.",
    "helpUrl": ""
  },
  {
    "type": "logic_if_elif_else",
    "message0": "if %1 :",
    "args0": [
      {"type": "input_value", "name": "CONDITION1"}
    ],
    "message1": "%1",
    "args1": [
      {"type": "input_statement", "name": "DO1"}
    ],
    "message2": "elif %1 :",
    "args2": [
      {"type": "input_value", "name": "CONDITION2"}
    ],
    "message3": "%1",
    "args3": [
      {"type": "input_statement", "name": "DO2"}
    ],
    "message4": "else:",
    "message5": "%1",
    "args5": [
      {"type": "input_statement", "name": "ELSE"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "If/elif/else conditional block.",
    "helpUrl": ""
  },
  // --- OUTPUT BLOCKS ---
  {
    "type": "logic_compare",
    "message0": "%1 %2 %3",
    "args0": [
      {"type": "input_value", "name": "A"},
      {"type": "field_dropdown", "name": "OP", "options": [
        ["=", "EQ"],
        ["\u2260", "NEQ"],
        ["<", "LT"],
        [">", "GT"],
        ["\u2264", "LTE"],
        ["\u2265", "GTE"]
      ]},
      {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": 210,
    "tooltip": "Compare two values.",
    "helpUrl": ""
  },
  {
    "type": "logic_boolean",
    "message0": "%1",
    "args0": [
      {"type": "field_dropdown", "name": "BOOL", "options": [
        ["True", "TRUE"],
        ["False", "FALSE"]
      ]}
    ],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Returns either True or False.",
    "helpUrl": ""
  },
  {
    "type": "logic_and",
    "message0": "%1 and %2",
    "args0": [
      {"type": "input_value", "name": "A"},
      {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Returns True if both inputs are true.",
    "helpUrl": ""
  },
  {
    "type": "logic_or",
    "message0": "%1 or %2",
    "args0": [
      {"type": "input_value", "name": "A"},
      {"type": "input_value", "name": "B"}
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Returns True if either input is true.",
    "helpUrl": ""
  },
  {
    "type": "logic_not",
    "message0": "not %1",
    "args0": [
      {"type": "input_value", "name": "VALUE"}
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 210,
    "tooltip": "Returns True if the input is False.",
    "helpUrl": ""
  }
]);

// =============================================================================
// Python Generators
// =============================================================================

// --- logic_if ---
python.pythonGenerator.forBlock['logic_if'] = function(block, generator) {
  var condition = generator.valueToCode(block, 'CONDITION', generator.ORDER_NONE) || 'True';
  var body = generator.statementToCode(block, 'DO') || generator.INDENT + 'pass\n';
  return 'if ' + condition + ':\n' + body;
};

// --- logic_if_else ---
python.pythonGenerator.forBlock['logic_if_else'] = function(block, generator) {
  var condition = generator.valueToCode(block, 'CONDITION', generator.ORDER_NONE) || 'True';
  var doBody = generator.statementToCode(block, 'DO') || generator.INDENT + 'pass\n';
  var elseBody = generator.statementToCode(block, 'ELSE') || generator.INDENT + 'pass\n';
  return 'if ' + condition + ':\n' + doBody + 'else:\n' + elseBody;
};

// --- logic_if_elif_else ---
python.pythonGenerator.forBlock['logic_if_elif_else'] = function(block, generator) {
  var condition1 = generator.valueToCode(block, 'CONDITION1', generator.ORDER_NONE) || 'True';
  var do1 = generator.statementToCode(block, 'DO1') || generator.INDENT + 'pass\n';
  var condition2 = generator.valueToCode(block, 'CONDITION2', generator.ORDER_NONE) || 'True';
  var do2 = generator.statementToCode(block, 'DO2') || generator.INDENT + 'pass\n';
  var elseBody = generator.statementToCode(block, 'ELSE') || generator.INDENT + 'pass\n';
  return 'if ' + condition1 + ':\n' + do1 +
         'elif ' + condition2 + ':\n' + do2 +
         'else:\n' + elseBody;
};

// --- logic_compare ---
python.pythonGenerator.forBlock['logic_compare'] = function(block, generator) {
  var opMap = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'GT': '>',
    'LTE': '<=',
    'GTE': '>='
  };
  var op = opMap[block.getFieldValue('OP')];
  var a = generator.valueToCode(block, 'A', generator.ORDER_RELATIONAL) || '0';
  var b = generator.valueToCode(block, 'B', generator.ORDER_RELATIONAL) || '0';
  var code = a + ' ' + op + ' ' + b;
  return [code, generator.ORDER_RELATIONAL];
};

// --- logic_boolean ---
python.pythonGenerator.forBlock['logic_boolean'] = function(block, generator) {
  var code = (block.getFieldValue('BOOL') === 'TRUE') ? 'True' : 'False';
  return [code, generator.ORDER_ATOMIC];
};

// --- logic_and ---
python.pythonGenerator.forBlock['logic_and'] = function(block, generator) {
  var a = generator.valueToCode(block, 'A', generator.ORDER_LOGICAL_AND) || 'True';
  var b = generator.valueToCode(block, 'B', generator.ORDER_LOGICAL_AND) || 'True';
  var code = a + ' and ' + b;
  return [code, generator.ORDER_LOGICAL_AND];
};

// --- logic_or ---
python.pythonGenerator.forBlock['logic_or'] = function(block, generator) {
  var a = generator.valueToCode(block, 'A', generator.ORDER_LOGICAL_OR) || 'True';
  var b = generator.valueToCode(block, 'B', generator.ORDER_LOGICAL_OR) || 'True';
  var code = a + ' or ' + b;
  return [code, generator.ORDER_LOGICAL_OR];
};

// --- logic_not ---
python.pythonGenerator.forBlock['logic_not'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_LOGICAL_NOT) || 'True';
  var code = 'not ' + value;
  return [code, generator.ORDER_LOGICAL_NOT];
};