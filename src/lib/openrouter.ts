import { openrouter } from '@openrouter/ai-sdk-provider';

// Set global OpenRouter configuration for browser environment
if (typeof window !== 'undefined') {
  // Polyfill process.env for browser environment
  if (typeof globalThis.process === 'undefined') {
    globalThis.process = {} as NodeJS.Process;
  }
  if (typeof globalThis.process.env === 'undefined') {
    globalThis.process.env = {} as NodeJS.ProcessEnv;
  }

  // Set the API key from Vite environment
  globalThis.process.env.OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
}

export { openrouter };
