// Math blocks for Python math operations

Blockly.common.defineBlocksWithJsonArray([
  // 1. math_number
  {
    "type": "math_number",
    "message0": "%1",
    "args0": [
      {
        "type": "field_number",
        "name": "NUM",
        "value": 0
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "A number"
  },
  // 2. math_arithmetic
  {
    "type": "math_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "A" },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["+", "ADD"],
          ["-", "SUB"],
          ["\u00d7", "MUL"],
          ["\u00f7", "DIV"]
        ]
      },
      { "type": "input_value", "name": "B" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Arithmetic operation"
  },
  // 3. math_modulo
  {
    "type": "math_modulo",
    "message0": "%1 %% %2",
    "args0": [
      { "type": "input_value", "name": "A" },
      { "type": "input_value", "name": "B" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Modulo (remainder)"
  },
  // 4. math_floor_div
  {
    "type": "math_floor_div",
    "message0": "%1 // %2",
    "args0": [
      { "type": "input_value", "name": "A" },
      { "type": "input_value", "name": "B" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Floor division"
  },
  // 5. math_abs
  {
    "type": "math_abs",
    "message0": "abs(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Absolute value"
  },
  // 6. math_pow
  {
    "type": "math_pow",
    "message0": "pow(%1, %2)",
    "args0": [
      { "type": "input_value", "name": "BASE" },
      { "type": "input_value", "name": "EXP" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Power"
  },
  // 7. math_round
  {
    "type": "math_round",
    "message0": "round(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Round to nearest integer"
  },
  // 8. math_sum
  {
    "type": "math_sum",
    "message0": "sum(%1)",
    "args0": [
      { "type": "input_value", "name": "LIST" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Sum of a list"
  },
  // 9. math_min
  {
    "type": "math_min",
    "message0": "min(%1, %2)",
    "args0": [
      { "type": "input_value", "name": "A" },
      { "type": "input_value", "name": "B" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Minimum of two values"
  },
  // 10. math_max
  {
    "type": "math_max",
    "message0": "max(%1, %2)",
    "args0": [
      { "type": "input_value", "name": "A" },
      { "type": "input_value", "name": "B" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Maximum of two values"
  },
  // 11. math_sqrt
  {
    "type": "math_sqrt",
    "message0": "math.sqrt(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Square root"
  },
  // 12. math_ceil
  {
    "type": "math_ceil",
    "message0": "math.ceil(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Ceiling"
  },
  // 13. math_floor
  {
    "type": "math_floor",
    "message0": "math.floor(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Floor"
  },
  // 14. math_pi
  {
    "type": "math_pi",
    "message0": "math.pi",
    "output": null,
    "colour": 230,
    "tooltip": "The constant pi"
  },
  // 15. math_e
  {
    "type": "math_e",
    "message0": "math.e",
    "output": null,
    "colour": 230,
    "tooltip": "The constant e"
  },
  // 16. math_sin
  {
    "type": "math_sin",
    "message0": "math.sin(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Sine"
  },
  // 17. math_cos
  {
    "type": "math_cos",
    "message0": "math.cos(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Cosine"
  },
  // 18. math_tan
  {
    "type": "math_tan",
    "message0": "math.tan(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Tangent"
  },
  // 19. math_degrees
  {
    "type": "math_degrees",
    "message0": "math.degrees(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Radians to degrees"
  },
  // 20. math_radians
  {
    "type": "math_radians",
    "message0": "math.radians(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Degrees to radians"
  },
  // 21. math_log
  {
    "type": "math_log",
    "message0": "math.log(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Natural logarithm"
  },
  // 22. math_factorial
  {
    "type": "math_factorial",
    "message0": "math.factorial(%1)",
    "args0": [
      { "type": "input_value", "name": "VALUE" }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Factorial"
  }
]);

// --- Python Generators ---

// 1. math_number
python.pythonGenerator.forBlock['math_number'] = function(block, generator) {
  var num = block.getFieldValue('NUM');
  return [String(num), python.Order.ATOMIC];
};

// 2. math_arithmetic
python.pythonGenerator.forBlock['math_arithmetic'] = function(block, generator) {
  var opMap = {
    'ADD': ['+', python.Order.ADDITIVE],
    'SUB': ['-', python.Order.ADDITIVE],
    'MUL': ['*', python.Order.MULTIPLICATIVE],
    'DIV': ['/', python.Order.MULTIPLICATIVE]
  };
  var op = block.getFieldValue('OP');
  var tuple = opMap[op];
  var operator = tuple[0];
  var order = tuple[1];
  var a = generator.valueToCode(block, 'A', order) || '0';
  var b = generator.valueToCode(block, 'B', order) || '0';
  var code = a + ' ' + operator + ' ' + b;
  return [code, order];
};

// 3. math_modulo
python.pythonGenerator.forBlock['math_modulo'] = function(block, generator) {
  var a = generator.valueToCode(block, 'A', python.Order.MULTIPLICATIVE) || '0';
  var b = generator.valueToCode(block, 'B', python.Order.MULTIPLICATIVE) || '0';
  var code = a + ' % ' + b;
  return [code, python.Order.MULTIPLICATIVE];
};

// 4. math_floor_div
python.pythonGenerator.forBlock['math_floor_div'] = function(block, generator) {
  var a = generator.valueToCode(block, 'A', python.Order.MULTIPLICATIVE) || '0';
  var b = generator.valueToCode(block, 'B', python.Order.MULTIPLICATIVE) || '0';
  var code = a + ' // ' + b;
  return [code, python.Order.MULTIPLICATIVE];
};

// 5. math_abs
python.pythonGenerator.forBlock['math_abs'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'abs(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 6. math_pow
python.pythonGenerator.forBlock['math_pow'] = function(block, generator) {
  var base = generator.valueToCode(block, 'BASE', python.Order.NONE) || '0';
  var exp = generator.valueToCode(block, 'EXP', python.Order.NONE) || '0';
  var code = 'pow(' + base + ', ' + exp + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 7. math_round
python.pythonGenerator.forBlock['math_round'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'round(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 8. math_sum
python.pythonGenerator.forBlock['math_sum'] = function(block, generator) {
  var list = generator.valueToCode(block, 'LIST', python.Order.NONE) || '[]';
  var code = 'sum(' + list + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 9. math_min
python.pythonGenerator.forBlock['math_min'] = function(block, generator) {
  var a = generator.valueToCode(block, 'A', python.Order.NONE) || '0';
  var b = generator.valueToCode(block, 'B', python.Order.NONE) || '0';
  var code = 'min(' + a + ', ' + b + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 10. math_max
python.pythonGenerator.forBlock['math_max'] = function(block, generator) {
  var a = generator.valueToCode(block, 'A', python.Order.NONE) || '0';
  var b = generator.valueToCode(block, 'B', python.Order.NONE) || '0';
  var code = 'max(' + a + ', ' + b + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 11. math_sqrt
python.pythonGenerator.forBlock['math_sqrt'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.sqrt(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 12. math_ceil
python.pythonGenerator.forBlock['math_ceil'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.ceil(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 13. math_floor
python.pythonGenerator.forBlock['math_floor'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.floor(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 14. math_pi
python.pythonGenerator.forBlock['math_pi'] = function(block, generator) {
  return ['math.pi', python.Order.ATOMIC];
};

// 15. math_e
python.pythonGenerator.forBlock['math_e'] = function(block, generator) {
  return ['math.e', python.Order.ATOMIC];
};

// 16. math_sin
python.pythonGenerator.forBlock['math_sin'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.sin(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 17. math_cos
python.pythonGenerator.forBlock['math_cos'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.cos(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 18. math_tan
python.pythonGenerator.forBlock['math_tan'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.tan(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 19. math_degrees
python.pythonGenerator.forBlock['math_degrees'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.degrees(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 20. math_radians
python.pythonGenerator.forBlock['math_radians'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.radians(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 21. math_log
python.pythonGenerator.forBlock['math_log'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.log(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};

// 22. math_factorial
python.pythonGenerator.forBlock['math_factorial'] = function(block, generator) {
  var value = generator.valueToCode(block, 'VALUE', python.Order.NONE) || '0';
  var code = 'math.factorial(' + value + ')';
  return [code, python.Order.FUNCTION_CALL];
};