// Blockly toolbox category definitions - Scratch-style colors
export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Events",
      colour: "#ffbf00",
      contents: [
        { kind: "block", type: "event_start" },
        { kind: "block", type: "event_key_pressed" },
        {
          kind: "block",
          type: "event_wait",
          inputs: {
            SECONDS: { shadow: { type: "math_number", fields: { NUM: 1 } } },
          },
        },
        { kind: "block", type: "event_repeat_forever" },
        { kind: "block", type: "event_stop" },
      ],
    },
    {
      kind: "category",
      name: "Variables",
      colour: "#ff8c1a",
      contents: [
        { kind: "block", type: "variables_create" },
        { kind: "block", type: "variables_set" },
        { kind: "block", type: "variables_get" },
      ],
    },
    {
      kind: "category",
      name: "Statements",
      colour: "#5cb1d6",
      contents: [
        { kind: "block", type: "print_block" },
        { kind: "block", type: "input_block" },
        { kind: "block", type: "pass_block" },
        { kind: "block", type: "break_block" },
        { kind: "block", type: "continue_block" },
      ],
    },
    {
      kind: "category",
      name: "Text",
      colour: "#5cb1d6",
      contents: [
        { kind: "block", type: "text_literal" },
        { kind: "block", type: "text_concat" },
        { kind: "block", type: "text_str" },
        { kind: "block", type: "text_int" },
        { kind: "block", type: "text_float" },
        { kind: "block", type: "text_len" },
      ],
    },
    {
      kind: "category",
      name: "Math",
      colour: "#59c059",
      contents: [
        { kind: "block", type: "math_number" },
        { kind: "block", type: "math_arithmetic" },
        { kind: "block", type: "math_modulo" },
        { kind: "block", type: "math_abs" },
        { kind: "block", type: "math_pow" },
        { kind: "block", type: "math_round" },
        { kind: "block", type: "math_sqrt" },
        { kind: "block", type: "math_pi" },
        { kind: "block", type: "math_sin" },
        { kind: "block", type: "math_cos" },
      ],
    },
    {
      kind: "category",
      name: "Logic",
      colour: "#5cb1d6",
      contents: [
        { kind: "block", type: "logic_if" },
        { kind: "block", type: "logic_if_else" },
        { kind: "block", type: "logic_compare" },
        { kind: "block", type: "logic_boolean" },
        { kind: "block", type: "logic_and" },
        { kind: "block", type: "logic_or" },
        { kind: "block", type: "logic_not" },
      ],
    },
    {
      kind: "category",
      name: "Lists",
      colour: "#ff6680",
      contents: [
        { kind: "block", type: "lists_create_empty" },
        { kind: "block", type: "lists_create_with" },
        { kind: "block", type: "lists_append" },
        { kind: "block", type: "lists_length" },
        { kind: "block", type: "lists_index" },
      ],
    },
    {
      kind: "category",
      name: "Loops",
      colour: "#ffab19",
      contents: [
        {
          kind: "block",
          type: "loop_for_range",
          inputs: {
            START: { shadow: { type: "math_number", fields: { NUM: 0 } } },
            END: { shadow: { type: "math_number", fields: { NUM: 10 } } },
          },
        },
        { kind: "block", type: "loop_for_in" },
        { kind: "block", type: "loop_while" },
      ],
    },
    {
      kind: "category",
      name: "Functions",
      colour: "#ff6680",
      contents: [
        { kind: "block", type: "def_function" },
        { kind: "block", type: "def_function_params" },
        { kind: "block", type: "return_block" },
        { kind: "block", type: "call_function" },
        { kind: "block", type: "call_function_statement" },
      ],
    },
    {
      kind: "category",
      name: "Random",
      colour: "#59c059",
      contents: [
        {
          kind: "block",
          type: "random_randint",
          inputs: {
            LOW: { shadow: { type: "math_number", fields: { NUM: 1 } } },
            HIGH: { shadow: { type: "math_number", fields: { NUM: 10 } } },
          },
        },
        { kind: "block", type: "random_choice" },
        { kind: "block", type: "random_random" },
      ],
    },
  ],
};
