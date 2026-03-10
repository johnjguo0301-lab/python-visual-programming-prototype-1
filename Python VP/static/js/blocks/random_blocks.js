// Random blocks - Python random module
Blockly.common.defineBlocksWithJsonArray([
    {
        type: 'random_randint',
        message0: 'random.randint( %1 , %2 )',
        args0: [
            { type: 'input_value', name: 'LOW', check: 'Number' },
            { type: 'input_value', name: 'HIGH', check: 'Number' }
        ],
        output: null,
        colour: 30,
        tooltip: 'Random integer between low and high (inclusive)',
        inputsInline: true
    },
    {
        type: 'random_choice',
        message0: 'random.choice( %1 )',
        args0: [
            { type: 'input_value', name: 'LIST' }
        ],
        output: null,
        colour: 30,
        tooltip: 'Random element from a list',
        inputsInline: true
    },
    {
        type: 'random_random',
        message0: 'random.random()',
        output: null,
        colour: 30,
        tooltip: 'Random float between 0 and 1',
        inputsInline: true
    }
]);

python.pythonGenerator.forBlock['random_randint'] = function(block, generator) {
    var low = generator.valueToCode(block, 'LOW', generator.ORDER_NONE) || '0';
    var high = generator.valueToCode(block, 'HIGH', generator.ORDER_NONE) || '10';
    return ['random.randint(' + low + ', ' + high + ')', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['random_choice'] = function(block, generator) {
    var list = generator.valueToCode(block, 'LIST', generator.ORDER_NONE) || '[]';
    return ['random.choice(' + list + ')', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['random_random'] = function(block, generator) {
    return ['random.random()', generator.ORDER_FUNCTION_CALL];
};
