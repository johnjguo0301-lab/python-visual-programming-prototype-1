// Blockly toolbox category definitions
const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category', name: 'Events', colour: '#f59e0b',
            contents: [
                { kind: 'block', type: 'event_start' },
                { kind: 'block', type: 'event_key_pressed' },
                {
                    kind: 'block',
                    type: 'event_wait',
                    inputs: {
                        SECONDS: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
                    }
                },
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
                {
                    kind: 'block',
                    type: 'loop_for_range',
                    inputs: {
                        START: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        END: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
                    }
                },
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
                { kind: 'block', type: 'call_function_statement' },
                { kind: 'block', type: 'param_get' },
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
                {
                    kind: 'block',
                    type: 'random_randint',
                    inputs: {
                        LOW: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                        HIGH: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
                    }
                },
                { kind: 'block', type: 'random_choice' },
                { kind: 'block', type: 'random_random' },
            ]
        },
        { kind: 'sep' },
        {
            kind: 'category', name: 'Turtle', colour: '#10b981',
            contents: [
                {
                    kind: 'block',
                    type: 'turtle_forward',
                    inputs: {
                        DISTANCE: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'turtle_backward',
                    inputs: {
                        DISTANCE: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'turtle_right',
                    inputs: {
                        ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'turtle_left',
                    inputs: {
                        ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'turtle_goto',
                    inputs: {
                        X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
                    }
                },
                { kind: 'block', type: 'turtle_home' },
                { kind: 'block', type: 'turtle_penup' },
                { kind: 'block', type: 'turtle_pendown' },
                {
                    kind: 'block',
                    type: 'turtle_pensize',
                    inputs: {
                        SIZE: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'turtle_pencolor',
                    inputs: {
                        COLOR: { shadow: { type: 'text_literal', fields: { TEXT: 'black' } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'turtle_circle',
                    inputs: {
                        RADIUS: { shadow: { type: 'math_number', fields: { NUM: 50 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'turtle_dot',
                    inputs: {
                        SIZE: { shadow: { type: 'math_number', fields: { NUM: 5 } } }
                    }
                },
                { kind: 'block', type: 'turtle_clear' },
            ]
        },
        {
            kind: 'category', name: 'Graphs', colour: '#f97316',
            contents: [
                { kind: 'label', text: 'Data' },
                { kind: 'block', type: 'graph_create_list' },
                {
                    kind: 'block',
                    type: 'graph_range',
                    inputs: {
                        START: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        STOP: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
                        STEP: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
                    }
                },
                { kind: 'sep' },
                { kind: 'label', text: 'Plots' },
                {
                    kind: 'block',
                    type: 'graph_plot',
                    inputs: {
                        X: { shadow: { type: 'graph_create_list' } },
                        Y: { shadow: { type: 'graph_create_list' } }
                    }
                },
                {
                    kind: 'block',
                    type: 'graph_bar',
                    inputs: {
                        HEIGHT: { shadow: { type: 'graph_create_list' } }
                    }
                },
                {
                    kind: 'block',
                    type: 'graph_scatter',
                    inputs: {
                        X: { shadow: { type: 'graph_create_list' } },
                        Y: { shadow: { type: 'graph_create_list' } }
                    }
                },
                {
                    kind: 'block',
                    type: 'graph_pie',
                    inputs: {
                        VALUES: { shadow: { type: 'graph_create_list' } }
                    }
                },
                {
                    kind: 'block',
                    type: 'graph_hist',
                    inputs: {
                        DATA: { shadow: { type: 'graph_create_list' } },
                        BINS: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
                    }
                },
                { kind: 'sep' },
                { kind: 'label', text: 'Customization' },
                {
                    kind: 'block',
                    type: 'graph_title',
                    inputs: {
                        TEXT: { shadow: { type: 'text_literal', fields: { TEXT: 'My Plot' } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'graph_xlabel',
                    inputs: {
                        TEXT: { shadow: { type: 'text_literal', fields: { TEXT: 'X Axis' } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'graph_ylabel',
                    inputs: {
                        TEXT: { shadow: { type: 'text_literal', fields: { TEXT: 'Y Axis' } } }
                    }
                },
                { kind: 'block', type: 'graph_grid' },
                { kind: 'block', type: 'graph_legend' },
                { kind: 'block', type: 'graph_color' },
                { kind: 'block', type: 'graph_show' },
            ]
        },
        {
            kind: 'category', name: 'Processing', colour: '#8b5cf6',
            contents: [
                { kind: 'label', text: 'Structure' },
                { kind: 'block', type: 'processing_setup' },
                { kind: 'block', type: 'processing_draw' },
                {
                    kind: 'block',
                    type: 'processing_size',
                    inputs: {
                        WIDTH: { shadow: { type: 'math_number', fields: { NUM: 400 } } },
                        HEIGHT: { shadow: { type: 'math_number', fields: { NUM: 400 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'processing_background',
                    inputs: {
                        R: { shadow: { type: 'math_number', fields: { NUM: 255 } } },
                        G: { shadow: { type: 'math_number', fields: { NUM: 255 } } },
                        B: { shadow: { type: 'math_number', fields: { NUM: 255 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'processing_background_gray',
                    inputs: {
                        GRAY: { shadow: { type: 'math_number', fields: { NUM: 200 } } }
                    }
                },
                { kind: 'sep' },
                { kind: 'label', text: 'Shapes' },
                {
                    kind: 'block',
                    type: 'processing_ellipse',
                    inputs: {
                        X: { shadow: { type: 'math_number', fields: { NUM: 200 } } },
                        Y: { shadow: { type: 'math_number', fields: { NUM: 200 } } },
                        W: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
                        H: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'processing_circle',
                    inputs: {
                        X: { shadow: { type: 'math_number', fields: { NUM: 200 } } },
                        Y: { shadow: { type: 'math_number', fields: { NUM: 200 } } },
                        D: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'processing_rect',
                    inputs: {
                        X: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
                        Y: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
                        W: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
                        H: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'processing_line',
                    inputs: {
                        X1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        Y1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        X2: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
                        Y2: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
                    }
                },
                { kind: 'block', type: 'processing_triangle' },
                { kind: 'sep' },
                { kind: 'label', text: 'Style' },
                {
                    kind: 'block',
                    type: 'processing_fill',
                    inputs: {
                        R: { shadow: { type: 'math_number', fields: { NUM: 255 } } },
                        G: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        B: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
                    }
                },
                {
                    kind: 'block',
                    type: 'processing_fill_gray',
                    inputs: {
                        GRAY: { shadow: { type: 'math_number', fields: { NUM: 128 } } }
                    }
                },
                { kind: 'block', type: 'processing_noFill' },
                {
                    kind: 'block',
                    type: 'processing_stroke',
                    inputs: {
                        R: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        G: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        B: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
                    }
                },
                { kind: 'block', type: 'processing_noStroke' },
                {
                    kind: 'block',
                    type: 'processing_strokeWeight',
                    inputs: {
                        WEIGHT: { shadow: { type: 'math_number', fields: { NUM: 2 } } }
                    }
                },
            ]
        },
    ]
};
