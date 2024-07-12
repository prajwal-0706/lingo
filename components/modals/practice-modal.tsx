'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { usePracticeModal } from '@/store/use-practice-modal';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function PracticeModal() {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/heart.svg" alt="Heart" width={100} height={100} />
          </div>
          <DialogTitle className="text-center font-bold">
            Practice Lesson!
          </DialogTitle>
          <DialogDescription className="text-center">
            Use Practice lessons to regain hearts and points. You cannot loose
            hearts or points in pratice lessons.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              size="lg"
              onClick={close}
              className="w-full"
            >
              I Understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
