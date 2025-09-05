import { AppHeader } from '@/components/layout/AppHeader';
import { PromptWorkspace } from '@/components/enhancement/PromptWorkspace';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Dashboard() {
  return (
    <div className='h-screen bg-background flex flex-col'>
      <AppHeader />
      <ScrollArea className='flex-1'>
        <main>
          <PromptWorkspace />
        </main>
      </ScrollArea>
    </div>
  );
}
