import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/clerk-react';
import {
  RiMagicFill,
  RiSparklingFill,
  RiMoonLine,
  RiSunLine,
} from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Actions, Action } from '@/components/ai-elements';
import { useTheme } from 'next-themes';

export function AppHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mobile-container flex h-14 sm:h-16 items-center justify-between">
        {/* Logo and branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg shadow-lg">
            <RiMagicFill className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              PromptForge
            </h1>
            <p className="hidden xs:block text-xs text-muted-foreground">
              AI Prompt Enhancement
            </p>
          </div>
        </div>

        {/* Navigation - hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Templates
          </a>
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            History
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Actions>
            <Action
              variant="ghost"
              tooltip="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 sm:w-9 sm:h-9"
            >
              <RiSunLine className="h-3 w-3 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <RiMoonLine className="absolute h-3 w-3 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Action>
          </Actions>

          <SignedIn>
            <Button
              size="sm"
              className="hidden sm:flex shadow-md text-xs sm:text-sm"
            >
              <RiSparklingFill className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Enhance</span>
              <span className="sm:hidden">AI</span>
            </Button>
            <div className="scale-90 sm:scale-100">
              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button size="sm" className="shadow-md text-xs sm:text-sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
