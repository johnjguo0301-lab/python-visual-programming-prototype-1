// Block definitions for Python imports
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "import_module",
    "message0": "import %1",
    "args0": [
      {
        "type": "field_input",
        "name": "MODULE_NAME",
        "text": "os"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
    "tooltip": "Import a Python module",
    "helpUrl": ""
  },
  {
    "type": "from_import",
    "message0": "from %1 import %2",
    "args0": [
      {
        "type": "field_input",
        "name": "MODULE",
        "text": "os"
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "path"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
    "tooltip": "Import a specific name from a module",
    "helpUrl": ""
  },
  {
    "type": "import_as",
    "message0": "import %1 as %2",
    "args0": [
      {
        "type": "field_input",
        "name": "MODULE",
        "text": "numpy"
      },
      {
        "type": "field_input",
        "name": "ALIAS",
        "text": "np"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
    "tooltip": "Import a module with an alias",
    "helpUrl": ""
  }
]);

// Python generators for import blocks
python.pythonGenerator.forBlock['import_module'] = function(block, generator) {
  var moduleName = block.getFieldValue('MODULE_NAME');
  return 'import ' + moduleName + '\n';
};

python.pythonGenerator.forBlock['from_import'] = function(block, generator) {
  var moduleName = block.getFieldValue('MODULE');
  var name = block.getFieldValue('NAME');
  return 'from ' + moduleName + ' import ' + name + '\n';
};

python.pythonGenerator.forBlock['import_as'] = function(block, generator) {
  var moduleName = block.getFieldValue('MODULE');
  var alias = block.getFieldValue('ALIAS');
  return 'import ' + moduleName + ' as ' + alias + '\n';
};
