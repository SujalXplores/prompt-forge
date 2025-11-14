import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { RiSparklingLine, RiMoonLine, RiSunLine } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { Actions, Action } from '@/components/ai-elements';
import { useTheme } from 'next-themes';

export function AppHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className='border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between'>
        {/* Logo and branding */}
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 bg-primary rounded-md shadow-sm'>
            <RiSparklingLine className='w-6 h-6 text-primary-foreground' />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-xl font-bold text-foreground'>Prompt Forge</h1>
            <p className='text-xs text-muted-foreground'>AI Prompt Enhancement</p>
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-3'>
          <Actions>
            <Action
              variant='ghost'
              tooltip='Toggle theme'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='w-9 h-9'
            >
              <RiSunLine className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <RiMoonLine className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Action>
          </Actions>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button size='sm' className='shadow-sm'>
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
