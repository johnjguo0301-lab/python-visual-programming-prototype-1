# Understanding blockToCode Return Values

In Blockly, `generator.blockToCode(block)` can return:

1. **String** - for statement blocks (blocks with previousStatement/nextStatement)
   - Example: `print(x)\n`
   - These blocks execute as statements

2. **Array [code, order]** - for value blocks (blocks with output)
   - Example: `['5 + 3', Order.ADDITION]`
   - These blocks return values

The issue: Loop blocks are STATEMENT blocks, so they should return strings.
But if they're being treated as value blocks, they'd return arrays.

Let me check the block definitions...
