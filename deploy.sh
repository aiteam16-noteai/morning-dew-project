#!/bin/bash

echo "🚀 Deploying Holy.AI..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Choose a deployment platform:"
    echo "   - Vercel: npm install -g vercel && vercel"
    echo "   - Railway: npm install -g @railway/cli && railway up"
    echo "   - Render: Connect GitHub repo and deploy"
    echo ""
    echo "2. Set these environment variables:"
    echo "   - VITE_OPENAI_API_KEY"
    echo "   - VITE_QDRANT_URL"
    echo "   - VITE_QDRANT_API_KEY"
    echo "   - VITE_QDRANT_COLLECTION=data"
    echo "   - VITE_SUPABASE_URL (optional)"
    echo "   - VITE_SUPABASE_ANON_KEY (optional)"
    echo ""
    echo "3. Your app will be available at the provided URL"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
