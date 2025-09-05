import { AppHeader } from '@/components/layout/AppHeader';
import { PromptWorkspace } from '@/components/enhancement/PromptWorkspace';

export default function Dashboard() {
  return (
    <div className='min-h-screen bg-background flex flex-col'>
      <AppHeader />
      <main className='flex-1'>
        <PromptWorkspace />
      </main>
    </div>
  );
}
