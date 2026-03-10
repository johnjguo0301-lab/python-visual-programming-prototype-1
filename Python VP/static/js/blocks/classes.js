// Class blocks - Python OOP: class, constructor, method, subclass, instantiate
Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "class_define",
        "message0": "class %1 : %2",
        "args0": [
            { "type": "field_input", "name": "NAME", "text": "MyClass" },
            { "type": "input_statement", "name": "BODY" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Define a class"
    },
    {
        "type": "class_subclass",
        "message0": "class %1 ( %2 ): %3",
        "args0": [
            { "type": "field_input", "name": "NAME", "text": "ChildClass" },
            { "type": "field_input", "name": "PARENT", "text": "ParentClass" },
            { "type": "input_statement", "name": "BODY" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Define a subclass that inherits from a parent class"
    },
    {
        "type": "class_constructor",
        "message0": "def __init__(self, %1 ): %2",
        "args0": [
            { "type": "field_input", "name": "PARAMS", "text": "" },
            { "type": "input_statement", "name": "BODY" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Define the constructor (__init__) for a class"
    },
    {
        "type": "class_method",
        "message0": "def %1 (self, %2 ): %3",
        "args0": [
            { "type": "field_input", "name": "NAME", "text": "my_method" },
            { "type": "field_input", "name": "PARAMS", "text": "" },
            { "type": "input_statement", "name": "BODY" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Define a method inside a class"
    },
    {
        "type": "class_self_set",
        "message0": "self. %1 = %2",
        "args0": [
            { "type": "field_input", "name": "ATTR", "text": "name" },
            { "type": "input_value", "name": "VALUE" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Set an attribute on self",
        "inputsInline": true
    },
    {
        "type": "class_self_get",
        "message0": "self. %1",
        "args0": [
            { "type": "field_input", "name": "ATTR", "text": "name" }
        ],
        "output": null,
        "colour": 200,
        "tooltip": "Get an attribute from self",
        "inputsInline": true
    },
    {
        "type": "class_instantiate",
        "message0": "%1 ( %2 )",
        "args0": [
            { "type": "field_input", "name": "CLASS", "text": "MyClass" },
            { "type": "field_input", "name": "ARGS", "text": "" }
        ],
        "output": null,
        "colour": 200,
        "tooltip": "Create a new instance of a class",
        "inputsInline": true
    },
    {
        "type": "class_call_method",
        "message0": "%1 . %2 ( %3 )",
        "args0": [
            { "type": "field_input", "name": "OBJ", "text": "obj" },
            { "type": "field_input", "name": "METHOD", "text": "my_method" },
            { "type": "field_input", "name": "ARGS", "text": "" }
        ],
        "output": null,
        "colour": 200,
        "tooltip": "Call a method on an object",
        "inputsInline": true
    },
    {
        "type": "class_super",
        "message0": "super().__init__( %1 )",
        "args0": [
            { "type": "field_input", "name": "ARGS", "text": "" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 200,
        "tooltip": "Call the parent class constructor",
        "inputsInline": true
    }
]);

// Python generators
python.pythonGenerator.forBlock['class_define'] = function(block, generator) {
    var name = block.getFieldValue('NAME');
    var body = generator.statementToCode(block, 'BODY') || generator.INDENT + 'pass\n';
    return 'class ' + name + ':\n' + body + '\n';
};

python.pythonGenerator.forBlock['class_subclass'] = function(block, generator) {
    var name = block.getFieldValue('NAME');
    var parent = block.getFieldValue('PARENT');
    var body = generator.statementToCode(block, 'BODY') || generator.INDENT + 'pass\n';
    return 'class ' + name + '(' + parent + '):\n' + body + '\n';
};

python.pythonGenerator.forBlock['class_constructor'] = function(block, generator) {
    var params = block.getFieldValue('PARAMS').trim();
    var body = generator.statementToCode(block, 'BODY') || generator.INDENT + 'pass\n';
    var sig = params ? 'self, ' + params : 'self';
    return 'def __init__(' + sig + '):\n' + body;
};

python.pythonGenerator.forBlock['class_method'] = function(block, generator) {
    var name = block.getFieldValue('NAME');
    var params = block.getFieldValue('PARAMS').trim();
    var body = generator.statementToCode(block, 'BODY') || generator.INDENT + 'pass\n';
    var sig = params ? 'self, ' + params : 'self';
    return 'def ' + name + '(' + sig + '):\n' + body;
};

python.pythonGenerator.forBlock['class_self_set'] = function(block, generator) {
    var attr = block.getFieldValue('ATTR');
    var value = generator.valueToCode(block, 'VALUE', generator.ORDER_NONE) || 'None';
    return 'self.' + attr + ' = ' + value + '\n';
};

python.pythonGenerator.forBlock['class_self_get'] = function(block, generator) {
    var attr = block.getFieldValue('ATTR');
    return ['self.' + attr, generator.ORDER_MEMBER];
};

python.pythonGenerator.forBlock['class_instantiate'] = function(block, generator) {
    var cls = block.getFieldValue('CLASS');
    var args = block.getFieldValue('ARGS').trim();
    return [cls + '(' + args + ')', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['class_call_method'] = function(block, generator) {
    var obj = block.getFieldValue('OBJ');
    var method = block.getFieldValue('METHOD');
    var args = block.getFieldValue('ARGS').trim();
    return [obj + '.' + method + '(' + args + ')', generator.ORDER_FUNCTION_CALL];
};

python.pythonGenerator.forBlock['class_super'] = function(block, generator) {
    var args = block.getFieldValue('ARGS').trim();
    return 'super().__init__(' + args + ')\n';
};
