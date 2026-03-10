// Event blocks - program lifecycle and event-driven blocks
Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "event_start",
        "message0": "when program starts",
        "nextStatement": null,
        "colour": 45,
        "tooltip": "Code below runs when the program starts",
        "helpUrl": ""
    },
    {
        "type": "event_key_pressed",
        "message0": "when key %1 is pressed %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "KEY",
                "options": [
                    ["any", "any"], ["enter", "enter"], ["space", "space"],
                    ["up", "up"], ["down", "down"], ["left", "left"], ["right", "right"],
                    ["a", "a"], ["b", "b"], ["c", "c"], ["d", "d"], ["e", "e"],
                    ["f", "f"], ["g", "g"], ["h", "h"], ["i", "i"], ["j", "j"],
                    ["k", "k"], ["l", "l"], ["m", "m"], ["n", "n"], ["o", "o"],
                    ["p", "p"], ["q", "q"], ["r", "r"], ["s", "s"], ["t", "t"],
                    ["u", "u"], ["v", "v"], ["w", "w"], ["x", "x"], ["y", "y"], ["z", "z"]
                ]
            },
            { "type": "input_statement", "name": "DO" }
        ],
        "colour": 45,
        "tooltip": "Runs code when a specific key is pressed",
        "helpUrl": ""
    },
    {
        "type": "event_wait",
        "message0": "wait %1 seconds",
        "args0": [
            { "type": "input_value", "name": "SECONDS", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 45,
        "tooltip": "Pause execution for a number of seconds",
        "inputsInline": true
    },
    {
        "type": "event_repeat_forever",
        "message0": "repeat forever %1",
        "args0": [
            { "type": "input_statement", "name": "DO" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 45,
        "tooltip": "Repeat the enclosed blocks forever (infinite loop)"
    },
    {
        "type": "event_stop",
        "message0": "stop program",
        "previousStatement": null,
        "colour": 45,
        "tooltip": "Stop the program immediately"
    }
]);

// Python generators
python.pythonGenerator.forBlock['event_start'] = function(block, generator) {
    // This block itself produces no code — it's just an entry point.
    // The blocks chained below it are generated automatically by Blockly
    // since it has a nextStatement connector.
    return '';
};

python.pythonGenerator.forBlock['event_key_pressed'] = function(block, generator) {
    var key = block.getFieldValue('KEY');
    var body = generator.statementToCode(block, 'DO') || generator.INDENT + 'pass\n';
    var code = '';
    if (key === 'any') {
        code += '_key = input("Press any key and Enter: ")\n';
    } else if (key === 'enter') {
        code += 'input("Press Enter to continue...")\n';
    } else {
        code += '_key = ""\nwhile _key != "' + key + '":\n';
        code += generator.INDENT + '_key = input("Press \'' + key + '\' and Enter: ")\n';
    }
    code += body;
    return code;
};

python.pythonGenerator.forBlock['event_wait'] = function(block, generator) {
    var seconds = generator.valueToCode(block, 'SECONDS', generator.ORDER_NONE) || '1';
    return 'import time\ntime.sleep(' + seconds + ')\n';
};

python.pythonGenerator.forBlock['event_repeat_forever'] = function(block, generator) {
    var body = generator.statementToCode(block, 'DO') || generator.INDENT + 'pass\n';
    return 'while True:\n' + body;
};

python.pythonGenerator.forBlock['event_stop'] = function(block, generator) {
    return 'import sys\nsys.exit()\n';
};
