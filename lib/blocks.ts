// Block definitions and Python generators for Python Visual Programming

import "./types"; // Import global type declarations
import type { BlockType, GeneratorType } from "./types";

export function registerBlocks() {
  if (typeof window === "undefined") return;
  
  const Blockly = window.Blockly;
  const python = window.python;
  
  if (!Blockly || !python) return;

  // =============================================================================
  // BLOCK DEFINITIONS
  // =============================================================================

  Blockly.common.defineBlocksWithJsonArray([
    // ===== EVENTS =====
    {
      type: "event_start",
      message0: "when program starts",
      nextStatement: null,
      colour: 45,
      tooltip: "Code below runs when the program starts",
    },
    {
      type: "event_key_pressed",
      message0: "when key %1 is pressed %2",
      args0: [
        {
          type: "field_dropdown",
          name: "KEY",
          options: [
            ["any", "any"],
            ["enter", "enter"],
            ["space", "space"],
            ["a", "a"],
            ["b", "b"],
            ["c", "c"],
          ],
        },
        { type: "input_statement", name: "DO" },
      ],
      colour: 45,
    },
    {
      type: "event_wait",
      message0: "wait %1 seconds",
      args0: [{ type: "input_value", name: "SECONDS", check: "Number" }],
      previousStatement: null,
      nextStatement: null,
      colour: 45,
      inputsInline: true,
    },
    {
      type: "event_repeat_forever",
      message0: "repeat forever %1",
      args0: [{ type: "input_statement", name: "DO" }],
      previousStatement: null,
      nextStatement: null,
      colour: 45,
    },
    {
      type: "event_stop",
      message0: "stop program",
      previousStatement: null,
      colour: 45,
    },

    // ===== VARIABLES =====
    {
      type: "variables_create",
      message0: "create variable %1 = %2",
      args0: [
        { type: "field_input", name: "VAR", text: "x" },
        { type: "input_value", name: "VALUE" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 30,
    },
    {
      type: "variables_set",
      message0: "set %1 to %2",
      args0: [
        { type: "field_input", name: "VAR", text: "x" },
        { type: "input_value", name: "VALUE" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 30,
    },
    {
      type: "variables_get",
      message0: "%1",
      args0: [{ type: "field_input", name: "VAR", text: "x" }],
      output: null,
      colour: 30,
    },

    // ===== STATEMENTS =====
    {
      type: "print_block",
      message0: "print %1",
      args0: [{ type: "input_value", name: "VALUE" }],
      previousStatement: null,
      nextStatement: null,
      colour: 180,
    },
    {
      type: "input_block",
      message0: "input %1",
      args0: [{ type: "input_value", name: "PROMPT" }],
      output: "String",
      colour: 180,
    },
    {
      type: "pass_block",
      message0: "pass",
      previousStatement: null,
      nextStatement: null,
      colour: 180,
    },
    {
      type: "break_block",
      message0: "break",
      previousStatement: null,
      nextStatement: null,
      colour: 180,
    },
    {
      type: "continue_block",
      message0: "continue",
      previousStatement: null,
      nextStatement: null,
      colour: 180,
    },

    // ===== TEXT =====
    {
      type: "text_literal",
      message0: '"%1"',
      args0: [{ type: "field_input", name: "TEXT", text: "hello" }],
      output: "String",
      colour: 180,
    },
    {
      type: "text_concat",
      message0: "%1 + %2",
      args0: [
        { type: "input_value", name: "A" },
        { type: "input_value", name: "B" },
      ],
      output: "String",
      colour: 180,
      inputsInline: true,
    },
    {
      type: "text_str",
      message0: "str(%1)",
      args0: [{ type: "input_value", name: "VALUE" }],
      output: "String",
      colour: 180,
    },
    {
      type: "text_int",
      message0: "int(%1)",
      args0: [{ type: "input_value", name: "VALUE" }],
      output: "Number",
      colour: 180,
    },
    {
      type: "text_float",
      message0: "float(%1)",
      args0: [{ type: "input_value", name: "VALUE" }],
      output: "Number",
      colour: 180,
    },
    {
      type: "text_len",
      message0: "len(%1)",
      args0: [{ type: "input_value", name: "VALUE" }],
      output: "Number",
      colour: 180,
    },

    // ===== MATH =====
    {
      type: "math_number",
      message0: "%1",
      args0: [{ type: "field_number", name: "NUM", value: 0 }],
      output: "Number",
      colour: 230,
    },
    {
      type: "math_arithmetic",
      message0: "%1 %2 %3",
      args0: [
        { type: "input_value", name: "A", check: "Number" },
        {
          type: "field_dropdown",
          name: "OP",
          options: [
            ["+", "ADD"],
            ["-", "SUB"],
            ["*", "MUL"],
            ["/", "DIV"],
          ],
        },
        { type: "input_value", name: "B", check: "Number" },
      ],
      output: "Number",
      colour: 230,
      inputsInline: true,
    },
    {
      type: "math_modulo",
      message0: "%1 mod %2",
      args0: [
        { type: "input_value", name: "A", check: "Number" },
        { type: "input_value", name: "B", check: "Number" },
      ],
      output: "Number",
      colour: 230,
      inputsInline: true,
    },
    {
      type: "math_abs",
      message0: "abs(%1)",
      args0: [{ type: "input_value", name: "NUM", check: "Number" }],
      output: "Number",
      colour: 230,
    },
    {
      type: "math_pow",
      message0: "%1 ** %2",
      args0: [
        { type: "input_value", name: "BASE", check: "Number" },
        { type: "input_value", name: "EXP", check: "Number" },
      ],
      output: "Number",
      colour: 230,
      inputsInline: true,
    },
    {
      type: "math_round",
      message0: "round(%1)",
      args0: [{ type: "input_value", name: "NUM", check: "Number" }],
      output: "Number",
      colour: 230,
    },
    {
      type: "math_sqrt",
      message0: "sqrt(%1)",
      args0: [{ type: "input_value", name: "NUM", check: "Number" }],
      output: "Number",
      colour: 230,
    },
    {
      type: "math_pi",
      message0: "pi",
      output: "Number",
      colour: 230,
    },
    {
      type: "math_sin",
      message0: "sin(%1)",
      args0: [{ type: "input_value", name: "NUM", check: "Number" }],
      output: "Number",
      colour: 230,
    },
    {
      type: "math_cos",
      message0: "cos(%1)",
      args0: [{ type: "input_value", name: "NUM", check: "Number" }],
      output: "Number",
      colour: 230,
    },

    // ===== LOGIC =====
    {
      type: "logic_if",
      message0: "if %1 : %2",
      args0: [
        { type: "input_value", name: "COND", check: "Boolean" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "logic_if_else",
      message0: "if %1 : %2 else: %3",
      args0: [
        { type: "input_value", name: "COND", check: "Boolean" },
        { type: "input_statement", name: "DO" },
        { type: "input_statement", name: "ELSE" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 210,
    },
    {
      type: "logic_compare",
      message0: "%1 %2 %3",
      args0: [
        { type: "input_value", name: "A" },
        {
          type: "field_dropdown",
          name: "OP",
          options: [
            ["==", "EQ"],
            ["!=", "NEQ"],
            ["<", "LT"],
            [">", "GT"],
            ["<=", "LTE"],
            [">=", "GTE"],
          ],
        },
        { type: "input_value", name: "B" },
      ],
      output: "Boolean",
      colour: 210,
      inputsInline: true,
    },
    {
      type: "logic_boolean",
      message0: "%1",
      args0: [
        {
          type: "field_dropdown",
          name: "BOOL",
          options: [
            ["True", "TRUE"],
            ["False", "FALSE"],
          ],
        },
      ],
      output: "Boolean",
      colour: 210,
    },
    {
      type: "logic_and",
      message0: "%1 and %2",
      args0: [
        { type: "input_value", name: "A", check: "Boolean" },
        { type: "input_value", name: "B", check: "Boolean" },
      ],
      output: "Boolean",
      colour: 210,
      inputsInline: true,
    },
    {
      type: "logic_or",
      message0: "%1 or %2",
      args0: [
        { type: "input_value", name: "A", check: "Boolean" },
        { type: "input_value", name: "B", check: "Boolean" },
      ],
      output: "Boolean",
      colour: 210,
      inputsInline: true,
    },
    {
      type: "logic_not",
      message0: "not %1",
      args0: [{ type: "input_value", name: "BOOL", check: "Boolean" }],
      output: "Boolean",
      colour: 210,
    },

    // ===== LISTS =====
    {
      type: "lists_create_empty",
      message0: "[]",
      output: "Array",
      colour: 260,
    },
    {
      type: "lists_create_with",
      message0: "[%1]",
      args0: [{ type: "field_input", name: "ITEMS", text: "1, 2, 3" }],
      output: "Array",
      colour: 260,
    },
    {
      type: "lists_append",
      message0: "%1 .append( %2 )",
      args0: [
        { type: "input_value", name: "LIST" },
        { type: "input_value", name: "ITEM" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 260,
      inputsInline: true,
    },
    {
      type: "lists_length",
      message0: "len( %1 )",
      args0: [{ type: "input_value", name: "LIST" }],
      output: "Number",
      colour: 260,
    },
    {
      type: "lists_index",
      message0: "%1 [ %2 ]",
      args0: [
        { type: "input_value", name: "LIST" },
        { type: "input_value", name: "INDEX", check: "Number" },
      ],
      output: null,
      colour: 260,
      inputsInline: true,
    },

    // ===== LOOPS =====
    {
      type: "loop_for_range",
      message0: "for %1 in range( %2 , %3 ): %4",
      args0: [
        { type: "field_input", name: "VAR", text: "i" },
        { type: "input_value", name: "START", check: "Number" },
        { type: "input_value", name: "END", check: "Number" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
    },
    {
      type: "loop_for_in",
      message0: "for %1 in %2 : %3",
      args0: [
        { type: "field_input", name: "VAR", text: "item" },
        { type: "input_value", name: "LIST" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
    },
    {
      type: "loop_while",
      message0: "while %1 : %2",
      args0: [
        { type: "input_value", name: "COND", check: "Boolean" },
        { type: "input_statement", name: "DO" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
    },

    // ===== FUNCTIONS =====
    {
      type: "def_function",
      message0: "def %1 (): %2",
      args0: [
        { type: "field_input", name: "NAME", text: "my_function" },
        { type: "input_statement", name: "BODY" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 290,
    },
    {
      type: "def_function_params",
      message0: "def %1 ( %2 ): %3",
      args0: [
        { type: "field_input", name: "NAME", text: "my_function" },
        { type: "field_input", name: "PARAMS", text: "x, y" },
        { type: "input_statement", name: "BODY" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 290,
    },
    {
      type: "return_block",
      message0: "return %1",
      args0: [{ type: "input_value", name: "VALUE" }],
      previousStatement: null,
      nextStatement: null,
      colour: 290,
    },
    {
      type: "call_function",
      message0: "%1 ( %2 )",
      args0: [
        { type: "field_input", name: "NAME", text: "my_function" },
        { type: "field_input", name: "ARGS", text: "" },
      ],
      output: null,
      colour: 290,
    },
    {
      type: "call_function_statement",
      message0: "call %1 ( %2 )",
      args0: [
        { type: "field_input", name: "NAME", text: "my_function" },
        { type: "field_input", name: "ARGS", text: "" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 290,
    },

    // ===== RANDOM =====
    {
      type: "random_randint",
      message0: "random.randint( %1 , %2 )",
      args0: [
        { type: "input_value", name: "LOW", check: "Number" },
        { type: "input_value", name: "HIGH", check: "Number" },
      ],
      output: "Number",
      colour: 160,
      inputsInline: true,
    },
    {
      type: "random_choice",
      message0: "random.choice( %1 )",
      args0: [{ type: "input_value", name: "LIST" }],
      output: null,
      colour: 160,
    },
    {
      type: "random_random",
      message0: "random.random()",
      output: "Number",
      colour: 160,
    },
  ]);

  // =============================================================================
  // PYTHON GENERATORS
  // =============================================================================

  const generator = python.pythonGenerator;

  // Events
  generator.forBlock["event_start"] = function () {
    return "";
  };

  generator.forBlock["event_key_pressed"] = function (block: BlockType, gen: GeneratorType) {
    const key = block.getFieldValue("KEY");
    const body = gen.statementToCode(block, "DO") || gen.INDENT + "pass\n";
    let code = "";
    if (key === "any") {
      code += '_key = input("Press any key and Enter: ")\n';
    } else if (key === "enter") {
      code += 'input("Press Enter to continue...")\n';
    } else {
      code += '_key = ""\nwhile _key != "' + key + '":\n';
      code += gen.INDENT + '_key = input("Press \'' + key + "' and Enter: \")\n";
    }
    code += body;
    return code;
  };

  generator.forBlock["event_wait"] = function (block: BlockType, gen: GeneratorType) {
    const seconds = gen.valueToCode(block, "SECONDS", gen.ORDER_NONE) || "1";
    return "import time\ntime.sleep(" + seconds + ")\n";
  };

  generator.forBlock["event_repeat_forever"] = function (block: BlockType, gen: GeneratorType) {
    const body = gen.statementToCode(block, "DO") || gen.INDENT + "pass\n";
    return "while True:\n" + body;
  };

  generator.forBlock["event_stop"] = function () {
    return "import sys\nsys.exit()\n";
  };

  // Variables
  generator.forBlock["variables_create"] = function (block: BlockType, gen: GeneratorType) {
    const varName = block.getFieldValue("VAR");
    const value = gen.valueToCode(block, "VALUE", gen.ORDER_NONE) || "None";
    return varName + " = " + value + "\n";
  };

  generator.forBlock["variables_set"] = function (block: BlockType, gen: GeneratorType) {
    const varName = block.getFieldValue("VAR");
    const value = gen.valueToCode(block, "VALUE", gen.ORDER_NONE) || "None";
    return varName + " = " + value + "\n";
  };

  generator.forBlock["variables_get"] = function (block: BlockType, gen: GeneratorType) {
    const varName = block.getFieldValue("VAR");
    return [varName, gen.ORDER_ATOMIC];
  };

  // Statements
  generator.forBlock["print_block"] = function (block: BlockType, gen: GeneratorType) {
    const value = gen.valueToCode(block, "VALUE", gen.ORDER_NONE) || '""';
    return "print(" + value + ")\n";
  };

  generator.forBlock["input_block"] = function (block: BlockType, gen: GeneratorType) {
    const prompt = gen.valueToCode(block, "PROMPT", gen.ORDER_NONE) || '""';
    return ["input(" + prompt + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["pass_block"] = function () {
    return "pass\n";
  };

  generator.forBlock["break_block"] = function () {
    return "break\n";
  };

  generator.forBlock["continue_block"] = function () {
    return "continue\n";
  };

  // Text
  generator.forBlock["text_literal"] = function (block: BlockType, gen: GeneratorType) {
    const text = block.getFieldValue("TEXT");
    return ['"' + text + '"', gen.ORDER_ATOMIC];
  };

  generator.forBlock["text_concat"] = function (block: BlockType, gen: GeneratorType) {
    const a = gen.valueToCode(block, "A", gen.ORDER_NONE) || '""';
    const b = gen.valueToCode(block, "B", gen.ORDER_NONE) || '""';
    return [a + " + " + b, gen.ORDER_ATOMIC];
  };

  generator.forBlock["text_str"] = function (block: BlockType, gen: GeneratorType) {
    const value = gen.valueToCode(block, "VALUE", gen.ORDER_NONE) || '""';
    return ["str(" + value + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["text_int"] = function (block: BlockType, gen: GeneratorType) {
    const value = gen.valueToCode(block, "VALUE", gen.ORDER_NONE) || "0";
    return ["int(" + value + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["text_float"] = function (block: BlockType, gen: GeneratorType) {
    const value = gen.valueToCode(block, "VALUE", gen.ORDER_NONE) || "0";
    return ["float(" + value + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["text_len"] = function (block: BlockType, gen: GeneratorType) {
    const value = gen.valueToCode(block, "VALUE", gen.ORDER_NONE) || '""';
    return ["len(" + value + ")", gen.ORDER_FUNCTION_CALL];
  };

  // Math
  generator.forBlock["math_number"] = function (block: BlockType, gen: GeneratorType) {
    const num = block.getFieldValue("NUM");
    return [num, gen.ORDER_ATOMIC];
  };

  generator.forBlock["math_arithmetic"] = function (block: BlockType, gen: GeneratorType) {
    const ops: Record<string, string> = { ADD: "+", SUB: "-", MUL: "*", DIV: "/" };
    const op = ops[block.getFieldValue("OP")] || "+";
    const a = gen.valueToCode(block, "A", gen.ORDER_NONE) || "0";
    const b = gen.valueToCode(block, "B", gen.ORDER_NONE) || "0";
    return ["(" + a + " " + op + " " + b + ")", gen.ORDER_ATOMIC];
  };

  generator.forBlock["math_modulo"] = function (block: BlockType, gen: GeneratorType) {
    const a = gen.valueToCode(block, "A", gen.ORDER_NONE) || "0";
    const b = gen.valueToCode(block, "B", gen.ORDER_NONE) || "1";
    return ["(" + a + " % " + b + ")", gen.ORDER_ATOMIC];
  };

  generator.forBlock["math_abs"] = function (block: BlockType, gen: GeneratorType) {
    const num = gen.valueToCode(block, "NUM", gen.ORDER_NONE) || "0";
    return ["abs(" + num + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["math_pow"] = function (block: BlockType, gen: GeneratorType) {
    const base = gen.valueToCode(block, "BASE", gen.ORDER_NONE) || "0";
    const exp = gen.valueToCode(block, "EXP", gen.ORDER_NONE) || "1";
    return ["(" + base + " ** " + exp + ")", gen.ORDER_ATOMIC];
  };

  generator.forBlock["math_round"] = function (block: BlockType, gen: GeneratorType) {
    const num = gen.valueToCode(block, "NUM", gen.ORDER_NONE) || "0";
    return ["round(" + num + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["math_sqrt"] = function (block: BlockType, gen: GeneratorType) {
    const num = gen.valueToCode(block, "NUM", gen.ORDER_NONE) || "0";
    return ["math.sqrt(" + num + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["math_pi"] = function (_block: BlockType, gen: GeneratorType) {
    return ["math.pi", gen.ORDER_ATOMIC];
  };

  generator.forBlock["math_sin"] = function (block: BlockType, gen: GeneratorType) {
    const num = gen.valueToCode(block, "NUM", gen.ORDER_NONE) || "0";
    return ["math.sin(" + num + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["math_cos"] = function (block: BlockType, gen: GeneratorType) {
    const num = gen.valueToCode(block, "NUM", gen.ORDER_NONE) || "0";
    return ["math.cos(" + num + ")", gen.ORDER_FUNCTION_CALL];
  };

  // Logic
  generator.forBlock["logic_if"] = function (block: BlockType, gen: GeneratorType) {
    const cond = gen.valueToCode(block, "COND", gen.ORDER_NONE) || "True";
    const body = gen.statementToCode(block, "DO") || gen.INDENT + "pass\n";
    return "if " + cond + ":\n" + body;
  };

  generator.forBlock["logic_if_else"] = function (block: BlockType, gen: GeneratorType) {
    const cond = gen.valueToCode(block, "COND", gen.ORDER_NONE) || "True";
    const doBody = gen.statementToCode(block, "DO") || gen.INDENT + "pass\n";
    const elseBody = gen.statementToCode(block, "ELSE") || gen.INDENT + "pass\n";
    return "if " + cond + ":\n" + doBody + "else:\n" + elseBody;
  };

  generator.forBlock["logic_compare"] = function (block: BlockType, gen: GeneratorType) {
    const ops: Record<string, string> = { EQ: "==", NEQ: "!=", LT: "<", GT: ">", LTE: "<=", GTE: ">=" };
    const op = ops[block.getFieldValue("OP")] || "==";
    const a = gen.valueToCode(block, "A", gen.ORDER_NONE) || "0";
    const b = gen.valueToCode(block, "B", gen.ORDER_NONE) || "0";
    return ["(" + a + " " + op + " " + b + ")", gen.ORDER_ATOMIC];
  };

  generator.forBlock["logic_boolean"] = function (block: BlockType, gen: GeneratorType) {
    const bool = block.getFieldValue("BOOL") === "TRUE" ? "True" : "False";
    return [bool, gen.ORDER_ATOMIC];
  };

  generator.forBlock["logic_and"] = function (block: BlockType, gen: GeneratorType) {
    const a = gen.valueToCode(block, "A", gen.ORDER_NONE) || "True";
    const b = gen.valueToCode(block, "B", gen.ORDER_NONE) || "True";
    return ["(" + a + " and " + b + ")", gen.ORDER_ATOMIC];
  };

  generator.forBlock["logic_or"] = function (block: BlockType, gen: GeneratorType) {
    const a = gen.valueToCode(block, "A", gen.ORDER_NONE) || "False";
    const b = gen.valueToCode(block, "B", gen.ORDER_NONE) || "False";
    return ["(" + a + " or " + b + ")", gen.ORDER_ATOMIC];
  };

  generator.forBlock["logic_not"] = function (block: BlockType, gen: GeneratorType) {
    const bool = gen.valueToCode(block, "BOOL", gen.ORDER_NONE) || "True";
    return ["(not " + bool + ")", gen.ORDER_ATOMIC];
  };

  // Lists
  generator.forBlock["lists_create_empty"] = function (_block: BlockType, gen: GeneratorType) {
    return ["[]", gen.ORDER_ATOMIC];
  };

  generator.forBlock["lists_create_with"] = function (block: BlockType, gen: GeneratorType) {
    const items = block.getFieldValue("ITEMS");
    return ["[" + items + "]", gen.ORDER_ATOMIC];
  };

  generator.forBlock["lists_append"] = function (block: BlockType, gen: GeneratorType) {
    const list = gen.valueToCode(block, "LIST", gen.ORDER_NONE) || "my_list";
    const item = gen.valueToCode(block, "ITEM", gen.ORDER_NONE) || "None";
    return list + ".append(" + item + ")\n";
  };

  generator.forBlock["lists_length"] = function (block: BlockType, gen: GeneratorType) {
    const list = gen.valueToCode(block, "LIST", gen.ORDER_NONE) || "[]";
    return ["len(" + list + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["lists_index"] = function (block: BlockType, gen: GeneratorType) {
    const list = gen.valueToCode(block, "LIST", gen.ORDER_NONE) || "[]";
    const index = gen.valueToCode(block, "INDEX", gen.ORDER_NONE) || "0";
    return [list + "[" + index + "]", gen.ORDER_ATOMIC];
  };

  // Loops
  generator.forBlock["loop_for_range"] = function (block: BlockType, gen: GeneratorType) {
    const varName = block.getFieldValue("VAR");
    const start = gen.valueToCode(block, "START", gen.ORDER_NONE) || "0";
    const end = gen.valueToCode(block, "END", gen.ORDER_NONE) || "10";
    const body = gen.statementToCode(block, "DO") || gen.INDENT + "pass\n";
    return "for " + varName + " in range(" + start + ", " + end + "):\n" + body;
  };

  generator.forBlock["loop_for_in"] = function (block: BlockType, gen: GeneratorType) {
    const varName = block.getFieldValue("VAR");
    const list = gen.valueToCode(block, "LIST", gen.ORDER_NONE) || "[]";
    const body = gen.statementToCode(block, "DO") || gen.INDENT + "pass\n";
    return "for " + varName + " in " + list + ":\n" + body;
  };

  generator.forBlock["loop_while"] = function (block: BlockType, gen: GeneratorType) {
    const cond = gen.valueToCode(block, "COND", gen.ORDER_NONE) || "True";
    const body = gen.statementToCode(block, "DO") || gen.INDENT + "pass\n";
    return "while " + cond + ":\n" + body;
  };

  // Functions
  generator.forBlock["def_function"] = function (block: BlockType, gen: GeneratorType) {
    const name = block.getFieldValue("NAME");
    const body = gen.statementToCode(block, "BODY") || gen.INDENT + "pass\n";
    return "def " + name + "():\n" + body;
  };

  generator.forBlock["def_function_params"] = function (block: BlockType, gen: GeneratorType) {
    const name = block.getFieldValue("NAME");
    const params = block.getFieldValue("PARAMS");
    const body = gen.statementToCode(block, "BODY") || gen.INDENT + "pass\n";
    return "def " + name + "(" + params + "):\n" + body;
  };

  generator.forBlock["return_block"] = function (block: BlockType, gen: GeneratorType) {
    const value = gen.valueToCode(block, "VALUE", gen.ORDER_NONE);
    if (value) {
      return "return " + value + "\n";
    }
    return "return\n";
  };

  generator.forBlock["call_function"] = function (block: BlockType, gen: GeneratorType) {
    const name = block.getFieldValue("NAME");
    const args = block.getFieldValue("ARGS");
    return [name + "(" + args + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["call_function_statement"] = function (block: BlockType) {
    const name = block.getFieldValue("NAME");
    const args = block.getFieldValue("ARGS");
    return name + "(" + args + ")\n";
  };

  // Random
  generator.forBlock["random_randint"] = function (block: BlockType, gen: GeneratorType) {
    const low = gen.valueToCode(block, "LOW", gen.ORDER_NONE) || "1";
    const high = gen.valueToCode(block, "HIGH", gen.ORDER_NONE) || "10";
    return ["random.randint(" + low + ", " + high + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["random_choice"] = function (block: BlockType, gen: GeneratorType) {
    const list = gen.valueToCode(block, "LIST", gen.ORDER_NONE) || "[]";
    return ["random.choice(" + list + ")", gen.ORDER_FUNCTION_CALL];
  };

  generator.forBlock["random_random"] = function (_block: BlockType, gen: GeneratorType) {
    return ["random.random()", gen.ORDER_FUNCTION_CALL];
  };
}
