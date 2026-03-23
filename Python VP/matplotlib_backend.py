"""
Matplotlib command recorder for capturing plotting operations as JSON.
This module provides a mock matplotlib.pyplot interface that records all plotting commands
instead of rendering them, allowing replay on a client-side canvas.
"""


class MatplotlibRecorder:
    """Records matplotlib plotting commands as JSON-serializable data."""

    def __init__(self):
        self.commands = []
        self.current_color = None
        self.current_linewidth = 1

    def plot(self, *args, **kwargs):
        """Record line plot command."""
        # Handle different argument patterns: plot(y), plot(x, y), plot(x, y, format_string)
        x_data = None
        y_data = None

        if len(args) == 1:
            # plot([1, 2, 3]) - y values only
            y_data = list(args[0]) if hasattr(args[0], '__iter__') else [args[0]]
            x_data = list(range(len(y_data)))
        elif len(args) >= 2:
            # plot([1, 2, 3], [4, 5, 6]) - x and y values
            x_data = list(args[0]) if hasattr(args[0], '__iter__') else [args[0]]
            y_data = list(args[1]) if hasattr(args[1], '__iter__') else [args[1]]

        cmd = {
            'type': 'plot',
            'x': x_data,
            'y': y_data,
            'color': kwargs.get('color', kwargs.get('c')),
            'linewidth': kwargs.get('linewidth', kwargs.get('lw', 2)),
            'linestyle': kwargs.get('linestyle', kwargs.get('ls', '-')),
            'marker': kwargs.get('marker'),
            'label': kwargs.get('label')
        }
        self.commands.append(cmd)

    def bar(self, x, height, **kwargs):
        """Record bar chart command."""
        # Convert x to list of indices if it's categorical
        if hasattr(x, '__iter__') and not isinstance(x, str):
            x_values = list(x)
        else:
            x_values = x

        cmd = {
            'type': 'bar',
            'x': x_values,
            'height': list(height) if hasattr(height, '__iter__') else [height],
            'width': kwargs.get('width', 0.8),
            'color': kwargs.get('color', kwargs.get('c')),
            'label': kwargs.get('label')
        }
        self.commands.append(cmd)

    def scatter(self, x, y, **kwargs):
        """Record scatter plot command."""
        cmd = {
            'type': 'scatter',
            'x': list(x) if hasattr(x, '__iter__') else [x],
            'y': list(y) if hasattr(y, '__iter__') else [y],
            's': kwargs.get('s', 20),  # size
            'c': kwargs.get('c', kwargs.get('color')),  # color
            'marker': kwargs.get('marker', 'o'),
            'alpha': kwargs.get('alpha', 1.0),
            'label': kwargs.get('label')
        }
        self.commands.append(cmd)

    def pie(self, x, **kwargs):
        """Record pie chart command."""
        cmd = {
            'type': 'pie',
            'values': list(x) if hasattr(x, '__iter__') else [x],
            'labels': kwargs.get('labels'),
            'colors': kwargs.get('colors'),
            'autopct': kwargs.get('autopct'),
            'startangle': kwargs.get('startangle', 0)
        }
        self.commands.append(cmd)

    def hist(self, x, **kwargs):
        """Record histogram command."""
        cmd = {
            'type': 'hist',
            'data': list(x) if hasattr(x, '__iter__') else [x],
            'bins': kwargs.get('bins', 10),
            'color': kwargs.get('color', kwargs.get('c')),
            'alpha': kwargs.get('alpha', 0.7),
            'label': kwargs.get('label')
        }
        self.commands.append(cmd)

    def title(self, label, **kwargs):
        """Record title command."""
        self.commands.append({
            'type': 'title',
            'text': str(label),
            'fontsize': kwargs.get('fontsize', 14)
        })

    def xlabel(self, label, **kwargs):
        """Record x-axis label command."""
        self.commands.append({
            'type': 'xlabel',
            'text': str(label),
            'fontsize': kwargs.get('fontsize', 12)
        })

    def ylabel(self, label, **kwargs):
        """Record y-axis label command."""
        self.commands.append({
            'type': 'ylabel',
            'text': str(label),
            'fontsize': kwargs.get('fontsize', 12)
        })

    def legend(self, **kwargs):
        """Record legend command."""
        self.commands.append({
            'type': 'legend',
            'loc': kwargs.get('loc', 'best')
        })

    def grid(self, visible=True, **kwargs):
        """Record grid command."""
        self.commands.append({
            'type': 'grid',
            'visible': visible,
            'alpha': kwargs.get('alpha', 0.3)
        })

    def xlim(self, left=None, right=None):
        """Record x-axis limits."""
        self.commands.append({
            'type': 'xlim',
            'left': left,
            'right': right
        })

    def ylim(self, bottom=None, top=None):
        """Record y-axis limits."""
        self.commands.append({
            'type': 'ylim',
            'bottom': bottom,
            'top': top
        })

    def show(self):
        """Mark plot as ready to display."""
        self.commands.append({'type': 'show'})

    def clf(self):
        """Clear the current figure."""
        self.commands.append({'type': 'clear'})

    def clear(self):
        """Alias for clf."""
        self.clf()

    def get_commands(self):
        """Return all recorded commands as JSON-serializable list."""
        return self.commands
