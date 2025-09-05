import { memo, useCallback, useState } from 'react';
import {
  RiSparklingLine,
  RiClipboardLine,
  RiInformationLine,
  RiCheckDoubleLine,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Response, Loader } from '@/components/ai-elements';
import { StatsDisplay } from './StatsDisplay';

interface PromptOutputSectionProps {
  enhancedContent: string;
  isEnhancing: boolean;
  error: string | null;
  className?: string;
}

export const PromptOutputSection = memo(
  ({ enhancedContent, isEnhancing, error, className }: PromptOutputSectionProps) => {
    const [isCopying, setIsCopying] = useState(false);

    const handleCopy = useCallback(async () => {
      if (!enhancedContent) return;

      try {
        setIsCopying(true);
        await navigator.clipboard.writeText(enhancedContent);
        toast.success('Enhanced prompt copied to clipboard!');
      } catch {
        toast.error('Failed to copy to clipboard');
      } finally {
        setIsCopying(false);
      }
    }, [enhancedContent]);

    const renderContent = () => {
      if (error) {
        return (
          <div className='flex items-center justify-center h-full min-h-[300px]'>
            <div className='text-center space-y-4 max-w-md'>
              <div className='w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center'>
                <RiInformationLine className='w-8 h-8 text-destructive' />
              </div>
              <div className='space-y-2'>
                <h4 className='text-lg font-semibold text-destructive'>Enhancement Failed</h4>
                <p className='text-sm text-muted-foreground leading-relaxed'>{error}</p>
              </div>
              <Badge variant='destructive' className='mt-2'>
                Error
              </Badge>
            </div>
          </div>
        );
      }

      if (isEnhancing && !enhancedContent) {
        return (
          <div className='flex items-center justify-center h-full min-h-[300px]'>
            <div className='text-center space-y-6'>
              <div className='flex justify-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                  <Loader size={24} className='text-white' />
                </div>
              </div>
              <div className='space-y-2'>
                <h4 className='text-lg font-semibold'>Enhancing Your Prompt</h4>
                <p className='text-muted-foreground'>
                  AI is analyzing and improving your prompt using advanced techniques...
                </p>
              </div>
              <Badge variant='secondary' className='animate-pulse'>
                Processing
              </Badge>
            </div>
          </div>
        );
      }

      if (enhancedContent) {
        return (
          <div className='space-y-4'>
            <ScrollArea className='h-[500px] w-full'>
              <div className='p-4 rounded-lg bg-muted/30 border-l-4 border-primary'>
                <div className='relative'>
                  <Response className='text-sm leading-relaxed streaming-prose prose prose-sm max-w-none dark:prose-invert prose-gray dark:prose-slate'>
                    {enhancedContent}
                  </Response>
                  {isEnhancing && (
                    <span className='inline-flex items-center ml-1 streaming-cursor'>
                      <span className='w-3 h-5 bg-gradient-to-b from-primary via-blue-500 to-primary rounded-sm shadow-sm border border-primary/20' />
                    </span>
                  )}
                </div>
              </div>
            </ScrollArea>

            <div className='flex items-center justify-between pt-2 border-t'>
              <Badge
                variant='outline'
                className='text-green-600 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 dark:text-green-400'
              >
                <RiCheckDoubleLine className='w-3 h-3 mr-1' />
                Enhanced
              </Badge>
              <Button
                variant='outline'
                onClick={handleCopy}
                disabled={isCopying || !enhancedContent}
                className='min-w-[140px]'
              >
                <RiClipboardLine className='w-4 h-4 mr-2' />
                {isCopying ? 'Copying...' : 'Copy Enhanced'}
              </Button>
            </div>
          </div>
        );
      }

      return (
        <div className='flex items-center justify-center h-full min-h-[300px]'>
          <div className='text-center space-y-6 max-w-lg'>
            <div className='w-20 h-20 mx-auto bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center'>
              <RiSparklingLine className='w-10 h-10 text-muted-foreground/50' />
            </div>
            <div className='space-y-3'>
              <h4 className='text-xl font-semibold text-foreground'>Ready to Enhance</h4>
              <p className='text-muted-foreground leading-relaxed'>
                Configure your settings above and enter a prompt to see the enhanced version appear
                here. Our AI will apply advanced techniques to improve clarity, effectiveness, and
                structure.
              </p>
            </div>
            <Badge variant='secondary'>Waiting for Input</Badge>
          </div>
        </div>
      );
    };

    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center'>
                <RiSparklingLine className='w-4 h-4 text-white' />
              </div>
              <div>
                <h3 className='text-lg font-semibold'>Enhanced Prompt</h3>
                <p className='text-sm text-muted-foreground font-normal'>
                  AI-enhanced version of your prompt
                </p>
              </div>
            </div>
            {enhancedContent && <StatsDisplay text={enhancedContent} />}
          </CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    );
  }
);

PromptOutputSection.displayName = 'PromptOutputSection';
