import React, { useState } from 'react';
import { useHolyAI } from '../hooks/useHolyAI';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Loader2, Send, AlertCircle, CheckCircle } from 'lucide-react';

interface HolyAIChatProps {
  userId: string;
  collection?: string;
  className?: string;
}

export function HolyAIChat({ userId, collection, className }: HolyAIChatProps) {
  const [question, setQuestion] = useState('');
  const { 
    askQuestion, 
    isLoading, 
    error, 
    lastResponse, 
    clearError, 
    isConfigured, 
    healthStatus,
    configStatus 
  } = useHolyAI(userId, collection);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    try {
      await askQuestion(question);
      setQuestion('');
    } catch (err) {
      // Error is handled by the hook
      console.error('Failed to ask question:', err);
    }
  };

  if (!isConfigured) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Configuration Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please configure the following environment variables:
              <ul className="mt-2 space-y-1 text-sm">
                <li>• VITE_OPENAI_API_KEY: {configStatus.openai ? '✅' : '❌'}</li>
                <li>• VITE_QDRANT_URL: {configStatus.qdrant ? '✅' : '❌'}</li>
                <li>• VITE_QDRANT_COLLECTION: {configStatus.qdrantCollection} (default: documents)</li>
                <li>• VITE_SUPABASE_URL: {configStatus.supabase ? '✅' : '❌'} (Optional)</li>
                <li>• VITE_SUPABASE_ANON_KEY: {configStatus.supabase ? '✅' : '❌'} (Optional)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Holy AI Chat
          {healthStatus && (
            <Badge variant="outline" className="ml-auto">
              {healthStatus}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about ancient wisdom..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !question.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              {error}
              <Button variant="outline" size="sm" onClick={clearError}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {lastResponse && (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-semibold mb-2">Answer:</h4>
              <p className="text-sm">{lastResponse.answer}</p>
            </div>

            {lastResponse.contexts.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Sources ({lastResponse.contexts.length}):</h4>
                <div className="space-y-2">
                  {lastResponse.contexts.map((context, index) => (
                    <div key={index} className="rounded border p-3 text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="secondary" className="text-xs">
                          Score: {context.score.toFixed(3)}
                        </Badge>
                        {context.file_name && (
                          <Badge variant="outline" className="text-xs">
                            {context.file_name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{context.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lastResponse.conversation_id && (
              <div className="text-xs text-muted-foreground">
                Conversation ID: {lastResponse.conversation_id}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
