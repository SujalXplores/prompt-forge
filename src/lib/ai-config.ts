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

export interface EnhanceRequest {
  userPrompt: string;
  system: string;
  model: string;
  technique: string;
  outputFormat: string;
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
    description: 'A linear reasoning method that breaks down complex tasks into a series of manageable subproblems.',
    icon: 'RiBrainLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Chain of Thought reasoning.

Guidelines:
1. Deconstruct the user's request by outlining a clear, logical progression of steps.
2. Within a <thinking> tag, articulate your step-by-step reasoning process.
3. Make implicit assumptions and knowledge explicit.
4. Include error-checking and verification steps where appropriate.
5. Conclude with a final, synthesized response.

Transform the prompt to encourage this structured, step-by-step thinking.`,
  },
  'few-shot': {
    id: 'few-shot',
    name: 'Few-Shot Learning',
    description: 'A highly effective technique that provides a model with a small number of high-quality examples to guide its behavior.',
    icon: 'RiLightbulbFill',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Few-Shot learning techniques.

Guidelines:
1. Add 2-3 high-quality, representative examples that align precisely with the user's task.
2. Each example should demonstrate the desired input-output pattern clearly.
3. Use consistent formatting, such as XML-like markup or clear delimiters, to separate examples from the main instruction.
4. Examples should cover key patterns or edge cases to guide the AI's response without needing a long-form description.

Transform the prompt to include relevant examples that guide the AI's response.`,
  },
  'zero-shot': {
    id: 'zero-shot',
    name: 'Zero-Shot',
    description: 'The simplest and most cost-effective prompting method, relying solely on the models pre-trained knowledge to generate a response.',
    icon: 'RiMagicFill',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Zero-Shot techniques.

Guidelines:
1. Make instructions exceptionally clear and specific using strong action verbs.
2. Define the AI's role and context explicitly at the beginning.
3. Specify the exact output format, length, and structure.
4. Include all necessary constraints and requirements to prevent ambiguity.

Transform the prompt to be self-contained and crystal clear.`,
  },
  'role-based': {
    id: 'role-based',
    name: 'Role-Based',
    description: 'A powerful technique for "priming" a model to adopt a specific expert identity, tone, and perspective.',
    icon: 'RiUserLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Role-Based prompting.

Guidelines:
1. Assign a specific, gender-neutral expert role or persona to the AI.
2. Define the relevant background, expertise, and perspective of this persona.
3. Explicitly state professional standards, methodologies, and domain-specific language to be used.
4. Clearly separate the role assignment from the primary task using delimiters.

Transform the prompt to leverage expert knowledge and professional perspective.`,
  },
  'meta-prompting': {
    id: 'meta-prompting',
    name: 'Meta-Prompting',
    description: 'A structural technique that guides a model to generate and refine its own prompts, creating a self-improving, adaptive loop.',
    icon: 'RiRecycleLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Meta-Prompting techniques.

Guidelines:
1. Add a self-reflection mechanism that encourages the AI to critique and refine its own initial approach.
2. Instruct the AI to generate an improved, more specific prompt based on this critique.
3. Include iterative improvement instructions and quality assessment criteria for the final output.
4. Add error checking and validation steps to be performed at each stage.

Transform the prompt to be self-improving and adaptive.`,
  },
  'tree-of-thought': {
    id: 'tree-of-thought',
    name: 'Tree of Thought',
    description: 'A branching, non-linear reasoning approach that allows a model to explore multiple solution paths simultaneously.',
    icon: 'RiNodeTree',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Tree of Thought reasoning.

Guidelines:
1. Decompose the problem into a tree of manageable "thoughts."
2. Encourage the exploration of multiple, distinct reasoning paths or hypotheses.
3. For each path, define and apply an evaluation criterion (e.g., coherence, feasibility).
4. Add a mechanism for backtracking and exploring alternative branches if a path fails.
5. Synthesize the most promising insights from different branches to form a robust final answer.

Transform the prompt to explore multiple reasoning paths before concluding.`,
  },
  'self-consistency': {
    id: 'self-consistency',
    name: 'Self-Consistency',
    description: 'A strategy that generates multiple independent reasoning paths and then selects the most consistent answer.',
    icon: 'RiCheckDoubleLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt using Self-Consistency techniques.

Guidelines:
1. Generate at least three independent and distinct reasoning paths to solve the problem.
2. Clearly present each solution path.
3. Compare and contrast the final answers from each path.
4. Identify the consensus solution and synthesize a final, robust answer based on majority agreement.
5. Include a confidence score based on the level of consensus.

Transform the prompt to generate and compare multiple solutions.`,
  },
  'structured-output': {
    id: 'structured-output',
    name: 'Structured Output',
    description: 'A method to enforce specific output formats and schemas for reliable data exchange.',
    icon: 'RiCodeBoxLine',
    systemPrompt: `You are an expert prompt engineer. Your task is to enhance the given prompt to ensure structured, formatted output.

Guidelines:
1. Define the exact output format and schema.
2. Include formatting examples and validation rules.
3. Specify required fields and optional elements.
4. Include error handling for malformed outputs.

Transform the prompt to produce consistent, structured responses.`,
  }
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
    template: `Respond only with a single, valid JSON object, and no other text or explanation.

Your response must follow this structure:
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
    template: `Respond only with a single, well-formed XML response, and no other text or explanation.

Your response must follow this structure:
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
