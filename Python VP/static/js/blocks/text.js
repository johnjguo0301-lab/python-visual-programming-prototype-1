// Block definitions for Python text/string operations
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "text_literal",
    "message0": "\" %1 \"",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
        "text": "hello"
      }
    ],
    "output": "String",
    "colour": 160,
    "tooltip": "A text string",
    "helpUrl": ""
  },
  {
    "type": "text_concat",
    "message0": "%1 + %2",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "output": "String",
    "colour": 160,
    "tooltip": "Concatenate two values",
    "helpUrl": ""
  },
  {
    "type": "text_str",
    "message0": "str( %1 )",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "output": "String",
    "colour": 160,
    "tooltip": "Convert a value to a string",
    "helpUrl": ""
  },
  {
    "type": "text_int",
    "message0": "int( %1 )",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "output": null,
    "colour": 160,
    "tooltip": "Convert a value to an integer",
    "helpUrl": ""
  },
  {
    "type": "text_float",
    "message0": "float( %1 )",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "output": null,
    "colour": 160,
    "tooltip": "Convert a value to a float",
    "helpUrl": ""
  },
  {
    "type": "text_len",
    "message0": "len( %1 )",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "output": null,
    "colour": 160,
    "tooltip": "Get the length of a value",
    "helpUrl": ""
  },
  {
    "type": "text_upper",
    "message0": "%1 .upper()",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "output": "String",
    "colour": 160,
    "tooltip": "Convert text to uppercase",
    "helpUrl": ""
  },
  {
    "type": "text_lower",
    "message0": "%1 .lower()",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "output": "String",
    "colour": 160,
    "tooltip": "Convert text to lowercase",
    "helpUrl": ""
  },
  {
    "type": "text_replace",
    "message0": "%1 .replace( %2 , %3 )",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      },
      {
        "type": "input_value",
        "name": "OLD"
      },
      {
        "type": "input_value",
        "name": "NEW"
      }
    ],
    "output": "String",
    "colour": 160,
    "tooltip": "Replace occurrences of old text with new text",
    "helpUrl": ""
  }
]);

// Python generators for text blocks
python.pythonGenerator.forBlock['text_literal'] = function(block, generator) {
  var text = block.getFieldValue('TEXT');
  return ["'" + text + "'", generator.ORDER_ATOMIC];
};

python.pythonGenerator.forBlock['text_concat'] = function(block, generator) {
  var a = generator.valueToCode(block, 'A', generator.ORDER_ADDITIVE) || "''";
  var b = generator.valueToCode(block, 'B', generator.ORDER_ADDITIVE) || "''";
  return [a + ' + ' + b, generator.ORDER_ADDITIVE];
};

python.pythonGenerator.forBlock['text_str'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || "''";
  return ['str(' + value + ')', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['text_int'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0';
  return ['int(' + value + ')', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['text_float'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '0';
  return ['float(' + value + ')', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['text_len'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || "''";
  return ['len(' + value + ')', generator.ORDER_FUNCTION_CALL];
};
python.pythonGenerator.forBlock['text_upper'] = function(block, generator) {
  var text = generator.valueToCode(block, 'TEXT', generator.ORDER_MEMBER) || "''";
  return [text + '.upper()', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['text_lower'] = function(block, generator) {
  var text = generator.valueToCode(block, 'TEXT', generator.ORDER_MEMBER) || "''";
  return [text + '.lower()', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['text_replace'] = function(block, generator) {
  var text = generator.valueToCode(block, 'TEXT', generator.ORDER_MEMBER) || "''";
  var old = generator.valueToCode(block, 'OLD', generator.ORDER_NONE) || "''";
  var new_ = generator.valueToCode(block, 'NEW', generator.ORDER_NONE) || "''";
  return [text + '.replace(' + old + ', ' + new_ + ')', generator.ORDER_FUNCTION_CALL];
};
