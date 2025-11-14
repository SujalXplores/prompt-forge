import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAIEnhancement } from '@/hooks/use-ai-enhancement';
import { useWorkspaceState } from '@/hooks/use-workspace-state';
import { AI_MODELS, ENHANCEMENT_TECHNIQUES, OUTPUT_FORMATS } from '@/lib/ai-config';
import { WorkspaceHeader } from './WorkspaceHeader';
import { ConfigurationPanel } from './ConfigurationPanel';
import { PromptInputSection } from './PromptInputSection';
import { PromptOutputSection } from './PromptOutputSection';

export function PromptWorkspace() {
  const {
    inputPrompt,
    selectedModel,
    selectedTechnique,
    selectedFormat,
    setInputPrompt,
    setSelectedModel,
    setSelectedTechnique,
    setSelectedFormat,
    resetToDefaults,
  } = useWorkspaceState();

  const { enhance, cancel, isEnhancing, enhancedContent, error, reset } = useAIEnhancement();

  const handleEnhance = useCallback(async () => {
    if (!inputPrompt.trim()) {
      toast.error('Please enter a prompt to enhance');
      return;
    }

    const model = AI_MODELS[selectedModel];
    const technique = ENHANCEMENT_TECHNIQUES[selectedTechnique];
    const outputFormat = OUTPUT_FORMATS[selectedFormat];

    if (!model || !technique || !outputFormat) {
      toast.error('Please select valid configuration options');
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
        toast.success('Enhancement complete!', {
          description: `Enhanced using ${technique.name} with ${model.name}`,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error('Enhancement failed', {
        description: message,
      });
    }
  }, [inputPrompt, selectedModel, selectedTechnique, selectedFormat, enhance]);

  const handleReset = useCallback(() => {
    resetToDefaults();
    reset();
    toast.success('Workspace reset to defaults');
  }, [resetToDefaults, reset]);

  return (
    <div className='min-h-screen bg-linear-to-br from-background via-background to-muted/20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='max-w-6xl mx-auto space-y-12'>
          {/* Header */}
          <WorkspaceHeader />

          <ConfigurationPanel
            selectedModel={selectedModel}
            selectedTechnique={selectedTechnique}
            selectedFormat={selectedFormat}
            onModelChange={setSelectedModel}
            onTechniqueChange={setSelectedTechnique}
            onFormatChange={setSelectedFormat}
            onReset={handleReset}
          />

          <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
            <PromptInputSection
              inputPrompt={inputPrompt}
              onInputChange={setInputPrompt}
              onEnhance={handleEnhance}
              onCancel={cancel}
              isEnhancing={isEnhancing}
            />

            <PromptOutputSection
              enhancedContent={enhancedContent}
              isEnhancing={isEnhancing}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
