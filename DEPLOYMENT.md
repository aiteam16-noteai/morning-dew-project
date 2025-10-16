# 🚀 Holy AI - Deployment Guide

Complete guide for deploying Holy AI to production (Vercel, Railway, Render, or Heroku).

> **⚠️ IMPORTANT**: Before deploying, ensure you've completed the security fixes in `SECURITY_FIXES.md`

---

## 📋 Pre-Deployment Checklist

- [ ] All exposed API keys rotated
- [ ] `.env` removed from git history
- [ ] Environment variables prepared
- [ ] Qdrant collection populated with data
- [ ] Local build tested successfully

---

## 🚀 Quick Deploy to Vercel (Recommended)

### Option A: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your repository
   - Configure:
     - Framework: **Other**
     - Build Command: `npm run build`
     - Output Directory: `dist/public`
     - Install Command: `npm install`

3. **Set Environment Variables** (Critical!)

   In Vercel → Settings → Environment Variables, add:

   **Required:**
   ```
   OPENAI_API_KEY=your_new_openai_key
   VITE_QDRANT_URL=https://your-instance.cloud.qdrant.io
   VITE_QDRANT_API_KEY=your_new_qdrant_key
   VITE_QDRANT_COLLECTION=data
   ```

   **Optional:**
   ```
   VITE_ELEVENLABS_API_KEY=your_elevenlabs_key
   VITE_ELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy** - Click "Deploy" and wait ~2-3 minutes

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

When prompted, provide the environment variables listed above.

---

## 🛤️ Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set OPENAI_API_KEY=your_key
railway variables set VITE_QDRANT_URL=your_url
railway variables set VITE_QDRANT_API_KEY=your_key
railway variables set VITE_QDRANT_COLLECTION=data

# Deploy
railway up
```

Or use the Railway Dashboard:
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy!

---

## 🎨 Deploy to Render

1. Go to https://render.com/
2. Create new **Web Service**
3. Connect your Git repository
4. Configure:
   - **Name**: holy-ai
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for production)
5. Add environment variables (see list below)
6. Click "Create Web Service"

---

## 📦 Deploy to Heroku

```bash
# Install Heroku CLI
# macOS: brew install heroku/brew/heroku
# Other: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create holy-ai-app

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key
heroku config:set VITE_QDRANT_URL=your_url
heroku config:set VITE_QDRANT_API_KEY=your_key
heroku config:set VITE_QDRANT_COLLECTION=data

# Deploy
git push heroku main

# Open app
heroku open
```

---

## 🔐 Environment Variables Reference

### Required Variables (Core Functionality)

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `OPENAI_API_KEY` | OpenAI API key (**backend only**, no VITE_ prefix) | https://platform.openai.com/api-keys |
| `VITE_QDRANT_URL` | Qdrant instance URL | https://cloud.qdrant.io/ |
| `VITE_QDRANT_API_KEY` | Qdrant API key | Qdrant Cloud dashboard |
| `VITE_QDRANT_COLLECTION` | Collection name (default: "data") | Match your Qdrant collection |

### Optional Variables (Enhanced Features)

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `VITE_ELEVENLABS_API_KEY` | ElevenLabs voice API key | https://elevenlabs.io/app/settings/api-keys |
| `VITE_ELEVENLABS_VOICE_ID` | Voice ID (default: JBFqnCBsd6RMkjVDRZzb) | ElevenLabs voice library |
| `VITE_SUPABASE_URL` | Supabase project URL | https://app.supabase.com/project/_/settings/api |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Same as above |
| `VITE_SUPABASE_SERVICE_ROLE` | Supabase service role key | Same as above (use with caution) |
| `DATABASE_URL` | PostgreSQL connection string | Not needed for core features |

---

## ✅ Post-Deployment Verification

After deployment, verify:

1. **Application Loads**
   - Visit your deployment URL
   - Landing page displays correctly
   - No console errors

2. **Environment Variables**
   - Check deployment logs for validation output
   - Should show: "✅ Core environment variables configured"
   - No critical errors

3. **Core Features Work**
   - Navigate to "Holy AI Demo"
   - Ask a test question: "What is dharma?"
   - Verify you get a response with sources
   - Check that sources show scores and file names

4. **Voice Features** (if configured)
   - Click microphone icon
   - Grant permissions
   - Speak a question
   - Verify transcription works
   - Listen to voice response

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
# Locally test the build
npm run build

# If it works locally, check hosting platform's Node version
# Required: Node.js 18+
```

**Error: "OPENAI_API_KEY not set"**
- Add environment variable in platform dashboard
- Ensure no typos in variable name
- Verify it's `OPENAI_API_KEY`, not `VITE_OPENAI_API_KEY`

### Runtime Errors

**"Configuration Required" message shown**
- Environment variables not set correctly
- Check platform-specific logs
- Verify variables are available in production environment

**AI not responding / No search results**
- Check `VITE_QDRANT_COLLECTION` matches your collection name
- Verify Qdrant credentials are valid
- Ensure Qdrant instance allows connections from your hosting platform's IPs
- Check if collection has data (use Qdrant UI)

**Voice features not working**
- Verify `VITE_ELEVENLABS_API_KEY` is set
- Check browser microphone permissions
- Review browser console for errors
- Ensure HTTPS is enabled (required for mic access)

### Performance Issues

**Slow responses**
- Check OpenAI API quota and limits
- Verify Qdrant instance performance tier
- Consider upgrading hosting plan

**High API costs**
- Monitor OpenAI usage dashboard
- Implement rate limiting (see code for implementation)
- Reduce embedding batch size if needed

---

## 📊 Monitoring & Logs

### Vercel
```
Dashboard → Project → Deployments → Latest → Functions → Logs
```

### Railway
```
Project → Deployments → View Logs
```

### Render
```
Dashboard → Logs tab (real-time)
```

### Heroku
```bash
heroku logs --tail --app your-app-name
```

---

## 🔧 Build Commands Reference

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build frontend + backend
npm start                # Start production server
npm run check            # TypeScript type checking

# Database (optional)
npm run db:push          # Push schema changes to database
```

---

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., holyai.com)
3. Configure DNS records as shown
4. Wait for DNS propagation (~5-10 minutes)

### Railway / Render / Heroku
Similar process - check their respective documentation for domain setup.

---

## 📈 Next Steps After Deployment

1. **Populate Qdrant with Knowledge Base**
   - Upload your ancient wisdom texts
   - Generate embeddings
   - Verify search quality

2. **Set up Monitoring**
   - Vercel Analytics (free)
   - Sentry for error tracking
   - LogRocket for session replay

3. **Configure CI/CD** (if not automatic)
   - Auto-deploy on git push
   - Run tests before deployment
   - Preview deployments for PRs

4. **Optimize Performance**
   - Enable caching
   - Compress images
   - Code splitting (already configured)

5. **Security Hardening**
   - Set up rate limiting
   - Configure CORS properly
   - Regular API key rotation

---

## 🆘 Getting Help

**Check Logs First:**
- Deployment logs for build errors
- Server logs for runtime errors
- Browser console for frontend errors

**Common Issues:**
- 90% are environment variable problems
- 8% are API key/authentication issues
- 2% are actual code bugs

**Resources:**
- `SECURITY_FIXES.md` - Security setup guide
- `README.md` - Project overview
- Platform-specific documentation

---

## 🎯 Production Ready Checklist

Before going live:

- [ ] All API keys rotated and secure
- [ ] Environment variables set correctly
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Custom domain configured (optional)
- [ ] Error monitoring set up
- [ ] API usage limits configured
- [ ] Rate limiting implemented
- [ ] Backup strategy for Qdrant data
- [ ] User analytics configured (optional)
- [ ] SEO meta tags added (if public)

---

**Your Holy AI app is ready to enlighten the world! 🙏✨**

Last Updated: 2025-10-16 (After security fixes)
