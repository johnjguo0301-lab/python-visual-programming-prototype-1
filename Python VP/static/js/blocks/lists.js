// List operation blocks for Python
// Colour: 260 (indigo)

Blockly.common.defineBlocksWithJsonArray([
  // OUTPUT blocks
  {
    "type": "lists_create_empty",
    "message0": "empty list []",
    "output": "Array",
    "colour": 260,
    "tooltip": "Creates an empty list.",
    "helpUrl": ""
  },
  {
    "type": "lists_create_with",
    "message0": "list [ %1 , %2 , %3 ]",
    "args0": [
      {"type": "input_value", "name": "ITEM0"},
      {"type": "input_value", "name": "ITEM1"},
      {"type": "input_value", "name": "ITEM2"}
    ],
    "inputsInline": true,
    "output": "Array",
    "colour": 260,
    "tooltip": "Creates a list with up to 3 items.",
    "helpUrl": ""
  },
  {
    "type": "lists_pop",
    "message0": "%1 .pop()",
    "args0": [
      {"type": "input_value", "name": "LIST"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": 260,
    "tooltip": "Removes and returns the last item from a list.",
    "helpUrl": ""
  },
  {
    "type": "lists_index",
    "message0": "%1 [ %2 ]",
    "args0": [
      {"type": "input_value", "name": "LIST"},
      {"type": "input_value", "name": "INDEX"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": 260,
    "tooltip": "Gets the item at the given index in a list.",
    "helpUrl": ""
  },
  {
    "type": "lists_length",
    "message0": "len( %1 )",
    "args0": [
      {"type": "input_value", "name": "LIST"}
    ],
    "inputsInline": true,
    "output": null,
    "colour": 260,
    "tooltip": "Returns the length of a list.",
    "helpUrl": ""
  },
  // STATEMENT blocks
  {
    "type": "lists_append",
    "message0": "%1 .append( %2 )",
    "args0": [
      {"type": "input_value", "name": "LIST"},
      {"type": "input_value", "name": "ITEM"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Appends an item to the end of a list.",
    "helpUrl": ""
  },
  {
    "type": "lists_remove",
    "message0": "%1 .remove( %2 )",
    "args0": [
      {"type": "input_value", "name": "LIST"},
      {"type": "input_value", "name": "ITEM"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Removes the first occurrence of an item from a list.",
    "helpUrl": ""
  },
  {
    "type": "lists_insert",
    "message0": "%1 .insert( %2 , %3 )",
    "args0": [
      {"type": "input_value", "name": "LIST"},
      {"type": "input_value", "name": "INDEX"},
      {"type": "input_value", "name": "ITEM"}
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "Inserts an item at the given index in a list.",
    "helpUrl": ""
  }
]);

// --- Python Generators ---

python.pythonGenerator.forBlock['lists_create_empty'] = function(block, generator) {
  return ['[]', python.pythonGenerator.ORDER_ATOMIC];
};

python.pythonGenerator.forBlock['lists_create_with'] = function(block, generator) {
  var item0 = generator.valueToCode(block, 'ITEM0', python.pythonGenerator.ORDER_NONE) || '';
  var item1 = generator.valueToCode(block, 'ITEM1', python.pythonGenerator.ORDER_NONE) || '';
  var item2 = generator.valueToCode(block, 'ITEM2', python.pythonGenerator.ORDER_NONE) || '';
  var items = [item0, item1, item2].filter(function(item) { return item !== ''; });
  var code = '[' + items.join(', ') + ']';
  return [code, python.pythonGenerator.ORDER_ATOMIC];
};

python.pythonGenerator.forBlock['lists_pop'] = function(block, generator) {
  var list = generator.valueToCode(block, 'LIST', python.pythonGenerator.ORDER_MEMBER) || '[]';
  var code = list + '.pop()';
  return [code, python.pythonGenerator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['lists_index'] = function(block, generator) {
  var list = generator.valueToCode(block, 'LIST', python.pythonGenerator.ORDER_MEMBER) || '[]';
  var index = generator.valueToCode(block, 'INDEX', python.pythonGenerator.ORDER_NONE) || '0';
  var code = list + '[' + index + ']';
  return [code, python.pythonGenerator.ORDER_MEMBER];
};

python.pythonGenerator.forBlock['lists_length'] = function(block, generator) {
  var list = generator.valueToCode(block, 'LIST', python.pythonGenerator.ORDER_NONE) || '[]';
  var code = 'len(' + list + ')';
  return [code, python.pythonGenerator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['lists_append'] = function(block, generator) {
  var list = generator.valueToCode(block, 'LIST', python.pythonGenerator.ORDER_MEMBER) || '[]';
  var item = generator.valueToCode(block, 'ITEM', python.pythonGenerator.ORDER_NONE) || 'None';
  return list + '.append(' + item + ')\n';
};

python.pythonGenerator.forBlock['lists_remove'] = function(block, generator) {
  var list = generator.valueToCode(block, 'LIST', python.pythonGenerator.ORDER_MEMBER) || '[]';
  var item = generator.valueToCode(block, 'ITEM', python.pythonGenerator.ORDER_NONE) || 'None';
  return list + '.remove(' + item + ')\n';
};

python.pythonGenerator.forBlock['lists_insert'] = function(block, generator) {
  var list = generator.valueToCode(block, 'LIST', python.pythonGenerator.ORDER_MEMBER) || '[]';
  var index = generator.valueToCode(block, 'INDEX', python.pythonGenerator.ORDER_NONE) || '0';
  var item = generator.valueToCode(block, 'ITEM', python.pythonGenerator.ORDER_NONE) || 'None';
  return list + '.insert(' + index + ', ' + item + ')\n';
};
