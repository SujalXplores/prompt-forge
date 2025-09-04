import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { PromptWorkspace } from '@/components/enhancement/PromptWorkspace';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <div className="flex-1 flex">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <PromptWorkspace />
        </main>
      </div>
    </div>
  );
}
