# Turtle Graphics - Shadow Blocks Implementation

## What Changed

Reverted turtle blocks to use **circular input sockets** with **shadow blocks** (default values).

## How It Works Now

Each turtle block has:
- ✅ **Circular input socket** - Can accept number blocks, variables, or expressions
- ✅ **Shadow block (default value)** - Pre-filled editable number that appears by default
- ✅ **Click to edit** - Click the shadow number to type a new value
- ✅ **Drag to replace** - Drag a number block or variable to replace the shadow

## Benefits

✅ **Compatible with variables** - Can connect variable blocks
✅ **Compatible with expressions** - Can connect math operations (e.g., `x + 10`)
✅ **Quick editing** - Click shadow number to type directly
✅ **Visual consistency** - Matches other blocks in the system
✅ **Best of both worlds** - Simple for beginners, powerful for advanced users

## Block Defaults

| Block | Parameter | Default Value |
|-------|-----------|---------------|
| turtle forward | distance | 100 |
| turtle backward | distance | 100 |
| turtle turn right | angle | 90 |
| turtle turn left | angle | 90 |
| turtle go to | x, y | 0, 0 |
| turtle pen size | size | 1 |
| turtle pen color | color | "black" |
| turtle draw circle | radius | 50 |
| turtle draw dot | size | 5 |

## Usage Examples

### 1. Simple - Click to Edit
```
turtle forward [100]  ← Click 100, type 200
```

### 2. With Variable
```
Create variable "speed" = 150
turtle forward [speed]  ← Drag "speed" variable to replace 100
```

### 3. With Expression
```
turtle forward [x + 50]  ← Drag math block to replace 100
```

### 4. With Loop Variable
```
for i in range(4):
    turtle forward [i * 50]  ← Use loop variable
    turtle turn right [90]
```

## Testing

**Please refresh your browser (Ctrl+Shift+R) and test:**

1. **Test Shadow Blocks:**
   - Drag "turtle forward" block
   - You should see a circular socket with "100" inside
   - Click the "100" - it should become editable
   - Type "200" and press Enter

2. **Test Variable Connection:**
   - Create a variable "distance" = 150
   - Drag "turtle forward" block
   - Drag the "distance" variable block into the circular socket
   - The shadow "100" should be replaced by the variable
   - Run it - should use the variable value

3. **Test Expression:**
   - Drag "turtle forward" block
   - Drag a math operation (e.g., "10 + 20") into the socket
   - Run it - should calculate and use the result

## Technical Details

**Toolbox Configuration:**
```javascript
{
    kind: 'block',
    type: 'turtle_forward',
    inputs: {
        DISTANCE: {
            shadow: {
                type: 'math_number',
                fields: { NUM: 100 }
            }
        }
    }
}
```

**Shadow blocks:**
- Appear as default values in circular sockets
- Can be edited by clicking
- Disappear when replaced by a real block
- Reappear when the real block is removed
- Are semi-transparent to indicate they're defaults
