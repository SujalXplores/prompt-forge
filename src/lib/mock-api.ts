import { ENHANCEMENT_TECHNIQUES, OUTPUT_FORMATS } from './ai-config';

// Mock API for development when OpenRouter isn't available
export async function mockEnhancePrompt(
  userPrompt: string,
  technique: string,
  outputFormat: string,
  _model: string
): Promise<ReadableStream<Uint8Array>> {
  const selectedTechnique = ENHANCEMENT_TECHNIQUES.find(t => t.id === technique);
  const selectedFormat = OUTPUT_FORMATS.find(f => f.id === outputFormat);

  if (!selectedTechnique || !selectedFormat) {
    throw new Error('Invalid technique or output format');
  }

  // Simulate a realistic enhanced prompt
  const enhancedContent = `# Enhanced Prompt using ${selectedTechnique.name}

## Analysis
I've analyzed your original prompt and identified several areas for improvement using the ${selectedTechnique.name} technique.

## Original Prompt
${userPrompt}

## Enhanced Version

You are an expert ${getExpertRole(userPrompt)} with extensive experience in ${getDomain(userPrompt)}. 

${applyTechniquePattern(technique, userPrompt)}

### Expected Output Format
${selectedFormat.template}

### Quality Criteria
- Be specific and actionable
- Provide detailed explanations
- Use professional language
- Include relevant examples where appropriate
- Ensure completeness and accuracy

### Context & Constraints
- Consider multiple perspectives
- Address potential edge cases
- Maintain focus on the core objective
- Provide step-by-step guidance when needed

Please proceed with your analysis and provide a comprehensive response following the above guidelines.

---
*Enhanced using ${selectedTechnique.name} technique with ${selectedFormat.name} output format*`;

  // Create a readable stream that simulates typing
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      let index = 0;
      const interval = setInterval(() => {
        if (index >= enhancedContent.length) {
          controller.close();
          clearInterval(interval);
          return;
        }

        // Send chunks of text to simulate streaming
        const chunkSize = Math.random() * 10 + 5; // Random chunk size between 5-15 characters
        const chunk = enhancedContent.slice(index, index + chunkSize);
        controller.enqueue(encoder.encode(chunk));
        index += chunkSize;
      }, 50); // 50ms delay between chunks
    },
  });
}

function getExpertRole(_prompt: string): string {
  const roles = [
    'consultant',
    'analyst',
    'researcher',
    'strategist',
    'advisor',
    'specialist',
    'practitioner',
    'professional',
    'expert',
    'guide',
  ];
  return roles[Math.floor(Math.random() * roles.length)];
}

function getDomain(_prompt: string): string {
  const domains = [
    'this field',
    'the subject matter',
    'relevant methodologies',
    'industry best practices',
    'current trends and developments',
  ];
  return domains[Math.floor(Math.random() * domains.length)];
}

function applyTechniquePattern(technique: string, prompt: string): string {
  switch (technique) {
    case 'chain-of-thought':
      return `Let me approach this step by step:

Step 1: First, I'll analyze the core requirements
Step 2: Then, I'll identify the key components needed
Step 3: Next, I'll structure the information logically
Step 4: Finally, I'll provide a comprehensive response

For the following task: "${prompt}"`;

    case 'few-shot':
      return `Here are some examples to guide your response:

Example 1: [Similar scenario] → [Approach] → [Outcome]
Example 2: [Different context] → [Method] → [Result]
Example 3: [Edge case] → [Solution] → [Benefits]

Now, for your specific task: "${prompt}"`;

    case 'role-based':
      return `As a domain expert, I bring the following perspective and methodology:

- Professional background in relevant areas
- Knowledge of industry standards and best practices
- Experience with similar challenges and solutions
- Understanding of current trends and future directions

For your request: "${prompt}"`;

    case 'zero-shot':
      return `I will provide a direct, comprehensive response to your request.

Task: ${prompt}

I will ensure my response is:`;

    default:
      return `Applying ${technique} technique to enhance your prompt:

Original request: "${prompt}"

Enhanced approach:`;
  }
}
