# 🚀 Holy.AI Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/nxtr-admin-it/Desktop/aiteam/morning-dew-project
vercel

# Follow prompts:
# - Link to existing project or create new
# - Build command: npm run build
# - Output directory: dist/public
```

**Environment Variables to set in Vercel Dashboard:**
```
VITE_OPENAI_API_KEY=your_openai_key
VITE_QDRANT_URL=your_qdrant_url
VITE_QDRANT_API_KEY=your_qdrant_key
VITE_QDRANT_COLLECTION=data
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### 2. Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
cd /Users/nxtr-admin-it/Desktop/aiteam/morning-dew-project
railway login
railway init
railway up
```

### 3. Render

1. Connect GitHub repo to Render
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

## Environment Variables Required

```env
# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-proj-...
VITE_OPENAI_EMBED_MODEL=text-embedding-3-small
VITE_OPENAI_CHAT_MODEL=gpt-4o-mini
VITE_OPENAI_BATCH_SIZE=96

# Qdrant Configuration
VITE_QDRANT_URL=https://your-cluster.eu-west-2-0.aws.cloud.qdrant.io
VITE_QDRANT_API_KEY=your_qdrant_api_key
VITE_QDRANT_COLLECTION=data

# Supabase Configuration (Optional)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE=your_supabase_service_role

# ElevenLabs Configuration (for voice features)
ELEVENLABS_API_KEY=sk_c05da3cf513e18ec154c9c5347f40d010ffdd08626f3d6e9
```

## Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

## Features Included

✅ **Holy.AI Guru Interface** - Ancient wisdom for modern answers
✅ **Voice Input/Output** - Speech-to-text and text-to-speech
✅ **Vector Search** - Qdrant integration for context
✅ **AI Responses** - OpenAI GPT-4o-mini integration
✅ **Conversation Memory** - Supabase integration
✅ **Real-time Audio** - ElevenLabs voice synthesis

## Troubleshooting

### CORS Issues
- Make sure Qdrant allows browser requests
- Check API key permissions

### Voice Features Not Working
- Verify ElevenLabs API key
- Check browser microphone permissions

### Build Errors
- Ensure all environment variables are set
- Check Node.js version (18+ recommended)

## Support

For issues, check:
1. Browser console for errors
2. Server logs for API errors
3. Environment variable configuration
4. API key permissions
