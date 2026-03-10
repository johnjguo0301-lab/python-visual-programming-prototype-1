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

    @app.route('/api/run', methods=['POST'])
    def run_code():
        data = request.get_json()
        code = data.get('code', '')
        if not code.strip():
            return jsonify({'stdout': '', 'stderr': 'No code to run.\n'})
        try:
            result = subprocess.run(
                [sys.executable, '-c', code],
                capture_output=True, text=True, timeout=15
            )
            return jsonify({
                'stdout': result.stdout,
                'stderr': result.stderr
            })
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
