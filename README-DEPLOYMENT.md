# Albert Dashboard - Deployment Guide

## 🎯 Overview
This is Albert's Task Dashboard with username/password authentication, deployed to the web.

## 🔐 Default Credentials
- **Username:** `ottri`
- **Password:** `albert2024`

**⚠️ IMPORTANT:** Change these credentials in production! See "Changing Credentials" below.

## 🚀 Deployment on Railway

### Option 1: Deploy via Railway CLI (Recommended)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize and deploy:**
   ```bash
   cd /Users/claudebot/.openclaw/workspace/dashboard
   railway init
   railway up
   ```

4. **Generate a domain:**
   ```bash
   railway domain
   ```

### Option 2: Deploy via GitHub

1. **Create a GitHub repository** and push the dashboard code:
   ```bash
   cd /Users/claudebot/.openclaw/workspace/dashboard
   git init
   git add .
   git commit -m "Initial commit - Albert Dashboard"
   gh repo create albert-dashboard --public --source=. --remote=origin --push
   ```

2. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `albert-dashboard` repository
   - Railway will auto-detect the Node.js app and deploy

3. **Generate a domain:**
   - In Railway dashboard, go to your project
   - Click "Settings" → "Generate Domain"

## 🔧 Local Testing

Before deployment, test locally:

```bash
cd /Users/claudebot/.openclaw/workspace/dashboard
npm install
npm start
```

Visit: http://localhost:3000/login

## 🔐 Changing Credentials

To change the username/password:

1. **Generate a new password hash:**
   ```javascript
   const bcrypt = require('bcrypt');
   bcrypt.hash('your-new-password', 10, (err, hash) => {
       console.log(hash);
   });
   ```

2. **Update server.js:**
   Replace the USERS object:
   ```javascript
   const USERS = {
       'your-username': 'paste-hash-here'
   };
   ```

3. **Redeploy** the application

## 📊 Features Retained

✅ Kanban board with 3 columns (Done, Planned, Ideas)
✅ Date filtering (Today, This Week, This Month, This Year, All Time)
✅ Drag-and-drop between columns
✅ Add/delete tasks
✅ Persistent storage (server-side JSON file)
✅ Purple branding (#3b2179)
✅ Responsive design

## 🆕 New Features

✅ Username/password authentication
✅ Session management (24-hour sessions)
✅ Logout functionality
✅ Server-side data persistence (works across deployments)
✅ Web-accessible via URL

## 🛠️ Tech Stack

- **Backend:** Express.js
- **Auth:** bcrypt + express-session
- **Storage:** JSON file (tasks-data.json)
- **Frontend:** Vanilla JS (no framework)
- **Hosting:** Railway (free tier)

## 📝 Environment Variables (Optional)

For production, set these in Railway:

- `SESSION_SECRET`: A random secret key for sessions
- `NODE_ENV`: Set to `production`

## 🐛 Troubleshooting

**Problem:** Can't login
- Check that you're using the correct username/password
- Default is `ottri` / `albert2024`

**Problem:** Tasks not persisting
- Check Railway logs: `railway logs`
- Ensure `tasks-data.json` is being created (check deployment volume)

**Problem:** 502 Bad Gateway
- Railway is still deploying - wait 1-2 minutes
- Check build logs in Railway dashboard

## 📞 Support

Need help? Contact Offir or check:
- Railway docs: https://docs.railway.app
- Express.js docs: https://expressjs.com
