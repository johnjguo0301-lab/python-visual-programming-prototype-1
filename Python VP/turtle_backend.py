"""
Turtle command recorder for capturing turtle graphics operations as JSON.
This module provides a mock turtle interface that records all drawing commands
instead of rendering them, allowing replay on a client-side canvas.
"""

import math
import json


class TurtleRecorder:
    """Records turtle graphics commands as JSON-serializable data."""

    def __init__(self):
        self.commands = []
        self.x = 0
        self.y = 0
        self.heading_angle = 90  # Start facing up (90 degrees)
        self.pen_is_down = True
        self.pen_color_value = 'black'
        self.pen_width = 1

    def forward(self, distance):
        """Move forward by distance."""
        self.commands.append({'type': 'forward', 'distance': float(distance)})

    def backward(self, distance):
        """Move backward by distance."""
        self.commands.append({'type': 'backward', 'distance': float(distance)})

    def right(self, angle):
        """Turn right by angle degrees."""
        self.commands.append({'type': 'right', 'angle': float(angle)})

    def left(self, angle):
        """Turn left by angle degrees."""
        self.commands.append({'type': 'left', 'angle': float(angle)})

    def penup(self):
        """Lift the pen (stop drawing)."""
        self.pen_is_down = False
        self.commands.append({'type': 'penup'})

    def pendown(self):
        """Put the pen down (start drawing)."""
        self.pen_is_down = True
        self.commands.append({'type': 'pendown'})

    def pencolor(self, *args):
        """Set pen color."""
        if len(args) == 1:
            color = str(args[0])
        else:
            color = str(args)
        self.pen_color_value = color
        self.commands.append({'type': 'pencolor', 'color': color})

    def pensize(self, width):
        """Set pen width."""
        self.pen_width = float(width)
        self.commands.append({'type': 'pensize', 'width': float(width)})

    def circle(self, radius, extent=None):
        """Draw a circle."""
        cmd = {'type': 'circle', 'radius': float(radius)}
        if extent is not None:
            cmd['extent'] = float(extent)
        self.commands.append(cmd)

    def goto(self, x, y=None):
        """Move to position."""
        if y is None and hasattr(x, '__iter__'):
            x, y = x
        self.commands.append({'type': 'goto', 'x': float(x), 'y': float(y)})

    def setpos(self, x, y=None):
        """Alias for goto."""
        self.goto(x, y)

    def setposition(self, x, y=None):
        """Alias for goto."""
        self.goto(x, y)

    def home(self):
        """Return to origin (0, 0) facing up."""
        self.commands.append({'type': 'home'})

    def dot(self, size=None):
        """Draw a dot."""
        cmd = {'type': 'dot'}
        if size is not None:
            cmd['size'] = float(size)
        self.commands.append(cmd)

    def clear(self):
        """Clear the drawing."""
        self.commands.append({'type': 'clear'})

    def setheading(self, angle):
        """Set heading to angle."""
        self.commands.append({'type': 'setheading', 'angle': float(angle)})

    def get_commands(self):
        """Return all recorded commands as JSON-serializable list."""
        return self.commands
