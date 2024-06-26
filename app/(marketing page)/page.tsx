'use client';
import { Button } from '@/components/ui/button';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-[988px] h-full mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative  w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image alt="lingo mascot" fill src="/hero.svg" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl font-bold lg:text-3xl text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master new languages with Lingo.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignUpUrl="/learn"
                afterSignInUrl="/learn"
              >
                <Button className="w-full" size="lg" variant="secondary">
                  Get started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                afterSignUpUrl="/learn"
                afterSignInUrl="/learn"
              >
                <Button className="w-full" size="lg" variant="primaryOutline">
                  I Already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">Continue learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
