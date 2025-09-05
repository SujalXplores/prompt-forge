import { memo, useCallback, useState } from 'react';
import { RiSparklingLine, RiClipboardLine, RiPlayLine, RiStopLine } from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputButton,
} from '@/components/ai-elements';
import { StatsDisplay } from './StatsDisplay';

interface PromptInputSectionProps {
  inputPrompt: string;
  onInputChange: (value: string) => void;
  onEnhance: () => void;
  onCancel: () => void;
  isEnhancing: boolean;
  disabled?: boolean;
  className?: string;
}

export const PromptInputSection = memo(
  ({
    inputPrompt,
    onInputChange,
    onEnhance,
    onCancel,
    isEnhancing,
    disabled = false,
    className,
  }: PromptInputSectionProps) => {
    const [isCopying, setIsCopying] = useState(false);

    const handleCopy = useCallback(async () => {
      if (!inputPrompt.trim()) return;

      try {
        setIsCopying(true);
        await navigator.clipboard.writeText(inputPrompt);
        toast.success('Copied to clipboard!');
      } catch {
        toast.error('Failed to copy to clipboard');
      } finally {
        setIsCopying(false);
      }
    }, [inputPrompt]);

    const handleSubmit = useCallback(() => {
      if (!inputPrompt.trim()) {
        toast.error('Please enter a prompt to enhance');
        return;
      }
      onEnhance();
    }, [inputPrompt, onEnhance]);

    const canSubmit = inputPrompt.trim() && !disabled;

    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                <RiSparklingLine className='w-4 h-4 text-white' />
              </div>
              <div>
                <h3 className='text-lg font-semibold'>Original Prompt</h3>
                <p className='text-sm text-muted-foreground font-normal'>
                  Enter your prompt to enhance it with AI
                </p>
              </div>
            </div>
            {inputPrompt && <StatsDisplay text={inputPrompt} />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='relative'>
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea
                placeholder='Enter your prompt here to enhance it with AI techniques...'
                value={inputPrompt}
                onChange={e => onInputChange(e.target.value)}
                onSubmit={handleSubmit}
                className='min-h-[200px] text-base resize-none pr-20 leading-relaxed'
                disabled={disabled}
                autoFocus
              />
              <PromptInputToolbar>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-2'>
                    {inputPrompt.trim() && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={handleCopy}
                        disabled={isCopying || disabled}
                        className='text-muted-foreground hover:text-foreground'
                      >
                        <RiClipboardLine className='w-4 h-4 mr-1' />
                        {isCopying ? 'Copying...' : 'Copy'}
                      </Button>
                    )}
                  </div>

                  <PromptInputButton
                    onClick={isEnhancing ? onCancel : handleSubmit}
                    disabled={!canSubmit && !isEnhancing}
                    variant={isEnhancing ? 'destructive' : 'default'}
                    size='default'
                    className='min-w-[120px]'
                  >
                    {isEnhancing ? (
                      <>
                        <RiStopLine className='w-4 h-4 mr-2' />
                        Stop
                      </>
                    ) : (
                      <>
                        <RiPlayLine className='w-4 h-4 mr-2' />
                        Enhance
                      </>
                    )}
                  </PromptInputButton>
                </div>
              </PromptInputToolbar>
            </PromptInput>
          </div>
        </CardContent>
      </Card>
    );
  }
);

PromptInputSection.displayName = 'PromptInputSection';
