# 🚀 Quick Deployment Guide

Your dashboard is ready to deploy! Choose one of these methods:

## ⚡ Method 1: Render.com (Easiest - Recommended)

1. **Create account** at [render.com](https://render.com) (free)

2. **New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub account OR
   - Use "Public Git Repository" with this folder

3. **Configure:**
   - Name: `albert-dashboard`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Click "Create Web Service"

4. **Get URL:** Render will provide a URL like `albert-dashboard.onrender.com`

**⏱️ Deploy time: ~5 minutes**

---

## 🚂 Method 2: Railway.app

1. **Create account** at [railway.app](https://railway.app)

2. **New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo" OR "Empty Project"
   
3. **Connect Repository:**
   - If using GitHub: Authorize and select repo
   - If manual: Use Railway CLI (see below)

4. **Generate Domain:**
   - Go to Settings → Generate Domain
   - Get URL like `albert-dashboard.up.railway.app`

**⏱️ Deploy time: ~3 minutes**

---

## 🔷 Method 3: Vercel (Alternative)

**Note:** Vercel requires slight modification for session persistence.

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in dashboard folder
3. Follow prompts

---

## 🖥️ Method 4: Manual Upload to Any Node.js Host

If you have your own hosting (DigitalOcean, AWS, etc.):

```bash
# 1. Upload entire dashboard folder
# 2. SSH into server
cd /path/to/dashboard
npm install
node server.js

# 3. Use PM2 for production:
npm i -g pm2
pm2 start server.js --name albert-dashboard
pm2 save
pm2 startup
```

---

## 📋 What You'll Need

- Dashboard URL (provided after deployment)
- Login credentials:
  - Username: `ottri`
  - Password: `albert2024`

---

## ✅ Verification Steps

After deployment:

1. Visit your dashboard URL
2. You should see the login page
3. Login with credentials
4. Test:
   - ✓ Add a new task
   - ✓ Drag task between columns
   - ✓ Filter by date
   - ✓ Delete a task
   - ✓ Logout and login again
   - ✓ Tasks should persist

---

## 🔐 Security Recommendations

**After successful deployment:**

1. **Change the password** (see README-DEPLOYMENT.md)
2. **Set SESSION_SECRET** environment variable in your hosting platform
3. **Enable HTTPS** (most platforms do this automatically)

---

## 🐛 Troubleshooting

**Problem:** Can't access URL
- Wait 2-3 minutes for first deploy
- Check deployment logs in hosting dashboard

**Problem:** Login doesn't work
- Clear browser cookies
- Verify credentials: `ottri` / `albert2024`

**Problem:** Tasks not saving
- Check if `tasks-data.json` has write permissions
- Review hosting platform logs

---

## 📞 Need Help?

1. Check hosting platform's documentation
2. Review error logs in hosting dashboard
3. Test locally first: `npm start` → http://localhost:3000

---

## 🎯 Quick Start Commands

```bash
# Test locally
cd /Users/claudebot/.openclaw/workspace/dashboard
npm install
npm start
# Visit: http://localhost:3000/login

# Deploy to Render
# → Use web interface (easiest)

# Deploy to Railway  
npx railway login
npx railway init
npx railway up
npx railway domain

# Deploy to Vercel
vercel
```

---

**Ready to deploy? Start with Render.com - it's the easiest!**
