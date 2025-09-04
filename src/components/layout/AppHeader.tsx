import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/clerk-react';
import { RiMagicFill, RiSparklingFill } from '@remixicon/react';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <RiMagicFill className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">PromptForge</h1>
            <p className="text-xs text-muted-foreground">
              AI Prompt Enhancement
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary">
            Dashboard
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Templates
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            History
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Button size="sm" className="hidden sm:flex">
              <RiSparklingFill className="w-4 h-4 mr-2" />
              Enhance
            </Button>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button size="sm">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
