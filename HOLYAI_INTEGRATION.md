# HolyAI Backend Integration

This document explains how the HolyAI backend has been integrated directly into the frontend application.

## 🚀 **What's Been Integrated**

The HolyAI backend functionality has been converted from a separate Node.js service to direct function calls within the React frontend:

- **Vector Search**: Qdrant integration for semantic search
- **AI Chat**: OpenAI GPT integration for intelligent responses  
- **Context Retrieval**: Knowledge base context for better answers
- **Conversation Memory**: Supabase integration for chat history
- **TypeScript Support**: Full type safety throughout

## 📁 **New Files Added**

### Core Backend Files (Converted to TypeScript)
- `client/src/lib/supabaseHelpers.ts` - Supabase client utilities
- `client/src/lib/chatGraph.ts` - Main chat functionality with vector search
- `client/src/lib/apiService.ts` - Service layer for easy integration

### React Integration
- `client/src/hooks/useHolyAI.ts` - React hook for chat functionality
- `client/src/components/HolyAIChat.tsx` - Complete chat UI component
- `client/src/pages/HolyAIDemo.tsx` - Demo page showing integration

### Configuration
- `env.example` - Environment variables template
- `HOLYAI_INTEGRATION.md` - This documentation

## 🔧 **Setup Instructions**

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `env.example` to `.env` and configure:

```env
# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_OPENAI_EMBED_MODEL=text-embedding-3-small
VITE_OPENAI_CHAT_MODEL=gpt-4o-mini

# Qdrant Configuration  
VITE_QDRANT_URL=http://localhost:6333
VITE_QDRANT_API_KEY=your_qdrant_api_key_here
VITE_QDRANT_COLLECTION=documents

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Run the Application
```bash
npm run dev
```

## 💻 **Usage Examples**

### Basic Usage with Hook
```typescript
import { useHolyAI } from '../hooks/useHolyAI';

function MyComponent() {
  const { askQuestion, isLoading, error, lastResponse } = useHolyAI('user-123');
  
  const handleAsk = async () => {
    const response = await askQuestion('What is the meaning of life?');
    console.log(response.answer);
  };
  
  return (
    <div>
      <button onClick={handleAsk} disabled={isLoading}>
        {isLoading ? 'Thinking...' : 'Ask Question'}
      </button>
      {lastResponse && <p>{lastResponse.answer}</p>}
    </div>
  );
}
```

### Using the Complete Chat Component
```typescript
import { HolyAIChat } from '../components/HolyAIChat';

function MyPage() {
  return (
    <HolyAIChat 
      userId="user-123" 
      collection="documents"
      className="w-full max-w-2xl"
    />
  );
}
```

### Direct Service Usage
```typescript
import { HolyAIService } from '../lib/apiService';

const response = await HolyAIService.askQuestion({
  userId: 'user-123',
  question: 'What is wisdom?',
  collection: 'documents',
  k: 6
});
```

## 🎯 **Key Features**

### ✅ **No HTTP Requests**
- All backend functionality runs directly in the browser
- No separate backend deployment needed
- Faster response times

### ✅ **TypeScript Support**
- Full type safety throughout
- IntelliSense support
- Compile-time error checking

### ✅ **React Integration**
- Custom hooks for easy state management
- Pre-built UI components
- Error handling and loading states

### ✅ **Configuration Management**
- Environment variable validation
- Health checks for all services
- Debug information for troubleshooting

## 🔍 **API Reference**

### `useHolyAI(userId, collection?)`
React hook that provides:
- `askQuestion(question, options?)` - Ask a question
- `isLoading` - Loading state
- `error` - Error message
- `lastResponse` - Last response data
- `clearError()` - Clear error state
- `reset()` - Reset all state

### `HolyAIService`
Static service class with:
- `askQuestion(request)` - Ask a question
- `isConfigured()` - Check if properly configured
- `checkHealth()` - Check service health
- `getConfigStatus()` - Get configuration status

## 🚨 **Important Notes**

1. **Environment Variables**: All environment variables must be prefixed with `VITE_` to be accessible in the browser
2. **API Keys**: Keep your API keys secure and never commit them to version control
3. **CORS**: Ensure your Qdrant and Supabase instances allow browser requests
4. **Bundle Size**: The integration adds some dependencies, monitor your bundle size

## 🐛 **Troubleshooting**

### Configuration Issues
Check the configuration status:
```typescript
const { getConfigStatus } = useHolyAI('user-123');
console.log(getConfigStatus());
```

### Health Checks
Verify service connections:
```typescript
const { checkHealth } = useHolyAI('user-123');
console.log(checkHealth()); // Should return "ok" or null
```

### Common Issues
- **Missing API Keys**: Check your `.env` file
- **CORS Errors**: Configure your services to allow browser requests
- **Network Issues**: Ensure Qdrant and Supabase are accessible

## 🎉 **Demo**

Visit the "Try Holy AI Chat" button on the dashboard to see the integration in action!
