import { useState, useCallback } from 'react';
import { HolyAIService, ChatRequest, ChatResponse } from '../lib/apiService';

interface UseHolyAIState {
  isLoading: boolean;
  error: string | null;
  lastResponse: ChatResponse | null;
  conversationId: string | null;
}

interface UseHolyAIActions {
  askQuestion: (question: string, options?: Partial<Omit<ChatRequest, 'userId' | 'question' | 'collection'>>) => Promise<ChatResponse>;
  clearError: () => void;
  reset: () => void;
}

interface UseHolyAIResult extends UseHolyAIState, UseHolyAIActions {
  isConfigured: boolean;
  healthStatus: string | null;
  configStatus: ReturnType<typeof HolyAIService.getConfigStatus>;
}

/**
 * React hook for HolyAI chat functionality
 * @param userId - User ID for the session
 * @param collection - Qdrant collection name (optional, uses env default if not provided)
 * @returns Hook result with state and actions
 */
export function useHolyAI(userId: string, collection?: string): UseHolyAIResult {
  const defaultCollection = collection || HolyAIService.getDefaultCollection();
  const [state, setState] = useState<UseHolyAIState>({
    isLoading: false,
    error: null,
    lastResponse: null,
    conversationId: null
  });

  const askQuestion = useCallback(async (
    question: string,
    options?: Partial<Omit<ChatRequest, 'userId' | 'question' | 'collection'>>
  ): Promise<ChatResponse> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await HolyAIService.askQuestion({
        userId,
        question,
        collection: defaultCollection,
        conversationId: state.conversationId,
        ...options
      });

      setState(prev => ({
        ...prev,
        isLoading: false,
        lastResponse: response,
        conversationId: response.conversation_id || prev.conversationId,
        error: null
      }));

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      throw error;
    }
  }, [userId, defaultCollection, state.conversationId]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      lastResponse: null,
      conversationId: null
    });
  }, []);

  const isConfigured = HolyAIService.isConfigured();
  const healthStatus = HolyAIService.checkHealth();
  const configStatus = HolyAIService.getConfigStatus();

  return {
    ...state,
    askQuestion,
    clearError,
    reset,
    isConfigured,
    healthStatus,
    configStatus
  };
}
