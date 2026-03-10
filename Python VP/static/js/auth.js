// Auth UI - offline localStorage-based
const Auth = (() => {
    const modal = () => document.getElementById('auth-modal');
    const form = () => document.getElementById('auth-form');
    const title = () => document.getElementById('auth-modal-title');
    const submitBtn = () => document.getElementById('auth-submit');
    const errorEl = () => document.getElementById('auth-error');

    let mode = 'login';

    function getUsers() {
        return JSON.parse(localStorage.getItem('pvp-users') || '{}');
    }
    function saveUsers(users) {
        localStorage.setItem('pvp-users', JSON.stringify(users));
    }
    function getCurrentUser() {
        return localStorage.getItem('pvp-current-user') || null;
    }

    function showModal(m) {
        mode = m;
        title().textContent = m === 'login' ? 'Login' : 'Register';
        submitBtn().textContent = m === 'login' ? 'Login' : 'Register';
        errorEl().textContent = '';
        form().reset();
        modal().style.display = 'flex';
    }

    function setLoggedIn(username) {
        localStorage.setItem('pvp-current-user', username);
    }

    function setLoggedOut() {
        localStorage.removeItem('pvp-current-user');
    }

    function checkSession() {
        // No-op — menu updates handled by app.js
    }

    function handleSubmit(e) {
        e.preventDefault();
        var username = document.getElementById('auth-username').value.trim();
        var password = document.getElementById('auth-password').value;
        errorEl().textContent = '';

        if (!username || !password) {
            errorEl().textContent = 'Username and password required';
            return;
        }
        var users = getUsers();
        if (mode === 'register') {
            if (username.length < 3) {
                errorEl().textContent = 'Username must be at least 3 characters';
                return;
            }
            if (users[username]) {
                errorEl().textContent = 'Username already taken';
                return;
            }
            users[username] = { password: password };
            saveUsers(users);
            setLoggedIn(username);
            modal().style.display = 'none';
        } else {
            if (!users[username] || users[username].password !== password) {
                errorEl().textContent = 'Invalid username or password';
                return;
            }
            setLoggedIn(username);
            modal().style.display = 'none';
        }
    }

    function logout() {
        setLoggedOut();
        delete sessionStorage.currentProjectId;
    }

    function isLoggedIn() { return getCurrentUser() !== null; }

    document.addEventListener('DOMContentLoaded', () => {
        form().addEventListener('submit', handleSubmit);
    });

    return { showModal, logout, checkSession, isLoggedIn, getCurrentUser };
})();
