'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useExitModal } from '@/store/use-exit-modal';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ExitModal() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/mascot_sad.svg"
              alt="Sad mascot"
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className="text-center font-bold">
            Wait, Don&apos;t Go!
          </DialogTitle>
          <DialogDescription className="text-center">
            You&apos;re about to leave the lesson. Are you Sure?
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
              Keep Learning
            </Button>
            <Button
              variant="dangerOutline"
              size="lg"
              onClick={() => {
                close();
                router.push('/learn');
              }}
              className="w-full"
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
