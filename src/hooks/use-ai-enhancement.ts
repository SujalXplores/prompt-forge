import { useState, useCallback, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { streamText } from 'ai';
import type { ModelConfig, EnhancementTechnique, OutputFormat } from '../lib/ai-config';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

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

const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
});

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


        // Create the AI stream with OpenRouter provider
        const result = streamText({
          model: openrouter(request.model.id),
          prompt: enhancedPrompt,
          temperature: 0.7,
          abortSignal: abortControllerRef.current.signal,
        });

        let fullResponse = '';

        // Stream the response
        for await (const chunk of result.textStream) {
          fullResponse += chunk;
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
