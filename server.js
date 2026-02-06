const express = require('express');
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

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dashboard route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoints for task management
app.get('/api/tasks', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        res.json(data.tasks || []);
    } catch (error) {
        console.error('Error reading tasks:', error);
        res.status(500).json({ error: 'Failed to load tasks' });
    }
});

app.post('/api/tasks', (req, res) => {
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
    console.log(`📍 Access at: http://localhost:${PORT}`);
});
