export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  maxTokens: number;
  costPer1kTokens: number;
  description: string;
}

export interface EnhancementTechnique {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  icon: string;
}

export interface OutputFormat {
  id: string;
  name: string;
  description: string;
  template: string;
}

export interface PromptHistoryItem {
  id: string;
  originalPrompt: string;
  enhancedPrompt: string;
  technique: string;
  model: string;
  outputFormat: string;
  timestamp: Date;
  tokenCount: number;
  charCount: number;
}

export interface EnhanceRequest {
  userPrompt: string;
  system: string;
  model: string;
  technique: string;
  outputFormat: string;
}

export interface UserTier {
  name: string;
  maxRequestsPerMonth: number;
  maxTokensPerRequest: number;
  availableModels: string[];
  features: string[];
}

export const AI_MODELS: Record<string, ModelConfig> = {
  'deepseek/deepseek-chat-v3-0324': {
    id: 'deepseek/deepseek-chat-v3-0324',
    name: 'DeepSeek v3',
    provider: 'DeepSeek',
    maxTokens: 128000,
    costPer1kTokens: 0.00,
    description: '🚀 Advanced reasoning with zero cost',
  },
  'google/gemini-2.5-pro': {
    id: 'google/gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    maxTokens: 1000000,
    costPer1kTokens: 0.0075,
    description: '💎 Premium performance at accessible pricing',
  },
  'anthropic/claude-opus-4.1': {
    id: 'anthropic/claude-opus-4.1',
    name: 'Claude Opus 4.1',
    provider: 'Anthropic',
    maxTokens: 200000,
    costPer1kTokens: 0.015,
    description: '🧠 Ultimate analytical precision for complex tasks',
  },
  'google/gemini-2.5-flash': {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    maxTokens: 1000000,
    costPer1kTokens: 0.002,
    description: '⚡ Lightning-fast responses without compromising quality',
  },
  'anthropic/claude-sonnet-4': {
    id: 'anthropic/claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    maxTokens: 200000,
    costPer1kTokens: 0.003,
    description: '📚 Exceptional context handling for extensive prompts',
  },
};

export const ENHANCEMENT_TECHNIQUES: Record<string, EnhancementTechnique> = {
  'chain-of-thought': {
    id: 'chain-of-thought',
    name: 'Chain of Thought',
    description: 'Step-by-step reasoning and analysis',
    icon: 'RiBrainLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Chain of Thought reasoning.

Guidelines:
1. Analyze the user's intent and break down the task into logical steps
2. Add explicit reasoning steps using "Let me think step by step"
3. Include intermediate reasoning that leads to the final answer
4. Make implicit knowledge explicit
5. Add verification steps where appropriate

Transform the prompt to encourage step-by-step thinking while maintaining the original intent.`,
  },
  'few-shot': {
    id: 'few-shot',
    name: 'Few-Shot Learning',
    description: 'Learning through examples and demonstrations',
    icon: 'RiLightbulbFill',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Few-Shot learning techniques.

Guidelines:
1. Add 2-3 high-quality examples that demonstrate the desired output
2. Each example should show input → reasoning → output format
3. Examples should cover different scenarios or edge cases
4. Use consistent formatting across examples
5. Make the pattern clear and replicable

Transform the prompt to include relevant examples that guide the AI's response.`,
  },
  'zero-shot': {
    id: 'zero-shot',
    name: 'Zero-Shot',
    description: 'Direct instruction without examples',
    icon: 'RiMagicFill',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Zero-Shot techniques.

Guidelines:
1. Make instructions extremely clear and specific
2. Define the role and context explicitly
3. Specify the exact output format and structure
4. Include constraints and requirements
5. Add quality criteria and evaluation metrics

Transform the prompt to be self-contained and crystal clear without needing examples.`,
  },
  'role-based': {
    id: 'role-based',
    name: 'Role-Based',
    description: 'Assign specific expert roles and personas',
    icon: 'RiUserLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Role-Based prompting.

Guidelines:
1. Assign a specific expert role or persona to the AI
2. Include relevant background, expertise, and perspective
3. Define the context and situation clearly
4. Add professional standards and methodologies
5. Include domain-specific language and frameworks

Transform the prompt to leverage expert knowledge and professional perspective.`,
  },
  'meta-prompting': {
    id: 'meta-prompting',
    name: 'Meta-Prompting',
    description: 'Self-reflective and adaptive prompting',
    icon: 'RiRecycleLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Meta-Prompting techniques.

Guidelines:
1. Add self-reflection and critique mechanisms
2. Include iterative improvement instructions
3. Add quality assessment criteria
4. Include error checking and validation steps
5. Make the AI question and refine its own approach

Transform the prompt to be self-improving and adaptive.`,
  },
  'tree-of-thought': {
    id: 'tree-of-thought',
    name: 'Tree of Thought',
    description: 'Explore multiple reasoning paths',
    icon: 'RiNodeTree',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Tree of Thought reasoning.

Guidelines:
1. Encourage exploration of multiple solution paths
2. Add branching points for different approaches
3. Include evaluation criteria for each path
4. Add backtracking and alternative exploration
5. Combine insights from different reasoning branches

Transform the prompt to explore multiple reasoning paths before concluding.`,
  },
  'self-consistency': {
    id: 'self-consistency',
    name: 'Self-Consistency',
    description: 'Multiple reasoning paths with consensus',
    icon: 'RiCheckDoubleLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Self-Consistency techniques.

Guidelines:
1. Generate multiple independent reasoning paths
2. Compare and contrast different approaches
3. Identify consensus and disagreements
4. Add confidence scoring for different solutions
5. Synthesize the most robust answer

Transform the prompt to generate and compare multiple solutions.`,
  },
  'structured-output': {
    id: 'structured-output',
    name: 'Structured Output',
    description: 'Enforce specific output formats and schemas',
    icon: 'RiCodeBoxLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt to ensure structured, formatted output.

Guidelines:
1. Define exact output format and schema
2. Include formatting examples and templates
3. Add validation rules and constraints
4. Specify required fields and optional elements
5. Include error handling for malformed outputs

Transform the prompt to produce consistent, structured responses.`,
  },
};

export const OUTPUT_FORMATS: Record<string, OutputFormat> = {
  text: {
    id: 'text',
    name: 'Plain Text',
    description: 'Natural language response',
    template: 'Provide your response in clear, well-structured plain text.',
  },
  markdown: {
    id: 'markdown',
    name: 'Markdown',
    description: 'Formatted markdown with headers and lists',
    template: `Format your response in Markdown with:
- Clear headers (##, ###)
- Bullet points and numbered lists
- **Bold** and *italic* emphasis
- Code blocks where appropriate
- Tables if needed`,
  },
  json: {
    id: 'json',
    name: 'JSON',
    description: 'Structured JSON object',
    template: `Provide your response as a valid JSON object with this structure:
{
  "summary": "Brief overview",
  "analysis": "Detailed analysis",
  "recommendations": ["item1", "item2"],
  "confidence": 0.95,
  "metadata": {
    "technique": "method_used",
    "timestamp": "ISO_date"
  }
}`,
  },
  xml: {
    id: 'xml',
    name: 'XML',
    description: 'Structured XML format',
    template: `Provide your response as well-formed XML:
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <summary>Brief overview</summary>
  <analysis>Detailed analysis</analysis>
  <recommendations>
    <item>Recommendation 1</item>
    <item>Recommendation 2</item>
  </recommendations>
  <metadata>
    <confidence>0.95</confidence>
    <technique>method_used</technique>
  </metadata>
</response>`,
  },
};

export const USER_TIERS: Record<string, UserTier> = {
  free: {
    name: 'Free',
    maxRequestsPerMonth: 50,
    maxTokensPerRequest: 4000,
    availableModels: ['deepseek-r1', 'gemini-2.5-flash'],
    features: ['Basic enhancement', 'History (7 days)', 'Export'],
  },
  pro: {
    name: 'Pro',
    maxRequestsPerMonth: 1000,
    maxTokensPerRequest: 16000,
    availableModels: ['deepseek-r1', 'gemini-2.5-flash', 'gemini-2.5-pro', 'claude-sonnet-4-0'],
    features: ['All techniques', 'History (30 days)', 'Export', 'Templates', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    maxRequestsPerMonth: -1, // Unlimited
    maxTokensPerRequest: 128000,
    availableModels: Object.keys(AI_MODELS),
    features: ['Unlimited', 'All models', 'Custom techniques', 'API access', 'Team collaboration'],
  },
};
