import { useState } from 'react';
import {
  RiSparklingLine,
  RiClipboardLine,
  RiPlayLine,
  RiStopLine,
  RiInformationLine,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputButton,
  Response,
  Loader,
} from '@/components/ai-elements';
import { useAIEnhancement } from '@/hooks/use-ai-enhancement';
import { AI_MODELS, ENHANCEMENT_TECHNIQUES, OUTPUT_FORMATS } from '@/lib/ai-config';

export function PromptWorkspace() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-chat-v3-0324');
  const [selectedTechnique, setSelectedTechnique] = useState('chain-of-thought');
  const [selectedFormat, setSelectedFormat] = useState('text');

  const { enhance, cancel, isEnhancing, enhancedContent, error } = useAIEnhancement();

  const handleEnhance = async () => {
    if (!inputPrompt.trim()) {
      toast.error('Please enter a prompt to enhance');
      return;
    }

    const model = AI_MODELS[selectedModel];
    const technique = ENHANCEMENT_TECHNIQUES[selectedTechnique];
    const outputFormat = OUTPUT_FORMATS[selectedFormat];

    if (!model || !technique || !outputFormat) {
      toast.error('Please select valid model, technique, and output format');
      return;
    }

    try {
      const result = await enhance({
        content: inputPrompt,
        model,
        technique,
        outputFormat,
      });

      if (result) {
        toast.success('Enhancement complete!');
      }
    } catch (error) {
      toast.error(
        `Enhancement failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const getCharCount = (text: string) => text.length;
  const getTokenCount = (text: string) => Math.ceil(text.length / 4); // Rough estimate

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-3xl font-bold text-foreground'>Enhance Your Prompts with AI</h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Transform your prompts using specialized AI models. Choose from category winners: free
            excellence, cost-effective premium, ultimate reasoning, fastest response, and best
            context handling.
          </p>
        </div>

        {/* Configuration */}
        <Card>
          <CardContent className='pt-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* Model Selection */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>AI Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue>{AI_MODELS[selectedModel]?.name}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(AI_MODELS).map(model => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className='flex flex-col gap-1 py-1'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium'>{model.name}</span>
                            <Badge variant='secondary' className='text-xs'>
                              {model.provider}
                            </Badge>
                            {model.costPer1kTokens === 0 && (
                              <Badge
                                variant='outline'
                                className='text-xs text-green-600 border-green-200'
                              >
                                FREE
                              </Badge>
                            )}
                          </div>
                          <span className='text-xs text-muted-foreground leading-relaxed'>
                            {model.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Technique Selection */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Enhancement Technique</label>
                <Select value={selectedTechnique} onValueChange={setSelectedTechnique}>
                  <SelectTrigger>
                    <SelectValue>{ENHANCEMENT_TECHNIQUES[selectedTechnique]?.name}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ENHANCEMENT_TECHNIQUES).map(technique => (
                      <SelectItem key={technique.id} value={technique.id}>
                        <div className='flex flex-col'>
                          <span className='font-medium'>{technique.name}</span>
                          <span className='text-xs text-muted-foreground'>
                            {technique.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Output Format Selection */}
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Output Format</label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(OUTPUT_FORMATS).map(format => (
                      <SelectItem key={format.id} value={format.id}>
                        {format.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <RiSparklingLine className='w-5 h-5' />
                <span>Original Prompt</span>
              </div>
              <div className='text-sm text-muted-foreground font-normal'>
                {getCharCount(inputPrompt)} chars • {getTokenCount(inputPrompt)} tokens
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PromptInput>
              <PromptInputTextarea
                placeholder='Enter your prompt here to enhance it with AI...'
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                className='min-h-[200px] text-sm resize-none'
              />
              <PromptInputToolbar>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopy(inputPrompt)}
                      disabled={!inputPrompt.trim()}
                    >
                      <RiClipboardLine className='w-4 h-4 mr-2' />
                      Copy
                    </Button>
                  </div>
                  <PromptInputButton
                    onClick={isEnhancing ? cancel : handleEnhance}
                    disabled={!inputPrompt.trim()}
                    variant={isEnhancing ? 'destructive' : 'default'}
                    size='default'
                  >
                    {isEnhancing ? (
                      <>
                        <RiStopLine className='w-4 h-4 mr-2' />
                        Stop
                      </>
                    ) : (
                      <>
                        <RiPlayLine className='w-4 h-4 mr-2' />
                        Enhance Prompt
                      </>
                    )}
                  </PromptInputButton>
                </div>
              </PromptInputToolbar>
            </PromptInput>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='w-5 h-5 bg-primary rounded-md flex items-center justify-center'>
                  <RiSparklingLine className='w-3 h-3 text-primary-foreground' />
                </div>
                <span>Enhanced Prompt</span>
              </div>
              {enhancedContent && (
                <div className='text-sm text-muted-foreground font-normal'>
                  {getCharCount(enhancedContent)} chars • {getTokenCount(enhancedContent)} tokens
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className='h-[200px] w-full rounded-lg border bg-muted/50 p-4'>
              {error ? (
                <div className='flex items-center justify-center h-full text-destructive'>
                  <div className='text-center space-y-2'>
                    <RiInformationLine className='w-12 h-12 mx-auto opacity-50' />
                    <p className='text-sm'>Enhancement failed</p>
                    <p className='text-xs text-muted-foreground'>{error}</p>
                  </div>
                </div>
              ) : isEnhancing && !enhancedContent ? (
                <div className='flex items-center justify-center h-full'>
                  <div className='text-center space-y-4'>
                    <Loader size={24} />
                    <p className='text-sm text-muted-foreground'>Enhancing your prompt...</p>
                  </div>
                </div>
              ) : enhancedContent ? (
                <div className='space-y-2'>
                  <Response className='text-sm whitespace-pre-wrap'>{enhancedContent}</Response>
                  {isEnhancing && (
                    <span className='inline-block w-2 h-5 bg-primary ml-1 animate-pulse' />
                  )}
                </div>
              ) : (
                <div className='flex items-center justify-center h-full text-muted-foreground'>
                  <div className='text-center space-y-2'>
                    <RiSparklingLine className='w-12 h-12 mx-auto opacity-50' />
                    <p className='text-base'>Enhanced prompt will appear here</p>
                    <p className='text-sm'>Configure settings above and click "Enhance Prompt"</p>
                  </div>
                </div>
              )}
            </ScrollArea>

            {enhancedContent && (
              <div className='flex justify-end mt-4'>
                <Button
                  variant='outline'
                  onClick={() => handleCopy(enhancedContent)}
                  disabled={!enhancedContent}
                >
                  <RiClipboardLine className='w-4 h-4 mr-2' />
                  Copy Enhanced Prompt
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
