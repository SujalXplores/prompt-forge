import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { streamText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY, // Note: no VITE_ prefix for server-side
});

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { model, prompt, temperature = 0.7 } = JSON.parse(event.body || '{}');

    if (!model || !prompt) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required parameters: model and prompt' }),
      };
    }

    // Verify API key is available
    if (!process.env.OPENROUTER_API_KEY) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'OpenRouter API key not configured' }),
      };
    }

    // Create the AI stream
    const result = streamText({
      model: openrouter(model),
      prompt,
      temperature,
    });

    let fullResponse = '';
    for await (const chunk of result.textStream) {
      fullResponse += chunk;
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        content: fullResponse,
        usage: result.usage,
      }),
    };
  } catch (error) {
    // Log error for debugging (will be available in Netlify function logs)
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to enhance prompt',
      }),
    };
  }
};
