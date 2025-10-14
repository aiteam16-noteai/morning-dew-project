import React from 'react';
import { HolyAIChat } from '../components/HolyAIChat';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { BookOpen, Brain, Database, MessageSquare, ArrowLeft } from 'lucide-react';

interface HolyAIDemoProps {
  onBack?: () => void;
}

export function HolyAIDemo({ onBack }: HolyAIDemoProps) {
  // In a real app, this would come from authentication
  const userId = 'demo-user-123';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          )}
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Holy AI - Ancient Wisdom, Modern Answers
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
              Ask questions and get answers powered by AI, with context from your knowledge base.
              No HTTP requests needed - everything runs directly in your browser!
            </p>
          </div>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="text-center">
              <Brain className="h-8 w-8 mx-auto text-blue-500" />
              <CardTitle className="text-lg">Direct Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                No separate backend deployment. Functions run directly in the browser.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Database className="h-8 w-8 mx-auto text-green-500" />
              <CardTitle className="text-lg">Vector Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Powered by Qdrant for semantic search and context retrieval.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto text-purple-500" />
              <CardTitle className="text-lg">Conversation Memory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Maintains conversation history with Supabase integration.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <HolyAIChat 
          userId={userId} 
          className="w-full"
        />

        {/* Usage Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Environment Setup</h4>
              <p className="text-sm text-muted-foreground">
                Copy <code className="bg-muted px-1 rounded">env.example</code> to <code className="bg-muted px-1 rounded">.env</code> and configure your API keys.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">2. Install Dependencies</h4>
              <p className="text-sm text-muted-foreground">
                Run <code className="bg-muted px-1 rounded">npm install</code> to install the new dependencies.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Use in Components</h4>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                <div>import {`{ useHolyAI }`} from '../hooks/useHolyAI';</div>
                <div className="mt-1">const {`{ askQuestion, isLoading }`} = useHolyAI('user-id');</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">4. Available Features</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Vector Search</Badge>
                <Badge variant="secondary">Context Retrieval</Badge>
                <Badge variant="secondary">Conversation Memory</Badge>
                <Badge variant="secondary">Error Handling</Badge>
                <Badge variant="secondary">TypeScript Support</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
