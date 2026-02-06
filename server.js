const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Data file for persistent storage
const DATA_FILE = path.join(__dirname, 'tasks-data.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ tasks: [] }));
}

// User credentials (hashed passwords)
// Default: username "ottri" password "1234"
const USERS = {
    'ottri': '$2b$10$A3O6buXaFX08hqRqIML9huEJYNDYHkBmdHGh2oLNGhtOkO8yUpaJ.' // 1234
};

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'albert-dashboard-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Authentication middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.authenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Routes
app.get('/login', (req, res) => {
    if (req.session && req.session.authenticated) {
        return res.redirect('/');
    }
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Albert Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .login-container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .login-header h1 {
            color: #3b2179;
            font-size: 2em;
            margin-bottom: 10px;
        }
        .login-header p {
            color: #666;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #3b2179;
        }
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0d4f0;
            border-radius: 6px;
            font-size: 1em;
            transition: border-color 0.2s;
        }
        .form-group input:focus {
            outline: none;
            border-color: #3b2179;
        }
        .login-btn {
            width: 100%;
            padding: 12px;
            background: #3b2179;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        .login-btn:hover {
            background: #4d2b8f;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(59, 33, 121, 0.3);
        }
        .error {
            background: #ffe0e0;
            color: #cc0000;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>🎯 Albert Dashboard</h1>
            <p>AI Chief of Staff for Ottri</p>
        </div>
        ${req.query.error ? '<div class="error">Invalid username or password</div>' : ''}
        <form method="POST" action="/login">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="login-btn">Log In</button>
        </form>
    </div>
</body>
</html>
    `);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.redirect('/login?error=1');
    }

    const hashedPassword = USERS[username];
    if (!hashedPassword) {
        return res.redirect('/login?error=1');
    }

    try {
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
            req.session.authenticated = true;
            req.session.username = username;
            res.redirect('/');
        } else {
            res.redirect('/login?error=1');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.redirect('/login?error=1');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Protected dashboard route
app.get('/', requireAuth, (req, res) => {
    const dashboardHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
    // Inject logout button
    const modifiedHtml = dashboardHtml.replace(
        '<p>AI Chief of Staff for Ottri</p>',
        `<p>AI Chief of Staff for Ottri</p>
        <p style="margin-top: 10px;">
            <span style="opacity: 0.8;">Logged in as: ${req.session.username}</span> | 
            <a href="/logout" style="color: white; text-decoration: underline;">Logout</a>
        </p>`
    );
    res.send(modifiedHtml);
});

// API endpoints for task management
app.get('/api/tasks', requireAuth, (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        res.json(data.tasks || []);
    } catch (error) {
        console.error('Error reading tasks:', error);
        res.status(500).json({ error: 'Failed to load tasks' });
    }
});

app.post('/api/tasks', requireAuth, (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        data.tasks = req.body.tasks || [];
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving tasks:', error);
        res.status(500).json({ error: 'Failed to save tasks' });
    }
});

// Static files (for any additional assets)
app.use('/static', express.static('static'));

// Start server
app.listen(PORT, () => {
    console.log(`🎯 Albert Dashboard running on port ${PORT}`);
    console.log(`📍 Login at: http://localhost:${PORT}/login`);
});
