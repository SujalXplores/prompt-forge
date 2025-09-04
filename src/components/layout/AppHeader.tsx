import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { RiMagicFill, RiSparklingFill } from '@remixicon/react'
import { PremiumButton } from '@/components/ui/premium-button'
import { motion } from 'framer-motion'

export function AppHeader() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-intense border-b border-glass-border sticky top-0 z-50 w-full backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between px-6">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-glow">
            <RiMagicFill className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gradient">PromptForge</h1>
            <p className="text-xs text-muted-foreground">AI Prompt Enhancement</p>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="link-animated text-sm font-medium text-foreground hover:text-primary">
            Dashboard
          </a>
          <a href="#" className="link-animated text-sm font-medium text-muted-foreground hover:text-primary">
            Templates
          </a>
          <a href="#" className="link-animated text-sm font-medium text-muted-foreground hover:text-primary">
            History
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <SignedIn>
            <PremiumButton variant="magic" size="sm" className="hidden sm:flex">
              <RiSparklingFill className="w-4 h-4" />
              Enhance
            </PremiumButton>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <PremiumButton variant="primary" size="sm">
                Sign In
              </PremiumButton>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </motion.header>
  )
}