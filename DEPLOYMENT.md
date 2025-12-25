# Render.com Deployment Guide

This guide will help you deploy the BeyondChats application to Render.com for free.

## 🎯 What You'll Get

After deployment, you'll have three services with free subdomains:
- **Frontend**: `https://beyondchats-frontend.onrender.com`
- **Backend API**: `https://beyondchats-backend.onrender.com`
- **Cron Job**: Article enhancer runs every 6 hours

## 📋 Prerequisites

1. GitHub account (you already have this ✓)
2. Render.com account (free sign-up)
3. Push your code to GitHub (if not already done)

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 3: Deploy Using render.yaml (Easiest)

Render will automatically detect the `render.yaml` file and deploy all services:

1. In Render dashboard, click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository: `YadneshTeli/Assignment-Laravel`
3. Render will automatically read `render.yaml` and show all 3 services
4. Click **"Apply"**

That's it! Render will:
- Build and deploy the Laravel backend (with Docker)
- Build and deploy the React frontend (as static site)
- Set up the Node.js cron job (runs every 6 hours)

### Step 4: Configure Environment Variables

After deployment, add your API keys:

1. Go to **article-enhancer** service (cron job)
2. Click **"Environment"** tab
3. Add these variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   GOOGLE_SEARCH_API_KEY=your_google_search_key_here
   GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
   ```
4. Click **"Save Changes"**

> **Note**: The app works without these keys (uses mock data), but for full functionality, get:
> - Gemini API Key: [Google AI Studio](https://makersuite.google.com/app/apikey)
> - Google Search: [Google Cloud Console](https://console.cloud.google.com/)

### Step 5: Update Frontend API URL (If Needed)

If your backend gets a different URL:

1. Go to **beyondchats-frontend** service
2. Click **"Environment"** tab
3. Update `VITE_API_URL` to match your backend URL
4. Click **"Save Changes"** (will auto-redeploy)

## 🔄 Alternative: Manual Deployment

If you prefer to deploy each service separately:

### Backend (Web Service)

1. Click **"New +"** → **"Web Service"**
2. Connect repository: `YadneshTeli/Assignment-Laravel`
3. Configure:
   - **Name**: `beyondchats-backend`
   - **Region**: Oregon (or closest to you)
   - **Root Directory**: `laravel-backend`
   - **Environment**: Docker
   - **Dockerfile Path**: `./laravel-backend/Dockerfile`
   - **Plan**: Free
4. Click **"Create Web Service"**

### Frontend (Static Site)

1. Click **"New +"** → **"Static Site"**
2. Connect repository: `YadneshTeli/Assignment-Laravel`
3. Configure:
   - **Name**: `beyondchats-frontend`
   - **Root Directory**: `react-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://beyondchats-backend.onrender.com/api`
5. Click **"Create Static Site"**

### Node.js Enhancer (Cron Job)

1. Click **"New +"** → **"Cron Job"**
2. Connect repository: `YadneshTeli/Assignment-Laravel`
3. Configure:
   - **Name**: `article-enhancer`
   - **Root Directory**: `nodejs-script`
   - **Build Command**: `npm install`
   - **Command**: `npm start`
   - **Schedule**: `0 */6 * * *` (every 6 hours)
4. Add environment variables:
   - `LARAVEL_API_URL` = `https://beyondchats-backend.onrender.com/api`
   - `GEMINI_API_KEY`, `GOOGLE_SEARCH_API_KEY` (optional)
5. Click **"Create Cron Job"**

## 📊 Monitoring

### Check Service Status
- Dashboard shows all services with status indicators
- Green = running, Yellow = deploying, Red = failed

### View Logs
- Click any service → **"Logs"** tab
- Real-time logs for debugging

### Backend Health Check
- Backend includes health check at `/api/articles`
- Render automatically monitors this endpoint

## ⚠️ Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds (cold start)
- 750 hours/month of runtime (plenty for 3 services)
- Cron jobs are always on schedule

### Database Persistence
- SQLite database persists across deployments
- Stored in `/var/www/html/database/database.sqlite`
- Data is preserved automatically

### CORS Configuration
The Laravel backend is already configured to accept requests from any origin. For production, you may want to restrict this:

1. Edit `laravel-backend/config/cors.php`
2. Change `'allowed_origins' => ['*']` to your frontend URL
3. Push changes to redeploy

## 🔧 Troubleshooting

### Backend won't start
- Check **Logs** for error messages
- Verify environment variables are set
- Ensure Dockerfile builds successfully

### Frontend API errors
- Verify `VITE_API_URL` points to correct backend URL
- Check backend is running (green status)
- Test backend directly: `https://your-backend.onrender.com/api/articles`

### Cron job not running
- Check **Logs** to see last execution
- Verify schedule is correct (cron syntax)
- Ensure `LARAVEL_API_URL` is correct

## 🎉 Success!

Once deployed, share your live app:
- **Live App**: `https://beyondchats-frontend.onrender.com`
- **API Docs**: `https://beyondchats-backend.onrender.com/api/articles`

Your app will automatically redeploy when you push to GitHub!

## 📱 Post-Deployment

### Enable Auto-Deploy
Already enabled by default - every push to `main` triggers redeployment.

### Custom Domain (Optional)
1. Go to service settings
2. Click **"Custom Domain"**
3. Add your domain and configure DNS

### Upgrade to Paid Plan (Optional)
- No cold starts
- More build minutes
- Priority support
- Starting at $7/month per service

---

## 🆘 Need Help?

- Render Docs: https://render.com/docs
- Discord: https://discord.gg/render
- GitHub Issues: Create an issue in your repo

**Deployed successfully?** Don't forget to update your README.md with the live URLs! 🚀
