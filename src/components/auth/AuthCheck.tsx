import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { RiMagicFill, RiShieldCheckLine, RiSparklingFill } from '@remixicon/react'
import { PremiumButton } from '@/components/ui/premium-button'
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/glass-card'

export function AuthCheck({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <GlassCard variant="intense" className="text-center space-y-6">
              <CardHeader className="space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mx-auto shadow-glow"
                >
                  <RiMagicFill className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gradient">
                    Welcome to PromptForge
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Transform your prompts into powerful AI instructions
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <RiSparklingFill className="w-5 h-5 text-primary" />
                    <span>Advanced prompt engineering techniques</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <RiShieldCheckLine className="w-5 h-5 text-success" />
                    <span>Secure authentication with Clerk</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <RiMagicFill className="w-5 h-5 text-secondary" />
                    <span>Multiple AI models supported</span>
                  </div>
                </div>

                <SignInButton>
                  <PremiumButton variant="magic" size="lg" className="w-full">
                    <RiMagicFill className="w-5 h-5" />
                    Get Started
                  </PremiumButton>
                </SignInButton>

                <p className="text-xs text-muted-foreground">
                  Sign in to start enhancing your prompts with AI
                </p>
              </CardContent>
            </GlassCard>
          </motion.div>
        </div>
      </SignedOut>
    </>
  )
}