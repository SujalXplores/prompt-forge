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
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';

export function AppHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-6">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg shadow-lg">
            <RiMagicFill className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              PromptForge
            </h1>
            <p className="text-xs text-muted-foreground">
              AI Prompt Enhancement
            </p>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
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

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9"
          >
            <RiSunLine className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <RiMoonLine className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <SignedIn>
            <Button size="sm" className="hidden sm:flex shadow-md">
              <RiSparklingFill className="w-4 h-4 mr-2" />
              Enhance
            </Button>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button size="sm" className="shadow-md">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </motion.header>
  );
}
