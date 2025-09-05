import { memo } from 'react';

interface WorkspaceHeaderProps {
  className?: string;
}

export const WorkspaceHeader = memo(({ className }: WorkspaceHeaderProps) => {
  return (
    <header className={`text-center space-y-6 ${className}`}>
      <div className='space-y-4'>
        <h1 className='text-4xl md:text-5xl font-bold text-foreground leading-tight'>
          Enhance Your Prompts with AI
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
          Transform your prompts using specialized AI models and proven enhancement techniques.
          Choose from category winners in reasoning, speed, and cost-effectiveness.
        </p>
      </div>
    </header>
  );
});

WorkspaceHeader.displayName = 'WorkspaceHeader';
