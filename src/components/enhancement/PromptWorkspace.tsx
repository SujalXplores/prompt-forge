import { useState } from 'react';
import {
  RiMagicFill,
  RiClipboardLine,
  RiDownload2Line,
  RiSettingsLine,
  RiPlayFill,
  RiStopFill,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export function PromptWorkspace() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [selectedTechnique, setSelectedTechnique] =
    useState('chain-of-thought');

  const handleEnhance = async () => {
    if (!inputPrompt.trim()) {
      toast.error('Please enter a prompt to enhance');
      return;
    }

    setIsEnhancing(true);
    setEnhancedPrompt('');

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
Step 3: [Expected outcome]

Please ensure your response is detailed, actionable, and follows best practices in the field.`;

    // Simulate typing effect
    let currentText = '';
    for (let i = 0; i < simulatedResponse.length; i++) {
      if (!isEnhancing) break; // Allow stopping

      currentText += simulatedResponse[i];
      setEnhancedPrompt(currentText);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    setIsEnhancing(false);
  };

  const handleStop = () => {
    setIsEnhancing(false);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Prompt Enhancement</h2>
          <p className="text-muted-foreground">
            Transform your prompts with AI-powered enhancement techniques
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude-3">Claude 3</SelectItem>
              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedTechnique}
            onValueChange={setSelectedTechnique}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chain-of-thought">Chain of Thought</SelectItem>
              <SelectItem value="few-shot">Few-Shot Learning</SelectItem>
              <SelectItem value="zero-shot">Zero-Shot</SelectItem>
              <SelectItem value="tree-of-thought">Tree of Thought</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" mode="icon" size="lg">
            <RiSettingsLine className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-14rem)]">
        {/* Input Panel */}
        <div className="flex flex-col">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RiMagicFill className="w-5 h-5" />
                Original Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <Textarea
                placeholder="Enter your prompt here to enhance it with AI..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                className="flex-1 min-h-[300px] resize-none font-mono text-sm"
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={isEnhancing ? handleStop : handleEnhance}
                  disabled={!inputPrompt.trim()}
                  size="lg"
                  className="flex-1"
                >
                  {isEnhancing ? (
                    <>
                      <RiStopFill className="w-4 h-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <RiPlayFill className="w-4 h-4 mr-2" />
                      Enhance Prompt
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  mode="icon"
                  size="lg"
                  onClick={() => handleCopy(inputPrompt)}
                  disabled={!inputPrompt.trim()}
                >
                  <RiClipboardLine className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center">
                  <RiMagicFill className="w-3 h-3 text-primary-foreground" />
                </div>
                Enhanced Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex-1 bg-muted/50 border rounded-lg p-4 overflow-y-auto">
                {isEnhancing && !enhancedPrompt ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="space-y-2 mt-6">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-3/5" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ) : enhancedPrompt ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap">
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
                <Button
                  variant="outline"
                  onClick={() => handleCopy(enhancedPrompt)}
                  disabled={!enhancedPrompt}
                  size="lg"
                  className="flex-1"
                >
                  <RiClipboardLine className="w-4 h-4 mr-2" />
                  Copy Enhanced
                </Button>
                <Button
                  variant="outline"
                  mode="icon"
                  size="lg"
                  onClick={() => {
                    const blob = new Blob([enhancedPrompt], {
                      type: 'text/plain',
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'enhanced-prompt.txt';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  disabled={!enhancedPrompt}
                >
                  <RiDownload2Line className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
