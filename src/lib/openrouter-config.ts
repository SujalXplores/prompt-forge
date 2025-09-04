import { openrouter } from '@openrouter/ai-sdk-provider';

// Function to create OpenRouter model with API key
export const createOpenRouterModel = (modelId: string) => {
  return openrouter(modelId, {
    // The API key will be automatically read from OPENROUTER_API_KEY environment variable
    // or we can pass it through headers in the streamText call
  });
};

export { openrouter };
