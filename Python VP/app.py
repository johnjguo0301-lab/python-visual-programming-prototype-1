from flask import Flask, request, jsonify
from database.db import close_db, init_db
import config
import subprocess
import sys


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = config.SECRET_KEY
    app.config['DATABASE'] = config.DATABASE

    app.teardown_appcontext(close_db)

    with app.app_context():
        init_db()

    from routes.auth import auth_bp
    from routes.projects import projects_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')

    @app.route('/')
    def index():
        from flask import render_template
        return render_template('index.html')

    @app.route('/test-loops')
    def test_loops():
        from flask import render_template
        return render_template('test_loops.html')

    @app.route('/test-canvas')
    def test_canvas():
        from flask import render_template
        return render_template('test_canvas.html')

    @app.route('/debug')
    def debug():
        from flask import render_template
        return render_template('debug.html')

    @app.route('/api/run', methods=['POST'])
    def run_code():
        data = request.get_json()
        code = data.get('code', '')
        if not code.strip():
            return jsonify({'stdout': '', 'stderr': 'No code to run.\n'})

        # Check if code uses turtle
        uses_turtle = 'turtle.' in code or 'from turtle import' in code or 'import turtle' in code

        # Check if code uses matplotlib
        uses_matplotlib = 'plt.' in code or 'matplotlib' in code or 'import matplotlib.pyplot' in code

        # Check if code uses processing
        uses_processing = 'def setup()' in code or 'def draw()' in code or any(
            func in code for func in ['ellipse(', 'rect(', 'line(', 'fill(', 'stroke(', 'background(']
        )

        import re
        modified_code = code

        # Build the setup code
        setup_code = ""
        cleanup_code = ""

        if uses_turtle or uses_matplotlib or uses_processing:
            setup_code = """
import sys
import json
sys.path.insert(0, r'""" + app.root_path + """')
"""

        if uses_turtle:
            # Remove any turtle imports from the code
            code_lines = modified_code.split('\n')
            filtered_lines = []
            for line in code_lines:
                if not re.match(r'^\s*(import turtle|from turtle import)', line):
                    filtered_lines.append(line)
            modified_code = '\n'.join(filtered_lines)

            # Inject turtle backend
            setup_code += """
from turtle_backend import TurtleRecorder
turtle = TurtleRecorder()
"""
            cleanup_code += """
print('__TURTLE_COMMANDS__' + json.dumps(turtle.get_commands()))
"""

        if uses_matplotlib:
            # Remove matplotlib imports
            code_lines = modified_code.split('\n')
            filtered_lines = []
            for line in code_lines:
                if not re.match(r'^\s*(import matplotlib|from matplotlib import)', line):
                    filtered_lines.append(line)
            modified_code = '\n'.join(filtered_lines)

            # Inject matplotlib backend
            setup_code += """
from matplotlib_backend import MatplotlibRecorder
plt = MatplotlibRecorder()
"""
            cleanup_code += """
print('__MATPLOTLIB_COMMANDS__' + json.dumps(plt.get_commands()))
"""

        if uses_processing:
            # Inject processing backend and wrap setup/draw functions
            setup_code += """
from processing_backend import ProcessingRecorder
_processing = ProcessingRecorder()

# Make processing functions available globally
size = _processing.size
background = _processing.background
fill = _processing.fill
noFill = _processing.noFill
stroke = _processing.stroke
noStroke = _processing.noStroke
strokeWeight = _processing.strokeWeight
ellipse = _processing.ellipse
circle = _processing.circle
rect = _processing.rect
square = _processing.square
line = _processing.line
triangle = _processing.triangle
point = _processing.point
arc = _processing.arc
quad = _processing.quad
text = _processing.text
textSize = _processing.textSize
push = _processing.push
pop = _processing.pop
translate = _processing.translate
rotate = _processing.rotate
scale = _processing.scale
"""
            # Wrap setup and draw functions if they exist
            if 'def setup()' in modified_code:
                modified_code = modified_code.replace('def setup():', 'def _user_setup():')
                cleanup_code += """
_processing._enter_setup()
_user_setup()
_processing._exit_setup()
"""
            if 'def draw()' in modified_code:
                modified_code = modified_code.replace('def draw():', 'def _user_draw():')
                cleanup_code += """
_processing._enter_draw()
_user_draw()
_processing._exit_draw()
"""
            cleanup_code += """
print('__PROCESSING_COMMANDS__' + json.dumps(_processing.get_commands()))
"""

        # Combine all parts
        if setup_code:
            modified_code = setup_code + modified_code + cleanup_code

        try:
            result = subprocess.run(
                [sys.executable, '-c', modified_code],
                capture_output=True, text=True, timeout=15
            )

            stdout = result.stdout
            stderr = result.stderr
            turtle_commands = []
            matplotlib_commands = []
            processing_commands = None

            # Extract turtle commands if present
            if uses_turtle and '__TURTLE_COMMANDS__' in stdout:
                parts = stdout.split('__TURTLE_COMMANDS__')
                stdout = parts[0]
                if len(parts) > 1:
                    import json
                    try:
                        # Handle case where other commands might also be in the same output
                        turtle_json = parts[1]
                        if '__MATPLOTLIB_COMMANDS__' in turtle_json:
                            turtle_json = turtle_json.split('__MATPLOTLIB_COMMANDS__')[0]
                        if '__PROCESSING_COMMANDS__' in turtle_json:
                            turtle_json = turtle_json.split('__PROCESSING_COMMANDS__')[0]
                        turtle_commands = json.loads(turtle_json.strip())
                    except:
                        pass

            # Extract matplotlib commands if present
            if uses_matplotlib and '__MATPLOTLIB_COMMANDS__' in stdout:
                parts = stdout.split('__MATPLOTLIB_COMMANDS__')
                stdout = parts[0]
                if len(parts) > 1:
                    import json
                    try:
                        matplotlib_json = parts[1]
                        if '__PROCESSING_COMMANDS__' in matplotlib_json:
                            matplotlib_json = matplotlib_json.split('__PROCESSING_COMMANDS__')[0]
                        matplotlib_commands = json.loads(matplotlib_json.strip())
                    except:
                        pass

            # Extract processing commands if present
            if uses_processing and '__PROCESSING_COMMANDS__' in stdout:
                parts = stdout.split('__PROCESSING_COMMANDS__')
                stdout = parts[0]
                if len(parts) > 1:
                    import json
                    try:
                        processing_commands = json.loads(parts[1].strip())
                    except:
                        pass

            response = {
                'stdout': stdout,
                'stderr': stderr
            }
            if turtle_commands:
                response['turtle_commands'] = turtle_commands
            if matplotlib_commands:
                response['matplotlib_commands'] = matplotlib_commands
            if processing_commands:
                response['processing_commands'] = processing_commands

            return jsonify(response)
        except subprocess.TimeoutExpired:
            return jsonify({
                'stdout': '',
                'stderr': 'Execution timed out (15 second limit).\n'
            })
        except Exception as e:
            return jsonify({
                'stdout': '',
                'stderr': str(e) + '\n'
            })

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=8080)
