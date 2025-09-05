import { useState, useCallback, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { openrouter } from '../lib/openrouter';
import { streamText } from 'ai';
import type { ModelConfig, EnhancementTechnique, OutputFormat } from '../lib/ai-config';

// Create a configured OpenRouter provider
const _createOpenRouterModel = (modelId: string) => {
  // Set the API key globally for OpenRouter
  if (typeof window !== 'undefined' && import.meta.env.VITE_OPENROUTER_API_KEY) {
    // For client-side, we need to use a different approach
    return openrouter(modelId);
  }
  return openrouter(modelId);
};

export interface EnhancementRequest {
  content: string;
  model: ModelConfig;
  technique: EnhancementTechnique;
  outputFormat: OutputFormat;
  customInstructions?: string;
}

export interface EnhancementResult {
  enhanced: string;
  originalLength: number;
  enhancedLength: number;
  model: string;
  technique: string;
  timestamp: Date;
  tokensUsed?: number;
}

export function useAIEnhancement() {
  const { user } = useUser();
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedContent, setEnhancedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const enhance = useCallback(
    async (request: EnhancementRequest): Promise<EnhancementResult | null> => {
      if (!user) {
        setError('Please sign in to use AI enhancement');
        return null;
      }

      try {
        setIsEnhancing(true);
        setError(null);
        setEnhancedContent('');

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        // Build the enhanced prompt
        let enhancedPrompt = request.technique.systemPrompt + '\n\n';
        enhancedPrompt += `Original prompt to enhance:\n"${request.content}"\n\n`;
        enhancedPrompt += `Output format instructions:\n${request.outputFormat.template}\n\n`;

        if (request.customInstructions) {
          enhancedPrompt += `Additional instructions:\n${request.customInstructions}\n\n`;
        }

        enhancedPrompt += 'Please provide the enhanced version following all guidelines above.';

        // Validate API key
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!apiKey) {
          throw new Error(
            'OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your environment variables.'
          );
        }

        // Create the AI stream directly (API key is set globally in openrouter.ts)
        const result = await streamText({
          model: openrouter(request.model.id),
          prompt: enhancedPrompt,
          temperature: 0.7,
          abortSignal: abortControllerRef.current.signal,
        });

        let fullResponse = '';

        // Stream the response
        for await (const textPart of result.textStream) {
          fullResponse += textPart;
          setEnhancedContent(fullResponse);
        }

        const enhancementResult: EnhancementResult = {
          enhanced: fullResponse,
          originalLength: request.content.length,
          enhancedLength: fullResponse.length,
          model: request.model.name,
          technique: request.technique.name,
          timestamp: new Date(),
        };

        return enhancementResult;
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          // Enhancement cancelled by user
          return null;
        }

        const errorMessage = error instanceof Error ? error.message : 'Failed to enhance prompt';
        setError(errorMessage);
        // Enhancement error logged to state
        return null;
      } finally {
        setIsEnhancing(false);
        abortControllerRef.current = null;
      }
    },
    [user]
  );

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const reset = useCallback(() => {
    setEnhancedContent('');
    setError(null);
    cancel();
  }, [cancel]);

  return {
    enhance,
    cancel,
    reset,
    isEnhancing,
    enhancedContent,
    error,
  };
}

// Hook for managing prompt history
export function usePromptHistory() {
  const [history, setHistory] = useState<EnhancementResult[]>([]);

  const addToHistory = useCallback((result: EnhancementResult) => {
    setHistory(prev => [result, ...prev.slice(0, 49)]); // Keep last 50 items
  }, []);

  const saveToHistory = useCallback(
    (historyItem: {
      originalPrompt: string;
      enhancedPrompt: string;
      technique: string;
      model: string;
      outputFormat: string;
    }) => {
      const result: EnhancementResult = {
        enhanced: historyItem.enhancedPrompt,
        originalLength: historyItem.originalPrompt.length,
        enhancedLength: historyItem.enhancedPrompt.length,
        model: historyItem.model,
        technique: historyItem.technique,
        timestamp: new Date(),
      };

      addToHistory(result);

      // Save to localStorage
      try {
        const savedHistory = localStorage.getItem('promptforge-history');
        const existingHistory = savedHistory ? JSON.parse(savedHistory) : [];
        const newHistory = [result, ...existingHistory.slice(0, 49)];
        localStorage.setItem('promptforge-history', JSON.stringify(newHistory));
      } catch {
        // Error saving history - silently fail to not disrupt user experience
      }
    },
    [addToHistory]
  );

  const loadHistory = useCallback(() => {
    try {
      const savedHistory = localStorage.getItem('promptforge-history');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      }
    } catch {
      // Error loading history - silently fail and continue with empty history
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('promptforge-history');
    } catch {
      // Error clearing history - silently fail
    }
  }, []);

  const removeFromHistory = useCallback((index: number) => {
    setHistory(prev => {
      const newHistory = prev.filter((_, i) => i !== index);
      try {
        localStorage.setItem('promptforge-history', JSON.stringify(newHistory));
      } catch {
        // Error saving history - silently fail
      }
      return newHistory;
    });
  }, []);

  return {
    history,
    addToHistory,
    saveToHistory,
    loadHistory,
    clearHistory,
    removeFromHistory,
  };
}

// Hook for usage statistics
export function useUsageStats() {
  const [stats, setStats] = useState({
    promptsEnhanced: 0,
    tokensUsed: 0,
    totalCharacters: 0,
    averageEnhancementTime: 0,
    favoriteModel: '',
    favoriteTechnique: '',
    usagePercentage: 0,
    monthlyLimit: 1000, // Free tier limit
  });

  const updateStats = useCallback((result: EnhancementResult, enhancementTime: number) => {
    setStats(prev => {
      const newPromptsEnhanced = prev.promptsEnhanced + 1;
      const newTokensUsed = prev.tokensUsed + (result.tokensUsed || 0);
      const newUsagePercentage = (newPromptsEnhanced / prev.monthlyLimit) * 100;

      const newStats = {
        promptsEnhanced: newPromptsEnhanced,
        tokensUsed: newTokensUsed,
        totalCharacters: prev.totalCharacters + result.enhancedLength,
        averageEnhancementTime:
          (prev.averageEnhancementTime * prev.promptsEnhanced + enhancementTime) /
          newPromptsEnhanced,
        favoriteModel: result.model, // Simple implementation - could be more sophisticated
        favoriteTechnique: result.technique,
        usagePercentage: Math.min(newUsagePercentage, 100),
        monthlyLimit: prev.monthlyLimit,
      };

      // Save to localStorage
      try {
        localStorage.setItem('promptforge-stats', JSON.stringify(newStats));
      } catch {
        // Error saving stats - silently fail
      }

      return newStats;
    });
  }, []);

  const resetStats = useCallback(() => {
    setStats({
      promptsEnhanced: 0,
      tokensUsed: 0,
      totalCharacters: 0,
      averageEnhancementTime: 0,
      favoriteModel: '',
      favoriteTechnique: '',
      usagePercentage: 0,
      monthlyLimit: 1000,
    });
  }, []);

  const loadStats = useCallback(() => {
    // In a real app, this would load from localStorage or API
    const savedStats = localStorage.getItem('promptforge-stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch {
        // Error loading stats - silently fail and use default stats
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  const saveStats = useCallback((newStats: typeof stats) => {
    try {
      localStorage.setItem('promptforge-stats', JSON.stringify(newStats));
    } catch {
      // Error saving stats - silently fail
    }
  }, []);

  return {
    stats,
    updateStats,
    resetStats,
    loadStats,
    saveStats,
  };
}
