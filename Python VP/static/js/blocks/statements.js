// Block definitions for Python statements
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "print_block",
    "message0": "print( %1 )",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": null, "nextStatement": null,
    "colour": 170, "tooltip": "Print a single value to the console"
  },
  {
    "type": "print_multi",
    "message0": "print( %1 , %2 , %3 )",
    "args0": [
      { "type": "input_value", "name": "A" },
      { "type": "input_value", "name": "B" },
      { "type": "input_value", "name": "C" }
    ],
    "inputsInline": true,
    "previousStatement": null, "nextStatement": null,
    "colour": 170, "tooltip": "Print multiple values separated by spaces"
  },
  {
    "type": "input_block",
    "message0": "input( %1 )",
    "args0": [
      {
        "type": "field_input",
        "name": "PROMPT",
        "text": "Enter value: "
      }
    ],
    "output": "String",
    "colour": 170,
    "tooltip": "Get input from the user",
    "helpUrl": ""
  },
  {
    "type": "sleep_block",
    "message0": "sleep( %1 )",
    "args0": [
      {
        "type": "input_value",
        "name": "SECONDS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 170,
    "tooltip": "Pause execution for a number of seconds",
    "helpUrl": ""
  },
  {
    "type": "pass_block",
    "message0": "pass",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 170,
    "tooltip": "A null operation — does nothing",
    "helpUrl": ""
  },
  {
    "type": "break_block",
    "message0": "break",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 170,
    "tooltip": "Break out of a loop",
    "helpUrl": ""
  },
  {
    "type": "continue_block",
    "message0": "continue",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 170,
    "tooltip": "Skip to the next iteration of a loop",
    "helpUrl": ""
  }
]);

// Python generators for statement blocks
python.pythonGenerator.forBlock['print_block'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || '';
  return 'print(' + value + ')\n';
};

python.pythonGenerator.forBlock['print_multi'] = function(block, generator) {
  var parts = [];
  var a = generator.valueToCode(block, 'A', generator.ORDER_NONE);
  var b = generator.valueToCode(block, 'B', generator.ORDER_NONE);
  var c = generator.valueToCode(block, 'C', generator.ORDER_NONE);
  if (a) parts.push(a);
  if (b) parts.push(b);
  if (c) parts.push(c);
  return 'print(' + parts.join(', ') + ')\n';
};

python.pythonGenerator.forBlock['input_block'] = function(block, generator) {
  var prompt = block.getFieldValue('PROMPT');
  var code = 'input(\'' + prompt + '\')';
  return [code, generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['sleep_block'] = function(block, generator) {
  var seconds = generator.valueToCode(block, 'SECONDS', generator.ORDER_NONE) || '1';
  return 'import time\ntime.sleep(' + seconds + ')\n';
};

python.pythonGenerator.forBlock['pass_block'] = function(block, generator) {
  return 'pass\n';
};

python.pythonGenerator.forBlock['break_block'] = function(block, generator) {
  return 'break\n';
};

python.pythonGenerator.forBlock['continue_block'] = function(block, generator) {
  return 'continue\n';
};
