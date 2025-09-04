import { useState } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { PromptWorkspace } from '@/components/enhancement/PromptWorkspace';
import { Button } from '@/components/ui/button';
import { RiMenuLine } from '@remixicon/react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <div className="flex-1 flex relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out
          lg:relative lg:inset-auto lg:transform-none lg:transition-none
          ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }
        `}
        >
          <AppSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile menu button */}
          <div className="lg:hidden p-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2"
            >
              <RiMenuLine className="w-4 h-4" />
              <span className="text-sm">Menu</span>
            </Button>
          </div>

          <PromptWorkspace />
        </main>
      </div>
    </div>
  );
}
