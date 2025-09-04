import { useState, useEffect } from 'react';
import {
  RiMagicFill,
  RiClipboardLine,
  RiDownload2Line,
  RiSettingsLine,
  RiPlayFill,
  RiStopFill,
  RiSaveLine,
  RiRefreshLine,
  RiInformationLine,
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
// AI Elements
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputButton,
  PromptInputSubmit,
  Response,
  Loader,
  Actions,
  Action,
  Suggestions,
  Suggestion,
  CodeBlock,
  CodeBlockCopyButton,
  Message,
  MessageContent,
} from '@/components/ai-elements';
import {
  useAIEnhancement,
  usePromptHistory,
  useUsageStats,
} from '@/hooks/use-ai-enhancement';
import {
  AI_MODELS,
  ENHANCEMENT_TECHNIQUES,
  OUTPUT_FORMATS,
} from '@/lib/ai-config';

export function PromptWorkspace() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('openai/gpt-4o');
  const [selectedTechnique, setSelectedTechnique] =
    useState('chain-of-thought');
  const [selectedFormat, setSelectedFormat] = useState('text');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { enhance, cancel, isEnhancing, enhancedContent, error } =
    useAIEnhancement();
  const { saveToHistory, loadHistory } = usePromptHistory();
  const { stats, updateStats, loadStats } = useUsageStats();

  useEffect(() => {
    loadHistory();
    loadStats();
  }, [loadHistory, loadStats]);

  const handleEnhance = async () => {
    if (!inputPrompt.trim()) {
      toast.error('Please enter a prompt to enhance');
      return;
    }

    const model = AI_MODELS.find((m) => m.id === selectedModel);
    const technique = ENHANCEMENT_TECHNIQUES.find(
      (t) => t.id === selectedTechnique
    );
    const outputFormat = OUTPUT_FORMATS.find((f) => f.id === selectedFormat);

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
        updateStats(result, 5000); // Estimate 5 seconds enhancement time
        toast.success('Enhancement complete!');
      }
    } catch (error) {
      toast.error(
        `Enhancement failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  };

  const handleSaveToHistory = () => {
    if (!inputPrompt.trim() || !enhancedContent.trim()) {
      toast.error('Both original and enhanced prompts are required');
      return;
    }

    saveToHistory({
      originalPrompt: inputPrompt,
      enhancedPrompt: enhancedContent,
      technique: selectedTechnique,
      model: selectedModel,
      outputFormat: selectedFormat,
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleExport = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported successfully!');
  };

  const getCharCount = (text: string) => text.length;
  const getTokenCount = (text: string) => Math.ceil(text.length / 4); // Rough estimate

  const selectedModelConfig = AI_MODELS.find((m) => m.id === selectedModel);
  const selectedTechniqueConfig = ENHANCEMENT_TECHNIQUES.find(
    (t) => t.id === selectedTechnique
  );
  const selectedFormatConfig = OUTPUT_FORMATS.find(
    (f) => f.id === selectedFormat
  );

  return (
    <div className="flex-1 mobile-padding mobile-stack">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="space-y-1 sm:space-y-2">
          <h2 className="mobile-heading font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Prompt Enhancement
          </h2>
          <p className="mobile-text text-muted-foreground">
            Transform your prompts with AI-powered enhancement techniques
          </p>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:space-y-0">
          {/* Model Selection */}
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{model.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {model.provider}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Technique Selection */}
          <Select
            value={selectedTechnique}
            onValueChange={setSelectedTechnique}
          >
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ENHANCEMENT_TECHNIQUES.map((technique) => (
                <SelectItem key={technique.id} value={technique.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{technique.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {technique.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Output Format Selection */}
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OUTPUT_FORMATS.map((format) => (
                <SelectItem key={format.id} value={format.id}>
                  {format.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="self-start sm:self-auto"
              >
                <RiSettingsLine className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Advanced Settings</TooltipContent>
          </Tooltip>
        </div>
      </div>
      {/* Advanced Settings Panel */}
      {showAdvanced && (
        <Card>
          <CardHeader>
            <CardTitle className="mobile-subheading">
              Advanced Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="responsive-grid">
              <div className="space-y-2">
                <label className="mobile-text font-medium">Model Info</label>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="mobile-text font-medium">
                    {selectedModelConfig?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Max tokens:{' '}
                    {selectedModelConfig?.maxTokens.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cost: ${selectedModelConfig?.costPer1kTokens}/1k tokens
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="mobile-text font-medium">
                  Technique Info
                </label>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="mobile-text font-medium">
                    {selectedTechniqueConfig?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedTechniqueConfig?.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="mobile-text font-medium">Output Format</label>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="mobile-text font-medium">
                    {selectedFormatConfig?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedFormatConfig?.description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}{' '}
      {/* Prompt Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="mobile-subheading">
            Quick Start Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suggestions>
            <Suggestion
              suggestion="Write a professional email"
              onClick={(suggestion) => setInputPrompt(suggestion)}
            />
            <Suggestion
              suggestion="Create a marketing strategy"
              onClick={(suggestion) => setInputPrompt(suggestion)}
            />
            <Suggestion
              suggestion="Explain a complex concept"
              onClick={(suggestion) => setInputPrompt(suggestion)}
            />
            <Suggestion
              suggestion="Draft a project proposal"
              onClick={(suggestion) => setInputPrompt(suggestion)}
            />
            <Suggestion
              suggestion="Write product documentation"
              onClick={(suggestion) => setInputPrompt(suggestion)}
            />
            <Suggestion
              suggestion="Create meeting agenda"
              onClick={(suggestion) => setInputPrompt(suggestion)}
            />
          </Suggestions>
        </CardContent>
      </Card>
      {/* Usage Stats */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="mobile-text font-medium">Monthly Usage</span>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {stats.promptsEnhanced || 0} prompts •{' '}
              {(stats.tokensUsed || 0).toLocaleString()} tokens
            </span>
          </div>
          <Progress value={stats.usagePercentage || 0} className="h-2" />
        </CardContent>
      </Card>
      {/* Main Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 min-h-[calc(100vh-28rem)] lg:min-h-[calc(100vh-24rem)]">
        {/* Input Panel */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RiMagicFill className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="mobile-text">Original Prompt</span>
              </div>
            </CardTitle>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span>{getCharCount(inputPrompt)} chars</span>
              <span>•</span>
              <span>{getTokenCount(inputPrompt)} tokens</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3 sm:gap-4">
            <PromptInput className="flex-1">
              <PromptInputTextarea
                placeholder="Enter your prompt here to enhance it with AI..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                className="min-h-[250px] sm:min-h-[300px] font-mono text-xs sm:text-sm"
              />
              <PromptInputToolbar>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
                  <PromptInputButton
                    onClick={isEnhancing ? cancel : handleEnhance}
                    disabled={!inputPrompt.trim()}
                    variant={isEnhancing ? 'destructive' : 'default'}
                    className="flex-1 text-xs sm:text-sm"
                  >
                    {isEnhancing ? (
                      <>
                        <RiStopFill className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Stop Enhancement
                      </>
                    ) : (
                      <>
                        <RiPlayFill className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Enhance Prompt
                      </>
                    )}
                  </PromptInputButton>

                  <Actions className="flex-shrink-0">
                    <Action
                      tooltip="Copy original prompt"
                      onClick={() => handleCopy(inputPrompt)}
                      disabled={!inputPrompt.trim()}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <RiClipboardLine className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Action>

                    <Action
                      tooltip="Clear prompt"
                      onClick={() => setInputPrompt('')}
                      disabled={!inputPrompt.trim()}
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <RiRefreshLine className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Action>
                  </Actions>
                </div>
              </PromptInputToolbar>
            </PromptInput>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-md flex items-center justify-center">
                  <RiMagicFill className="w-2 h-2 sm:w-3 sm:h-3 text-primary-foreground" />
                </div>
                <span className="mobile-text">Enhanced Prompt</span>
              </div>
            </CardTitle>
            {enhancedContent && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span>{getCharCount(enhancedContent)} chars</span>
                <span>•</span>
                <span>{getTokenCount(enhancedContent)} tokens</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3 sm:gap-4">
            <div className="flex-1 bg-muted/50 border rounded-lg p-3 sm:p-4 overflow-y-auto relative min-h-[250px] sm:min-h-[300px]">
              {error ? (
                <div className="flex items-center justify-center h-full text-destructive">
                  <div className="text-center space-y-2">
                    <RiInformationLine className="w-8 h-8 sm:w-12 sm:h-12 mx-auto opacity-50" />
                    <p className="text-xs sm:text-sm">Enhancement failed</p>
                    <p className="text-xs text-muted-foreground">{error}</p>
                  </div>
                </div>
              ) : isEnhancing && !enhancedContent ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <Loader size={24} />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Enhancing your prompt...
                    </p>
                  </div>
                </div>
              ) : enhancedContent ? (
                <div className="space-y-2">
                  <Response className="text-xs sm:text-sm">
                    {enhancedContent}
                  </Response>
                  {isEnhancing && (
                    <span className="inline-block w-2 h-4 sm:h-5 bg-primary ml-1 animate-pulse" />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center space-y-2">
                    <RiMagicFill className="w-8 h-8 sm:w-12 sm:h-12 mx-auto opacity-50" />
                    <p className="text-sm sm:text-base">
                      Enhanced prompt will appear here
                    </p>
                    <p className="text-xs">
                      Select a model and technique, then click enhance
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleCopy(enhancedContent)}
                disabled={!enhancedContent}
                size="lg"
                className="flex-1 text-xs sm:text-sm"
              >
                <RiClipboardLine className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Copy Enhanced
              </Button>

              <Actions className="flex-shrink-0">
                <Action
                  tooltip="Save to history"
                  onClick={handleSaveToHistory}
                  disabled={!enhancedContent || !inputPrompt.trim()}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <RiSaveLine className="w-3 h-3 sm:w-4 sm:h-4" />
                </Action>

                <Action
                  tooltip="Export enhanced prompt"
                  onClick={() =>
                    handleExport(enhancedContent, 'enhanced-prompt.txt')
                  }
                  disabled={!enhancedContent}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <RiDownload2Line className="w-3 h-3 sm:w-4 sm:h-4" />
                </Action>
              </Actions>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
