import { useState, useCallback, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import type { ModelConfig, EnhancementTechnique, OutputFormat } from '../lib/ai-config';

interface EnhancementRequest {
  content: string;
  model: ModelConfig;
  technique: EnhancementTechnique;
  outputFormat: OutputFormat;
  customInstructions?: string;
}

interface EnhancementResult {
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

        // Call our serverless function instead of OpenRouter directly
        const response = await fetch('/api/enhance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: request.model.id,
            prompt: enhancedPrompt,
            temperature: 0.7,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to enhance prompt');
        }

        const result = await response.json();
        const fullResponse = result.content;
        
        // Set the enhanced content
        setEnhancedContent(fullResponse);

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
