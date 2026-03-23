# Quick Test Guide

## How to Test the Turtle Graphics Implementation

### Test 1: Simple Square
1. Open http://localhost:8080 in your browser
2. From the **Turtle** category (green), drag these blocks:
   - "when program starts" (from Events)
   - "turtle forward 100"
   - "turtle turn right 90°"
   - Repeat the forward/right blocks 3 more times
3. Click **Run**
4. **Expected**: Canvas tab opens automatically, shows animated square drawing

### Test 2: Colored Circle
1. Clear the workspace (or start new)
2. Drag these blocks:
   - "when program starts"
   - "turtle pen color" with "red" (from Text category)
   - "turtle draw circle radius 50"
3. Click **Run**
4. **Expected**: Red circle appears on canvas

### Test 3: Complex Drawing
1. Try this sequence:
   - "when program starts"
   - "turtle forward 100"
   - "turtle turn right 90°"
   - "turtle pen color" → "blue"
   - "turtle draw circle radius 30"
   - "turtle pen up"
   - "turtle go to x: -50 y: 50"
   - "turtle pen down"
   - "turtle draw dot size 20"
3. Click **Run**
4. **Expected**: Line, blue circle, then dot at different position

### Test 4: Tab Switching
1. Run any turtle program
2. **Expected**: Automatically switches to Canvas tab
3. Click **Code** tab
4. **Expected**: Shows generated Python code
5. Click **Canvas** tab
6. **Expected**: Shows the drawing

### Test 5: Clear Canvas
1. Run a turtle program
2. Click **Clear Canvas** button
3. **Expected**: Canvas clears, turtle resets to center

### Test 6: Mixed Output
1. Create blocks:
   - "when program starts"
   - "print" → "Drawing a square..."
   - "turtle forward 100"
   - "turtle turn right 90°"
   - "print" → "Done!"
2. Click **Run**
3. **Expected**:
   - Console shows "Drawing a square..." and "Done!"
   - Canvas shows the line

## Available Turtle Blocks

**Movement:**
- turtle forward [distance]
- turtle backward [distance]
- turtle turn right [angle]°
- turtle turn left [angle]°
- turtle go to x: [x] y: [y]
- turtle go home

**Pen Control:**
- turtle pen up
- turtle pen down
- turtle pen size [width]
- turtle pen color [color]

**Drawing:**
- turtle draw circle radius [radius]
- turtle draw dot size [size]
- turtle clear drawing

## Troubleshooting

**Canvas doesn't show:**
- Check browser console for JavaScript errors
- Verify tabs.js and canvas.js are loaded
- Try clicking the Canvas tab manually

**No animation:**
- This is normal - animation happens quickly
- Try larger numbers (forward 200, circle 100)

**Turtle not visible:**
- The green triangle is small - look at center of canvas
- It updates after each command

**Code not generating:**
- Make sure blocks are connected to "when program starts"
- Check that turtle blocks are inside an event block
