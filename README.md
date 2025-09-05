# Prompt Forge 🧙‍♂️

A premium, scalable prompt enhancement application that transforms your prompts using AI-powered techniques and professional engineering practices, built with Vercel AI Elements.

![PromptForge Preview](https://your-image-url.com/preview.png)

## ✨ Features

### 🤖 AI-Powered Enhancement

- **Vercel AI Elements** integration for polished chat interfaces
- **Real-time streaming** responses using Vercel AI SDK v5
- **Multiple AI models** via OpenRouter (GPT-4o, Claude 3.5, Gemini Pro, Llama 3.1)
- **8 enhancement techniques**: Chain of Thought, Few-Shot, Zero-Shot, Role-Based, Meta-Prompting, Tree of Thought, Self-Consistency, Structured Output
- **4 output formats**: Plain Text, Markdown, JSON, XML

### 🎨 Modern UI Components

- **AI Elements** - Pre-built polished components (Message, Response, PromptInput, Actions, etc.)
- **shadcn/ui** components with glassmorphism design
- **Dark/light theme** support with system detection
- **Framer Motion animations** for smooth interactions
- **Responsive design** for all screen sizes
- **Real-time token/character counting**

### 📊 Advanced Features

- **Prompt history** with save/load functionality
- **Usage analytics** and monthly limits
- **Export capabilities** (TXT, JSON)
- **Streaming enhancements** with cancel support
- **Copy to clipboard** functionality

## 🚀 Tech Stack

| Category             | Technology                      |
| -------------------- | ------------------------------- |
| **Frontend**         | React 19, TypeScript, Vite      |
| **UI Components**    | Vercel AI Elements, shadcn/ui   |
| **Styling**          | Tailwind CSS                    |
| **Animation**        | Framer Motion                   |
| **Authentication**   | Clerk React SDK                 |
| **AI Integration**   | Vercel AI SDK v5, OpenRouter    |
| **State Management** | React Hook Form, TanStack Query |
| **Icons**            | Remix Icons, Lucide Icons       |
| **Notifications**    | Sonner                          |

## 🎨 AI Elements Integration

This application leverages Vercel AI Elements for a polished chat interface:

- **Message Components**: Styled user and assistant messages with avatars
- **Response**: Streamdown-powered markdown rendering
- **PromptInput**: Enhanced input with model selection and toolbars
- **Actions**: Copy, save, export buttons with tooltips
- **Suggestions**: Quick-start prompt suggestions
- **Loader**: Animated loading indicators

## 📋 Prerequisites

- Node.js 18+ and pnpm
- OpenRouter API key
- Clerk account (free tier available)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/prompt-forge.git
   cd prompt-forge
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:

   ```env
   # OpenRouter API Configuration
   OPENROUTER_API_KEY=your_openrouter_api_key_here

   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
   CLERK_SECRET_KEY=sk_test_your_secret_key
   ```

4. **Start development servers**

   ```bash
   # Start both frontend and API server
   pnpm dev:full

   # Or separately:
   pnpm dev      # Frontend only (port 8080)
   pnpm dev:api  # API server only (port 3001)
   ```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** with zero configuration

```bash
# Or deploy via CLI
vercel --prod
```

### Other Platforms

The app is platform-agnostic and can be deployed to:

- Netlify (with serverless functions)
- Railway
- Render
- Any Node.js hosting provider

## 🔧 Configuration

### AI Models

Configure available models in `src/lib/ai-config.ts`:

```typescript
export const AI_MODELS: ModelConfig[] = [
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    maxTokens: 128000,
    costPer1kTokens: 0.03,
    description: 'Latest GPT-4 with improved reasoning',
  },
  // Add more models...
];
```

### Enhancement Techniques

Add custom techniques in `src/lib/ai-config.ts`:

```typescript
export const ENHANCEMENT_TECHNIQUES: EnhancementTechnique[] = [
  {
    id: 'custom-technique',
    name: 'Custom Technique',
    description: 'Your custom enhancement method',
    icon: 'RiMagicFill',
    systemPrompt: 'Your system prompt here...',
  },
  // Add more techniques...
];
```

### User Tiers

Configure subscription tiers:

```typescript
export const USER_TIERS: Record<string, UserTier> = {
  free: {
    name: 'Free',
    maxRequestsPerMonth: 50,
    maxTokensPerRequest: 4000,
    availableModels: ['anthropic/claude-3-haiku'],
    features: ['Basic enhancement', 'History (7 days)'],
  },
  // Add more tiers...
};
```

## 📱 Usage

### Basic Enhancement

1. **Enter your prompt** in the left panel
2. **Select AI model** and enhancement technique
3. **Choose output format** (Text, Markdown, JSON, XML)
4. **Click "Enhance Prompt"** to start streaming
5. **Copy, save, or export** the enhanced result

### Advanced Features

- **History**: Access all your enhanced prompts
- **Templates**: Save frequently used prompt patterns
- **Settings**: Customize preferences and API keys
- **Analytics**: Track usage and performance metrics

## 🔌 API Reference

### POST /api/enhance

Enhance a prompt using AI.

```typescript
// Request
{
  userPrompt: string;
  model: string;          // e.g., 'openai/gpt-4o'
  technique: string;      // e.g., 'chain-of-thought'
  outputFormat: string;   // 'text' | 'markdown' | 'json' | 'xml'
  userId?: string;        // For rate limiting
}

// Response: Server-Sent Events (Streaming)
data: Enhanced prompt content...
data: More content...
data: [DONE]
```

## 🧪 Development

### Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── enhancement/    # Core enhancement features
│   ├── layout/         # Layout components
│   └── ui/             # ReUI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
└── pages/              # Application pages

api/
└── enhance.ts          # AI enhancement endpoint
```

### Adding New Features

1. **Create components** in appropriate directories
2. **Add custom hooks** for state management
3. **Update configuration** files as needed
4. **Add tests** for new functionality

### Code Quality

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Build for production
pnpm build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](https://promptforge-docs.vercel.app)
- 💬 [Discord Community](https://discord.gg/promptforge)
- 🐛 [Issue Tracker](https://github.com/yourusername/prompt-forge/issues)
- 📧 [Email Support](mailto:support@promptforge.ai)

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai) for AI model access
- [Clerk](https://clerk.com) for authentication
- [Vercel](https://vercel.com) for hosting and AI SDK
- [ReUI](https://reui.io) for beautiful components
- [Tailwind CSS](https://tailwindcss.com) for styling

---

**Built with ❤️ by the PromptForge team**
