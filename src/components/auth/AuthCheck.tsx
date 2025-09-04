import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export function AuthCheck({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
