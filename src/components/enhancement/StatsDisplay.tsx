import { memo } from 'react';

interface StatsDisplayProps {
  text: string;
  label?: string;
  className?: string;
}

export const StatsDisplay = memo(({ text, label, className }: StatsDisplayProps) => {
  const getCharCount = (text: string) => text.length;
  const getTokenCount = (text: string) => Math.ceil(text.length / 4);

  return (
    <div className={`text-sm text-muted-foreground font-medium ${className}`}>
      {label && <span className='mr-2'>{label}:</span>}
      <span className='inline-flex items-center gap-3'>
        <span className='inline-flex items-center gap-1'>
          <span className='font-mono'>{getCharCount(text).toLocaleString()}</span>
          <span>chars</span>
        </span>
        <span className='text-muted-foreground/60'>•</span>
        <span className='inline-flex items-center gap-1'>
          <span className='font-mono'>{getTokenCount(text).toLocaleString()}</span>
          <span>tokens</span>
        </span>
      </span>
    </div>
  );
});

StatsDisplay.displayName = 'StatsDisplay';
