import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import {
  RiMagicFill,
  RiShieldCheckLine,
  RiSparklingFill,
} from '@remixicon/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export function AuthCheck({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <Card className="text-center space-y-6">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl mx-auto">
                  <RiMagicFill className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
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
                    <RiShieldCheckLine className="w-5 h-5 text-primary" />
                    <span>Secure authentication with Clerk</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <RiMagicFill className="w-5 h-5 text-primary" />
                    <span>Multiple AI models supported</span>
                  </div>
                </div>

                <SignInButton>
                  <Button size="lg" className="w-full">
                    <RiMagicFill className="w-5 h-5" />
                    Get Started
                  </Button>
                </SignInButton>

                <p className="text-xs text-muted-foreground">
                  Sign in to start enhancing your prompts with AI
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
