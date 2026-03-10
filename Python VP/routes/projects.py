from flask import Blueprint, request, session, jsonify
from database.db import get_db
from routes.auth import login_required

projects_bp = Blueprint('projects', __name__)


@projects_bp.route('/', methods=['GET'])
@login_required
def list_projects():
    db = get_db()
    projects = db.execute(
        'SELECT id, name, description, created_at, updated_at FROM projects WHERE user_id = ? ORDER BY updated_at DESC',
        (session['user_id'],)
    ).fetchall()
    return jsonify([dict(p) for p in projects])


@projects_bp.route('/', methods=['POST'])
@login_required
def create_project():
    data = request.get_json()
    name = data.get('name', 'Untitled Project').strip()
    description = data.get('description', '')
    blockly_xml = data.get('blockly_xml', '')
    generated_code = data.get('generated_code', '')

    db = get_db()
    cursor = db.execute(
        'INSERT INTO projects (user_id, name, description, blockly_xml, generated_code) VALUES (?, ?, ?, ?, ?)',
        (session['user_id'], name, description, blockly_xml, generated_code)
    )
    db.commit()
    return jsonify({'id': cursor.lastrowid, 'name': name}), 201


@projects_bp.route('/<int:project_id>', methods=['GET'])
@login_required
def get_project(project_id):
    db = get_db()
    project = db.execute(
        'SELECT * FROM projects WHERE id = ? AND user_id = ?',
        (project_id, session['user_id'])
    ).fetchone()
    if project is None:
        return jsonify({'error': 'Project not found'}), 404
    return jsonify(dict(project))
@projects_bp.route('/<int:project_id>', methods=['PUT'])
@login_required
def update_project(project_id):
    db = get_db()
    project = db.execute(
        'SELECT id FROM projects WHERE id = ? AND user_id = ?',
        (project_id, session['user_id'])
    ).fetchone()
    if project is None:
        return jsonify({'error': 'Project not found'}), 404

    data = request.get_json()
    db.execute(
        'UPDATE projects SET name = ?, description = ?, blockly_xml = ?, generated_code = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        (data.get('name', 'Untitled'), data.get('description', ''), data.get('blockly_xml', ''), data.get('generated_code', ''), project_id)
    )
    db.commit()
    return jsonify({'message': 'Project saved'})


@projects_bp.route('/<int:project_id>', methods=['DELETE'])
@login_required
def delete_project(project_id):
    db = get_db()
    project = db.execute(
        'SELECT id FROM projects WHERE id = ? AND user_id = ?',
        (project_id, session['user_id'])
    ).fetchone()
    if project is None:
        return jsonify({'error': 'Project not found'}), 404

    db.execute('DELETE FROM projects WHERE id = ?', (project_id,))
    db.commit()
    return jsonify({'message': 'Project deleted'})
