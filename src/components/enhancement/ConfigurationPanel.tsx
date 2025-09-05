import { memo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  AI_MODELS,
  ENHANCEMENT_TECHNIQUES,
  OUTPUT_FORMATS,
  type ModelConfig,
  type EnhancementTechnique,
  type OutputFormat,
} from '@/lib/ai-config';

interface ConfigurationPanelProps {
  selectedModel: string;
  selectedTechnique: string;
  selectedFormat: string;
  onModelChange: (value: string) => void;
  onTechniqueChange: (value: string) => void;
  onFormatChange: (value: string) => void;
  onReset?: () => void;
  className?: string;
}

export const ConfigurationPanel = memo(
  ({
    selectedModel,
    selectedTechnique,
    selectedFormat,
    onModelChange,
    onTechniqueChange,
    onFormatChange,
    onReset,
    className,
  }: ConfigurationPanelProps) => {
    const handleReset = useCallback(() => {
      onReset?.();
    }, [onReset]);

    return (
      <Card className={className}>
        <CardContent className='pt-6'>
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-foreground'>Configuration</h3>
              {onReset && (
                <Button variant='outline' size='sm' onClick={handleReset}>
                  Reset to Defaults
                </Button>
              )}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              <div className='space-y-3'>
                <label className='text-sm font-medium text-foreground'>
                  AI Model
                  <span className='text-muted-foreground ml-1 font-normal'>*</span>
                </label>
                <Select value={selectedModel} onValueChange={onModelChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue>{AI_MODELS[selectedModel]?.name || 'Select a model'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(AI_MODELS).map((model: ModelConfig) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className='flex flex-col gap-2 py-2'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium'>{model.name}</span>
                            <Badge variant='secondary' className='text-xs'>
                              {model.provider}
                            </Badge>
                            {model.costPer1kTokens === 0 && (
                              <Badge
                                variant='outline'
                                className='text-xs text-green-600 border-green-200 bg-green-50'
                              >
                                FREE
                              </Badge>
                            )}
                          </div>
                          <p className='text-xs text-muted-foreground leading-relaxed'>
                            {model.description}
                          </p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-3'>
                <label className='text-sm font-medium text-foreground'>
                  Enhancement Technique
                  <span className='text-muted-foreground ml-1 font-normal'>*</span>
                </label>
                <Select value={selectedTechnique} onValueChange={onTechniqueChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue>
                      {ENHANCEMENT_TECHNIQUES[selectedTechnique]?.name || 'Select a technique'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ENHANCEMENT_TECHNIQUES).map(
                      (technique: EnhancementTechnique) => (
                        <SelectItem key={technique.id} value={technique.id}>
                          <div className='flex flex-col gap-1 py-1'>
                            <span className='font-medium'>{technique.name}</span>
                            <p className='text-xs text-muted-foreground leading-relaxed'>
                              {technique.description}
                            </p>
                          </div>
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-3'>
                <label className='text-sm font-medium text-foreground'>
                  Output Format
                  <span className='text-muted-foreground ml-1 font-normal'>*</span>
                </label>
                <Select value={selectedFormat} onValueChange={onFormatChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue>
                      {OUTPUT_FORMATS[selectedFormat]?.name || 'Select a format'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(OUTPUT_FORMATS).map((format: OutputFormat) => (
                      <SelectItem key={format.id} value={format.id}>
                        <div className='flex flex-col gap-1 py-1'>
                          <span className='font-medium'>{format.name}</span>
                          <p className='text-xs text-muted-foreground'>{format.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ConfigurationPanel.displayName = 'ConfigurationPanel';
