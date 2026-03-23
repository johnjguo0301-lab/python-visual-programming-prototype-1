"""
Processing command recorder for capturing creative coding operations as JSON.
This module provides a mock Processing interface that records all drawing commands
instead of rendering them, allowing replay on a client-side canvas.
"""


class ProcessingRecorder:
    """Records Processing drawing commands as JSON-serializable data."""

    def __init__(self):
        self.setup_commands = []
        self.draw_commands = []
        self.current_mode = 'setup'
        self.width = 400
        self.height = 400
        self.in_setup = False
        self.in_draw = False

    def size(self, w, h):
        """Set canvas size."""
        self.width = w
        self.height = h
        self._add_command({'type': 'size', 'width': w, 'height': h})

    def background(self, *args):
        """Set background color (grayscale or RGB)."""
        cmd = {'type': 'background'}
        if len(args) == 1:
            cmd['gray'] = args[0]
        elif len(args) >= 3:
            cmd['r'], cmd['g'], cmd['b'] = args[0], args[1], args[2]
        self._add_command(cmd)

    def fill(self, *args):
        """Set fill color (grayscale or RGB)."""
        cmd = {'type': 'fill'}
        if len(args) == 1:
            cmd['gray'] = args[0]
        elif len(args) >= 3:
            cmd['r'], cmd['g'], cmd['b'] = args[0], args[1], args[2]
        self._add_command(cmd)

    def noFill(self):
        """Disable fill."""
        self._add_command({'type': 'noFill'})

    def stroke(self, *args):
        """Set stroke color (grayscale or RGB)."""
        cmd = {'type': 'stroke'}
        if len(args) == 1:
            cmd['gray'] = args[0]
        elif len(args) >= 3:
            cmd['r'], cmd['g'], cmd['b'] = args[0], args[1], args[2]
        self._add_command(cmd)

    def noStroke(self):
        """Disable stroke."""
        self._add_command({'type': 'noStroke'})

    def strokeWeight(self, weight):
        """Set stroke width."""
        self._add_command({'type': 'strokeWeight', 'weight': float(weight)})

    def ellipse(self, x, y, w, h=None):
        """Draw an ellipse."""
        if h is None:
            h = w
        self._add_command({'type': 'ellipse', 'x': float(x), 'y': float(y), 'w': float(w), 'h': float(h)})

    def circle(self, x, y, diameter):
        """Draw a circle."""
        self.ellipse(x, y, diameter, diameter)

    def rect(self, x, y, w, h):
        """Draw a rectangle."""
        self._add_command({'type': 'rect', 'x': float(x), 'y': float(y), 'w': float(w), 'h': float(h)})

    def square(self, x, y, size):
        """Draw a square."""
        self.rect(x, y, size, size)

    def line(self, x1, y1, x2, y2):
        """Draw a line."""
        self._add_command({'type': 'line', 'x1': float(x1), 'y1': float(y1), 'x2': float(x2), 'y2': float(y2)})

    def triangle(self, x1, y1, x2, y2, x3, y3):
        """Draw a triangle."""
        self._add_command({
            'type': 'triangle',
            'x1': float(x1), 'y1': float(y1),
            'x2': float(x2), 'y2': float(y2),
            'x3': float(x3), 'y3': float(y3)
        })

    def point(self, x, y):
        """Draw a point."""
        self._add_command({'type': 'point', 'x': float(x), 'y': float(y)})

    def arc(self, x, y, w, h, start, stop):
        """Draw an arc."""
        self._add_command({
            'type': 'arc',
            'x': float(x), 'y': float(y),
            'w': float(w), 'h': float(h),
            'start': float(start), 'stop': float(stop)
        })

    def quad(self, x1, y1, x2, y2, x3, y3, x4, y4):
        """Draw a quadrilateral."""
        self._add_command({
            'type': 'quad',
            'x1': float(x1), 'y1': float(y1),
            'x2': float(x2), 'y2': float(y2),
            'x3': float(x3), 'y3': float(y3),
            'x4': float(x4), 'y4': float(y4)
        })

    def text(self, txt, x, y):
        """Draw text."""
        self._add_command({'type': 'text', 'text': str(txt), 'x': float(x), 'y': float(y)})

    def textSize(self, size):
        """Set text size."""
        self._add_command({'type': 'textSize', 'size': float(size)})

    def push(self):
        """Save current drawing state."""
        self._add_command({'type': 'push'})

    def pop(self):
        """Restore previous drawing state."""
        self._add_command({'type': 'pop'})

    def translate(self, x, y):
        """Translate coordinate system."""
        self._add_command({'type': 'translate', 'x': float(x), 'y': float(y)})

    def rotate(self, angle):
        """Rotate coordinate system."""
        self._add_command({'type': 'rotate', 'angle': float(angle)})

    def scale(self, sx, sy=None):
        """Scale coordinate system."""
        if sy is None:
            sy = sx
        self._add_command({'type': 'scale', 'sx': float(sx), 'sy': float(sy)})

    def _add_command(self, cmd):
        """Add command to appropriate list based on current mode."""
        if self.current_mode == 'setup':
            self.setup_commands.append(cmd)
        else:
            self.draw_commands.append(cmd)

    def _enter_setup(self):
        """Mark that we're entering setup function."""
        self.current_mode = 'setup'
        self.in_setup = True

    def _exit_setup(self):
        """Mark that we're exiting setup function."""
        self.in_setup = False

    def _enter_draw(self):
        """Mark that we're entering draw function."""
        self.current_mode = 'draw'
        self.in_draw = True

    def _exit_draw(self):
        """Mark that we're exiting draw function."""
        self.in_draw = False

    def get_commands(self):
        """Return all recorded commands as JSON-serializable dict."""
        return {
            'setup': self.setup_commands,
            'draw': self.draw_commands,
            'width': self.width,
            'height': self.height
        }
