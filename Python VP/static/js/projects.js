// Projects - offline localStorage-based save/load
const Projects = (() => {
    const modal = () => document.getElementById('projects-modal');
    const listEl = () => document.getElementById('projects-list');

    function getProjects() {
        return JSON.parse(localStorage.getItem('pvp-projects') || '[]');
    }
    function saveProjects(projects) {
        localStorage.setItem('pvp-projects', JSON.stringify(projects));
    }

    function save() {
        if (!Auth.isLoggedIn()) {
            alert('Please login to save projects.');
            Auth.showModal('login');
            return;
        }

        var user = Auth.getCurrentUser();
        var name = document.getElementById('project-name').value.trim() || 'Untitled Project';
        var blockly_xml = Editor.getWorkspaceJSON();
        var generated_code = Editor.getCode();
        var projects = getProjects();
        var projectId = sessionStorage.currentProjectId;

        if (projectId) {
            var idx = projects.findIndex(function(p) { return p.id === projectId; });
            if (idx !== -1) {
                projects[idx].name = name;
                projects[idx].blockly_xml = blockly_xml;
                projects[idx].generated_code = generated_code;
                projects[idx].updated_at = new Date().toISOString();
            }
        } else {
            var newId = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
            projects.push({
                id: newId, user: user, name: name,
                blockly_xml: blockly_xml, generated_code: generated_code,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
            sessionStorage.currentProjectId = newId;
        }
        saveProjects(projects);
        alert('Project saved!');
    }
    function showLoadModal() {
        if (!Auth.isLoggedIn()) {
            alert('Please login to load projects.');
            Auth.showModal('login');
            return;
        }

        var user = Auth.getCurrentUser();
        var projects = getProjects().filter(function(p) { return p.user === user; });
        projects.sort(function(a, b) { return b.updated_at.localeCompare(a.updated_at); });

        listEl().innerHTML = '';
        if (projects.length === 0) {
            listEl().innerHTML = '<p style="color:var(--text-muted);">No saved projects yet.</p>';
        } else {
            projects.forEach(function(p) {
                var item = document.createElement('div');
                item.className = 'project-item';
                item.innerHTML =
                    '<div><div class="name">' + escapeHtml(p.name) + '</div>' +
                    '<div class="date">' + new Date(p.updated_at).toLocaleDateString() + '</div></div>' +
                    '<button class="delete-btn" data-id="' + p.id + '">Delete</button>';
                item.addEventListener('click', function(e) {
                    if (e.target.classList.contains('delete-btn')) return;
                    loadProject(p.id);
                });
                item.querySelector('.delete-btn').addEventListener('click', function(e) {
                    e.stopPropagation();
                    deleteProject(p.id);
                });
                listEl().appendChild(item);
            });
        }
        modal().style.display = 'flex';
    }

    function loadProject(id) {
        var projects = getProjects();
        var project = projects.find(function(p) { return p.id === id; });
        if (!project) { alert('Project not found.'); return; }
        Editor.clearWorkspace();
        if (project.blockly_xml) Editor.loadWorkspaceJSON(project.blockly_xml);
        document.getElementById('project-name').value = project.name;
        sessionStorage.currentProjectId = id;
        modal().style.display = 'none';
        Editor.updateCode();
    }

    function deleteProject(id) {
        if (!confirm('Delete this project?')) return;
        var projects = getProjects().filter(function(p) { return p.id !== id; });
        saveProjects(projects);
        if (sessionStorage.currentProjectId === id) delete sessionStorage.currentProjectId;
        showLoadModal();
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    return { save, showLoadModal };
})();
