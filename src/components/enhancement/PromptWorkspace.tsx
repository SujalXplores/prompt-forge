import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  RiMagicFill, 
  RiClipboardLine, 
  RiDownload2Line,
  RiSettingsLine,
  RiPlayFill,
  RiStopFill
} from '@remixicon/react'
import { GlassCard, CardContent, CardHeader, CardTitle } from '@/components/ui/glass-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function PromptWorkspace() {
  const [inputPrompt, setInputPrompt] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gpt-4o')
  const [selectedTechnique, setSelectedTechnique] = useState('chain-of-thought')

  const handleEnhance = async () => {
    if (!inputPrompt.trim()) {
      toast.error('Please enter a prompt to enhance')
      return
    }

    setIsEnhancing(true)
    setEnhancedPrompt('')

    // Simulate streaming enhancement
    const simulatedResponse = `Enhanced Prompt using ${selectedTechnique} technique:

${inputPrompt}

Let me think through this step by step:

1. First, I need to analyze the core intent of this prompt
2. Then identify areas for improvement in clarity and specificity  
3. Apply appropriate prompt engineering techniques
4. Structure the output for maximum effectiveness

Enhanced version:
You are an expert [domain] specialist. Your task is to [specific action] by following these steps:

Step 1: [Clear instruction]
Step 2: [Specific methodology] 
Step 3: [Expected output format]

Please ensure your response includes:
- [Specific requirement 1]
- [Specific requirement 2]
- [Quality criteria]

Format your response as [JSON/Markdown/etc] with the following structure:
[Template structure]`

    // Simulate typing effect
    let index = 0
    const typeInterval = setInterval(() => {
      if (index < simulatedResponse.length) {
        setEnhancedPrompt(prev => prev + simulatedResponse[index])
        index++
      } else {
        clearInterval(typeInterval)
        setIsEnhancing(false)
        toast.success('Prompt enhanced successfully!')
      }
    }, 20)
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const tokenCount = inputPrompt.length + enhancedPrompt.length

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-48 glass">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4 Omni</SelectItem>
              <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
              <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedTechnique} onValueChange={setSelectedTechnique}>
            <SelectTrigger className="w-48 glass">
              <SelectValue placeholder="Enhancement technique" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chain-of-thought">Chain of Thought</SelectItem>
              <SelectItem value="few-shot">Few-Shot Learning</SelectItem>
              <SelectItem value="zero-shot">Zero-Shot</SelectItem>
              <SelectItem value="role-based">Role-Based</SelectItem>
              <SelectItem value="tree-of-thought">Tree of Thought</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Tokens: {tokenCount.toLocaleString()}
          </span>
          <PremiumButton variant="ghost" size="icon">
            <RiSettingsLine className="w-4 h-4" />
          </PremiumButton>
        </div>
      </motion.div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <GlassCard variant="glass" className="h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <RiMagicFill className="w-5 h-5 text-primary" />
                Original Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <Textarea
                placeholder="Enter your prompt here to enhance it with AI..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                className="flex-1 min-h-[300px] bg-input border-input-border focus:border-primary resize-none custom-scrollbar font-mono text-sm"
              />
              <div className="flex items-center gap-2">
                <PremiumButton 
                  variant="magic" 
                  onClick={handleEnhance}
                  disabled={isEnhancing || !inputPrompt.trim()}
                  className="flex-1"
                >
                  {isEnhancing ? (
                    <>
                      <RiStopFill className="w-4 h-4" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <RiPlayFill className="w-4 h-4" />
                      Enhance Prompt
                    </>
                  )}
                </PremiumButton>
                <PremiumButton 
                  variant="secondary" 
                  size="icon"
                  onClick={() => handleCopy(inputPrompt)}
                  disabled={!inputPrompt.trim()}
                >
                  <RiClipboardLine className="w-4 h-4" />
                </PremiumButton>
              </div>
            </CardContent>
          </GlassCard>
        </motion.div>

        {/* Output Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <GlassCard variant="glass" className="h-full flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gradient-primary rounded-md flex items-center justify-center">
                  <RiMagicFill className="w-3 h-3 text-white" />
                </div>
                Enhanced Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex-1 bg-input border border-input-border rounded-lg p-4 custom-scrollbar overflow-y-auto">
                {enhancedPrompt ? (
                  <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
                    {enhancedPrompt}
                    {isEnhancing && (
                      <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />
                    )}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center space-y-2">
                      <RiMagicFill className="w-12 h-12 mx-auto opacity-50" />
                      <p>Enhanced prompt will appear here</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <PremiumButton 
                  variant="secondary" 
                  onClick={() => handleCopy(enhancedPrompt)}
                  disabled={!enhancedPrompt}
                  className="flex-1"
                >
                  <RiClipboardLine className="w-4 h-4" />
                  Copy Enhanced
                </PremiumButton>
                <PremiumButton 
                  variant="outline" 
                  size="icon"
                  disabled={!enhancedPrompt}
                >
                  <RiDownload2Line className="w-4 h-4" />
                </PremiumButton>
              </div>
            </CardContent>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}