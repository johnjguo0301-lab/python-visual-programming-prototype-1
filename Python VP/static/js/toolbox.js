// Blockly toolbox category definitions
const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category', name: 'Events', colour: '#f59e0b',
            contents: [
                { kind: 'block', type: 'event_start' },
                { kind: 'block', type: 'event_key_pressed' },
                { kind: 'block', type: 'event_wait' },
                { kind: 'block', type: 'event_repeat_forever' },
                { kind: 'block', type: 'event_stop' },
            ]
        },
        {
            kind: 'category', name: 'Imports', colour: '#9b59b6',
            contents: [
                { kind: 'block', type: 'import_module' },
                { kind: 'block', type: 'from_import' },
                { kind: 'block', type: 'import_as' },
            ]
        },
        {
            kind: 'category', name: 'Variables', colour: '#e91e8c',
            contents: [
                { kind: 'block', type: 'variables_create' },
                { kind: 'block', type: 'variables_set' },
                { kind: 'block', type: 'variables_get' },
            ]
        },
        {
            kind: 'category', name: 'Statements', colour: '#0d9488',
            contents: [
                { kind: 'block', type: 'print_block' },
                { kind: 'block', type: 'print_multi' },
                { kind: 'block', type: 'input_block' },
                { kind: 'block', type: 'sleep_block' },
                { kind: 'block', type: 'pass_block' },
                { kind: 'block', type: 'break_block' },
                { kind: 'block', type: 'continue_block' },
            ]
        },
        {
            kind: 'category', name: 'Text', colour: '#14b8a6',
            contents: [
                { kind: 'block', type: 'text_literal' },
                { kind: 'block', type: 'text_concat' },
                { kind: 'block', type: 'text_str' },
                { kind: 'block', type: 'text_int' },
                { kind: 'block', type: 'text_float' },
                { kind: 'block', type: 'text_len' },
                { kind: 'block', type: 'text_upper' },
                { kind: 'block', type: 'text_lower' },
                { kind: 'block', type: 'text_replace' },
            ]
        },
        {
            kind: 'category', name: 'Math', colour: '#3b82f6',
            contents: [
                { kind: 'block', type: 'math_number' },
                { kind: 'block', type: 'math_arithmetic' },
                { kind: 'block', type: 'math_modulo' },
                { kind: 'block', type: 'math_floor_div' },
                { kind: 'block', type: 'math_abs' },
                { kind: 'block', type: 'math_pow' },
                { kind: 'block', type: 'math_round' },
                { kind: 'block', type: 'math_sum' },
                { kind: 'block', type: 'math_min' },
                { kind: 'block', type: 'math_max' },
                { kind: 'block', type: 'math_sqrt' },
                { kind: 'block', type: 'math_ceil' },
                { kind: 'block', type: 'math_floor' },
                { kind: 'block', type: 'math_pi' },
                { kind: 'block', type: 'math_e' },
                { kind: 'block', type: 'math_sin' },
                { kind: 'block', type: 'math_cos' },
                { kind: 'block', type: 'math_tan' },
                { kind: 'block', type: 'math_degrees' },
                { kind: 'block', type: 'math_radians' },
                { kind: 'block', type: 'math_log' },
                { kind: 'block', type: 'math_factorial' },
            ]
        },
        {
            kind: 'category', name: 'Logic', colour: '#4682b4',
            contents: [
                { kind: 'block', type: 'logic_if' },
                { kind: 'block', type: 'logic_if_else' },
                { kind: 'block', type: 'logic_if_elif_else' },
                { kind: 'block', type: 'logic_compare' },
                { kind: 'block', type: 'logic_boolean' },
                { kind: 'block', type: 'logic_and' },
                { kind: 'block', type: 'logic_or' },
                { kind: 'block', type: 'logic_not' },
            ]
        },
        {
            kind: 'category', name: 'Lists', colour: '#4b0082',
            contents: [
                { kind: 'block', type: 'lists_create_empty' },
                { kind: 'block', type: 'lists_create_with' },
                { kind: 'block', type: 'lists_append' },
                { kind: 'block', type: 'lists_remove' },
                { kind: 'block', type: 'lists_pop' },
                { kind: 'block', type: 'lists_insert' },
                { kind: 'block', type: 'lists_index' },
                { kind: 'block', type: 'lists_length' },
            ]
        },
        {
            kind: 'category', name: 'Loops', colour: '#22c55e',
            contents: [
                { kind: 'block', type: 'loop_for_range' },
                { kind: 'block', type: 'loop_for_in' },
                { kind: 'block', type: 'loop_while' },
                { kind: 'block', type: 'loop_while_true' },
            ]
        },
        {
            kind: 'category', name: 'Functions', colour: '#9b59b6',
            contents: [
                { kind: 'block', type: 'def_function' },
                { kind: 'block', type: 'def_function_params' },
                { kind: 'block', type: 'return_block' },
                { kind: 'block', type: 'call_function' },
            ]
        },
        {
            kind: 'category', name: 'Classes', colour: '#0ea5e9',
            contents: [
                { kind: 'block', type: 'class_define' },
                { kind: 'block', type: 'class_subclass' },
                { kind: 'block', type: 'class_constructor' },
                { kind: 'block', type: 'class_method' },
                { kind: 'block', type: 'class_self_set' },
                { kind: 'block', type: 'class_self_get' },
                { kind: 'block', type: 'class_instantiate' },
                { kind: 'block', type: 'class_call_method' },
                { kind: 'block', type: 'class_super' },
            ]
        },
        {
            kind: 'category', name: 'Random', colour: '#f97316',
            contents: [
                { kind: 'block', type: 'random_randint' },
                { kind: 'block', type: 'random_choice' },
                { kind: 'block', type: 'random_random' },
            ]
        },
        { kind: 'sep' },
        {
            kind: 'category', name: 'Turtle', colour: '#6c757d',
            contents: [
                { kind: 'label', text: 'Coming soon!' },
            ]
        },
        {
            kind: 'category', name: 'Graphs', colour: '#6c757d',
            contents: [
                { kind: 'label', text: 'Coming soon!' },
            ]
        },
        {
            kind: 'category', name: 'Processing', colour: '#6c757d',
            contents: [
                { kind: 'label', text: 'Coming soon!' },
            ]
        },
    ]
};
