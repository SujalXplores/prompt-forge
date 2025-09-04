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
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Prompt Enhancement
          </h2>
          <p className="text-muted-foreground">
            Transform your prompts with AI-powered enhancement techniques
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Model Selection */}
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-64">
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
            <SelectTrigger className="w-64">
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
            <SelectTrigger className="w-48">
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
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Advanced Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Model Info</label>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
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
                  <label className="text-sm font-medium">Technique Info</label>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
                      {selectedTechniqueConfig?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTechniqueConfig?.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Format</label>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
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
        </div>
      )}

      {/* Usage Stats */}
      <div>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Monthly Usage</span>
              <span className="text-sm text-muted-foreground">
                {stats.promptsEnhanced || 0} prompts •{' '}
                {(stats.tokensUsed || 0).toLocaleString()} tokens
              </span>
            </div>
            <Progress value={stats.usagePercentage || 0} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-20rem)]">
        {/* Input Panel */}
        <div className="flex flex-col">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiMagicFill className="w-5 h-5" />
                  Original Prompt
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{getCharCount(inputPrompt)} chars</span>
                  <span>•</span>
                  <span>{getTokenCount(inputPrompt)} tokens</span>
                </div>
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
                  onClick={isEnhancing ? cancel : handleEnhance}
                  disabled={!inputPrompt.trim()}
                  size="lg"
                  className="flex-1"
                >
                  {isEnhancing ? (
                    <>
                      <RiStopFill className="w-4 h-4 mr-2" />
                      Stop Enhancement
                    </>
                  ) : (
                    <>
                      <RiPlayFill className="w-4 h-4 mr-2" />
                      Enhance Prompt
                    </>
                  )}
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(inputPrompt)}
                      disabled={!inputPrompt.trim()}
                    >
                      <RiClipboardLine className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy original prompt</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setInputPrompt('')}
                      disabled={!inputPrompt.trim()}
                    >
                      <RiRefreshLine className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear prompt</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center">
                    <RiMagicFill className="w-3 h-3 text-primary-foreground" />
                  </div>
                  Enhanced Prompt
                </div>
                {enhancedContent && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{getCharCount(enhancedContent)} chars</span>
                    <span>•</span>
                    <span>{getTokenCount(enhancedContent)} tokens</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex-1 bg-muted/50 border rounded-lg p-4 overflow-y-auto relative">
                {error ? (
                  <div className="flex items-center justify-center h-full text-destructive">
                    <div className="text-center space-y-2">
                      <RiInformationLine className="w-12 h-12 mx-auto opacity-50" />
                      <p className="text-sm">Enhancement failed</p>
                      <p className="text-xs text-muted-foreground">{error}</p>
                    </div>
                  </div>
                ) : isEnhancing && !enhancedContent ? (
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
                ) : enhancedContent ? (
                  <div className="space-y-2">
                    <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
                      {enhancedContent}
                      {isEnhancing && (
                        <span className="inline-block w-2 h-5 bg-primary ml-1" />
                      )}
                    </pre>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center space-y-2">
                      <RiMagicFill className="w-12 h-12 mx-auto opacity-50" />
                      <p>Enhanced prompt will appear here</p>
                      <p className="text-xs">
                        Select a model and technique, then click enhance
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleCopy(enhancedContent)}
                  disabled={!enhancedContent}
                  size="lg"
                  className="flex-1"
                >
                  <RiClipboardLine className="w-4 h-4 mr-2" />
                  Copy Enhanced
                </Button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSaveToHistory}
                      disabled={!enhancedContent || !inputPrompt.trim()}
                    >
                      <RiSaveLine className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save to history</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleExport(enhancedContent, 'enhanced-prompt.txt')
                      }
                      disabled={!enhancedContent}
                    >
                      <RiDownload2Line className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export enhanced prompt</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
