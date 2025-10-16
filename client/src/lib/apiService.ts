import { answerWithContext, healthcheck } from './chatGraph';

export interface ChatResponse {
  answer: string;
  contexts: Array<{
    text: string;
    score: number;
    source?: string;
    file_name?: string;
    point_id?: string;
  }>;
  messages: Array<{
    role: string;
    content: string;
  }>;
  conversation_id: string | null;
}

export interface ChatRequest {
  userId: string;
  question: string;
  collection: string;
  conversationId?: string | null;
  k?: number;
  scoreThreshold?: number | null;
  embedModel?: string | null;
  chatModel?: string | null;
}

/**
 * API Service for HolyAI chat functionality
 * Provides direct function calls without HTTP requests
 */
export class HolyAIService {
  /**
   * Answer a question with context from the knowledge base
   * @param request - Chat request parameters
   * @returns Promise<ChatResponse> - Response with answer and context
   */
  static async askQuestion(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await answerWithContext(
        request.userId,
        request.question,
        request.collection,
        request.conversationId || null,
        request.k || 6,
        request.scoreThreshold || null,
        request.embedModel || null,
        request.chatModel || null
      );
      
      return response;
    } catch (error) {
      console.error('Error asking question:', error);
      throw new Error(`Failed to get answer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the default collection name from environment
   * @returns string - Collection name from env or default
   */
  static getDefaultCollection(): string {
    return import.meta.env.VITE_QDRANT_COLLECTION || 'data';
  }

  /**
   * Check if the service is properly configured
   * @returns boolean - true if service is ready
   * Note: OpenAI is now backend-only, so we only check Qdrant and ElevenLabs frontend configs
   */
  static isConfigured(): boolean {
    // Frontend only needs ElevenLabs for voice features
    // OpenAI and Qdrant are handled by backend
    const elevenLabsKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

    // Debug logging
    console.log('🔍 Checking frontend configuration:');
    console.log('VITE_ELEVENLABS_API_KEY:', elevenLabsKey ? 'SET' : 'NOT SET');

    // Service is configured if backend is available (we'll check this via health endpoint)
    const result = true; // Backend handles OpenAI/Qdrant, frontend always ready
    console.log('✅ Configuration result:', result);
    return result;
  }

  /**
   * Check Supabase connection health
   * @returns string | null - "ok" if connected, null otherwise
   */
  static checkHealth(): string | null {
    return healthcheck();
  }

  /**
   * Get configuration status for debugging
   * @returns object with configuration status
   */
  static getConfigStatus() {
    return {
      openai: true, // Handled by backend
      qdrant: true, // Handled by backend
      qdrantCollection: import.meta.env.VITE_QDRANT_COLLECTION || 'data',
      elevenLabs: !!import.meta.env.VITE_ELEVENLABS_API_KEY,
      supabase: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
      supabaseOptional: true, // Supabase is optional for core functionality
      configured: this.isConfigured()
    };
  }
}

/**
 * Hook for using HolyAI service in React components
 * @param userId - User ID for the session
 * @param collection - Qdrant collection name (optional, uses env default if not provided)
 * @returns Object with service methods and state
 */
export function useHolyAI(userId: string, collection?: string) {
  const defaultCollection = collection || HolyAIService.getDefaultCollection();
  
  const askQuestion = async (
    question: string,
    options?: Partial<Omit<ChatRequest, 'userId' | 'question' | 'collection'>>
  ): Promise<ChatResponse> => {
    return HolyAIService.askQuestion({
      userId,
      question,
      collection: defaultCollection,
      ...options
    });
  };

  const checkHealth = () => HolyAIService.checkHealth();
  const isConfigured = () => HolyAIService.isConfigured();
  const getConfigStatus = () => HolyAIService.getConfigStatus();

  return {
    askQuestion,
    checkHealth,
    isConfigured,
    getConfigStatus
  };
}
