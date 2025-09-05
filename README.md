# ⚡ Prompt Forge

<div align="center">

**Transform your prompts into masterpieces with AI-powered enhancement techniques**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-FF6B6B?logo=ai&logoColor=white)](https://openrouter.ai)

*A premium, scalable prompt enhancement studio built with cutting-edge AI technology and modern web development practices*

</div>

---

## 🚀 What is Prompt Forge?

Prompt Forge is an **advanced AI prompt enhancement platform** that transforms your basic prompts into sophisticated, high-performing instructions using proven AI techniques. Whether you're a developer, researcher, content creator, or AI enthusiast, Prompt Forge empowers you to craft prompts that deliver exceptional results.

### ✨ Key Highlights

🎯 **8 Advanced Enhancement Techniques** - From Chain of Thought to Tree of Thought reasoning  
🤖 **5 Premium AI Models** - DeepSeek v3, Gemini 2.5 Pro, Claude Opus 4.1, and more  
📋 **4 Output Formats** - Plain Text, Markdown, JSON, XML with smart templating  
⚡ **Real-time Streaming** - See your prompts enhance live with AI SDK v5  
🎨 **Beautiful UI** - Modern design with AI Elements and shadcn/ui components  
🔐 **Secure Authentication** - Powered by Clerk with seamless user experience

---

## 🎯 Enhancement Techniques

<table>
<tr>
<td width="50%">

### 🧠 **Chain of Thought**
Step-by-step reasoning for complex problems with logical progression and error-checking.

### 💡 **Few-Shot Learning**
Learn from 2-3 high-quality examples that demonstrate the desired input-output pattern.

### ⚡ **Zero-Shot**
Direct, crystal-clear instructions without examples for immediate results.

### 👤 **Role-Based**
AI adopts specific expert personas with professional methodologies and domain knowledge.

</td>
<td width="50%">

### 🔄 **Meta-Prompting**
Self-improving prompts that critique and refine their own approach iteratively.

### 🌳 **Tree of Thought**
Explore multiple reasoning paths simultaneously, backtrack, and synthesize the best insights.

### ✅ **Self-Consistency**
Generate multiple solutions and pick the consensus answer with confidence scoring.

### 📋 **Structured Output**
Enforce specific schemas and formats with validation rules and error handling.

</td>
</tr>
</table>

---

## 🤖 AI Models

| Model | Provider | Context | Cost/1k | Specialty |
|-------|----------|---------|---------|-----------|
| **DeepSeek v3** | DeepSeek | 128k | FREE 🎉 | Advanced reasoning |
| **Gemini 2.5 Pro** | Google | 1M | $0.0075 | Premium performance |
| **Claude Opus 4.1** | Anthropic | 200k | $0.015 | Analytical precision |
| **Gemini 2.5 Flash** | Google | 1M | $0.002 | Lightning-fast |
| **Claude Sonnet 4** | Anthropic | 200k | $0.003 | Context handling |

---

## �️ Architecture & Tech Stack

<div align="center">

### Frontend Stack
**React 19** • **TypeScript** • **Vite** • **Tailwind CSS**

### UI & Animation
**Vercel AI Elements** • **shadcn/ui** • **Motion** • **Remix Icons**

### AI & Backend
**AI SDK v5** • **OpenRouter** • **Streaming** • **Real-time Enhancement**

### Authentication & State
**Clerk** • **TanStack Query** • **React Hook Form** • **Custom Hooks**

</div>

---

## � Quick Start

### Prerequisites
- **Node.js 18+** and **pnpm**
- **OpenRouter API key** ([Get one here](https://openrouter.ai))
- **Clerk account** ([Free tier available](https://clerk.com))

### 1️⃣ Clone & Install
```bash
git clone https://github.com/SujalXplores/prompt-forge.git
cd prompt-forge
pnpm install
```

### 2️⃣ Environment Setup
```bash
# Copy environment template
cp .env.example .env
```

Add your keys to `.env`:
```env
# OpenRouter API Configuration
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

### 3️⃣ Launch Application
```bash
# Start development server
pnpm dev

# Visit http://localhost:5173
```

That's it! 🎉 You're ready to forge amazing prompts!

---

## 💫 Features in Action

### 🎨 **Modern Interface**
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Dark/Light Theme** - Automatic system detection with manual toggle
- **Real-time Streaming** - Watch prompts enhance live with smooth animations
- **Intelligent Layout** - Split-screen workspace with configuration panel

### 🔧 **Smart Configuration**
- **Model Selection** - Choose from 5 premium AI models with cost optimization
- **Technique Picker** - 8 enhancement methods with detailed descriptions
- **Output Formatting** - Text, Markdown, JSON, XML with schema validation
- **Custom Instructions** - Add your own enhancement guidelines

### ⚡ **Performance Features**
- **Streaming Responses** - Real-time text generation with cancellation support
- **Error Handling** - Graceful fallbacks and informative error messages
- **Token Optimization** - Smart prompt construction to minimize costs
- **Abort Control** - Cancel long-running enhancements anytime

---

## 🎯 Usage Examples

### Basic Enhancement
```bash
Input: "Write a blog post about AI"

Enhanced (Chain of Thought):
"As an expert content writer with 10+ years of experience in technology journalism, 
create a comprehensive blog post about AI following this structure:

<thinking>
1. Identify target audience (tech-savvy professionals, beginners, or mixed)
2. Determine key AI topics to cover (current state, applications, challenges)
3. Plan logical flow from introduction to conclusion
4. Consider recent developments and trends
</thinking>

Write a 1500-word blog post that:
- Opens with a compelling hook about AI's current impact
- Covers 3-4 main applications with specific examples
- Addresses common misconceptions
- Concludes with future implications
- Uses accessible language with technical accuracy
- Includes data and statistics where relevant"
```

### Structured Output
```json
{
  "summary": "Enhanced prompt with clear structure and expert persona",
  "improvements": [
    "Added expert role assignment",
    "Included structured thinking process", 
    "Specified word count and format",
    "Added quality criteria"
  ],
  "confidence": 0.95,
  "technique": "chain-of-thought"
}
```

---

## 🌐 Deployment

### 🚀 **Vercel (Recommended)**
1. **Connect Repository** - Link your GitHub repo to Vercel
2. **Configure Environment** - Add your API keys in Vercel dashboard
3. **Deploy** - Zero-config deployment with automatic builds

```bash
# Deploy via Vercel CLI
npx vercel --prod
```

### 🌟 **Alternative Platforms**
- **Netlify** - With serverless functions support
- **Railway** - Full-stack deployment platform  
- **Render** - Auto-deploy from Git
- **Any Node.js Host** - Platform-agnostic design

---

## ⚙️ Configuration

### 🎛️ **Model Configuration**
Customize available models in `src/lib/ai-config.ts`:

```typescript
export const AI_MODELS: Record<string, ModelConfig> = {
  'custom/model': {
    id: 'custom/model',
    name: 'Custom Model',
    provider: 'Custom',
    maxTokens: 100000,
    costPer1kTokens: 0.01,
    description: '🚀 Your custom model description',
  },
  // Add more models...
};
```

### 🧠 **Enhancement Techniques**
Add custom techniques:

```typescript
export const ENHANCEMENT_TECHNIQUES: Record<string, EnhancementTechnique> = {
  'custom-technique': {
    id: 'custom-technique',
    name: 'Custom Technique',
    description: 'Your innovative enhancement method',
    icon: 'RiMagicFill',
    systemPrompt: `You are a specialist in...
    Your custom enhancement instructions here...`,
  },
};
```

### 📋 **Output Formats**
Create custom output templates:

```typescript
export const OUTPUT_FORMATS: Record<string, OutputFormat> = {
  'custom': {
    id: 'custom',
    name: 'Custom Format',
    description: 'Your structured format',
    template: `Respond with your custom structure:
    - Field 1: Value
    - Field 2: Value`,
  },
};
```

---

## 🔧 Development

### 📁 **Project Structure**
```
src/
├── components/
│   ├── ai-elements/        # AI-powered UI components
│   ├── auth/              # Authentication components  
│   ├── enhancement/       # Core prompt enhancement features
│   ├── layout/            # App layout components
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & configurations
└── pages/                 # Application pages

Key Files:
├── ai-config.ts          # Models, techniques, formats
├── system-prompts.ts     # Enhancement instructions
└── use-ai-enhancement.ts # Core enhancement logic
```

### 🛠️ **Development Commands**
```bash
# Start development
pnpm dev

# Type checking
pnpm type-check

# Linting & formatting
pnpm lint
pnpm format

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run all validations
pnpm validate
```

### 🧪 **Adding Features**

#### 1. **New Enhancement Technique**
```typescript
// Add to src/lib/ai-config.ts
'your-technique': {
  id: 'your-technique',
  name: 'Your Technique',
  description: 'What it does',
  icon: 'RiIcon',
  systemPrompt: `Your enhancement logic...`,
}
```

#### 2. **Custom UI Component**
```tsx
// src/components/enhancement/YourComponent.tsx
import { useAIEnhancement } from '@/hooks/use-ai-enhancement';

export function YourComponent() {
  const { enhance, isEnhancing } = useAIEnhancement();
  // Your component logic
}
```

#### 3. **New Hook**
```typescript
// src/hooks/use-your-feature.ts
import { useState, useCallback } from 'react';

export function useYourFeature() {
  // Your custom hook logic
}
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 🚀 **Quick Contribution**
1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### � **Contribution Guidelines**
- **Follow TypeScript** best practices
- **Use existing hooks** and components when possible
- **Add tests** for new functionality
- **Update documentation** for API changes
- **Follow the existing** code style and structure

### 🐛 **Bug Reports**
Found a bug? Please include:
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Browser and OS information**
- **Screenshots** if applicable

---

## �📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support & Community

<div align="center">

### Get Help & Stay Connected

[![GitHub Issues](https://img.shields.io/badge/Issues-GitHub-orange?logo=github)](https://github.com/SujalXplores/prompt-forge/issues)
[![Discussions](https://img.shields.io/badge/Discussions-GitHub-blue?logo=github)](https://github.com/SujalXplores/prompt-forge/discussions)
[![Email](https://img.shields.io/badge/Email-Contact-red?logo=gmail)](mailto:sujal@promptforge.dev)

</div>

- 🐛 **Bug Reports** - [GitHub Issues](https://github.com/SujalXplores/prompt-forge/issues)
- 💬 **Feature Requests** - [GitHub Discussions](https://github.com/SujalXplores/prompt-forge/discussions)
- � **Documentation** - [Coming Soon]
- 📧 **Email Support** - sujal@promptforge.dev

---

## 🙏 Acknowledgments

Special thanks to the amazing tools and services that make Prompt Forge possible:

<div align="center">

**[OpenRouter](https://openrouter.ai)** • **[Clerk](https://clerk.com)** • **[Vercel](https://vercel.com)** • **[shadcn/ui](https://ui.shadcn.com)**

**[Tailwind CSS](https://tailwindcss.com)** • **[Motion](https://motion.dev)** • **[React](https://react.dev)** • **[TypeScript](https://typescriptlang.org)**

</div>

---

<div align="center">

**Built with ❤️ by [Sujal Singh](https://github.com/SujalXplores)**

*Transform your prompts. Amplify your results. Forge the future of AI.*

[![GitHub Stars](https://img.shields.io/github/stars/SujalXplores/prompt-forge?style=social)](https://github.com/SujalXplores/prompt-forge)
[![GitHub Forks](https://img.shields.io/github/forks/SujalXplores/prompt-forge?style=social)](https://github.com/SujalXplores/prompt-forge)

</div>
