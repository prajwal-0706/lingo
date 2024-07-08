'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useHeartModal } from '@/store/use-hearts-modal';
import Image from 'next/image';

export default function HeartModal() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/mascot_bad.svg"
              alt="Sad mascot"
              width={80}
              height={80}
            />
          </div>
          <DialogTitle className="text-center font-bold">
            You ran out of Hearts!
          </DialogTitle>
          <DialogDescription className="text-center">
            Get Pro for Unlimited hearts, or purchase them in the shop.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                close();
                router.push('/store');
              }}
              className="w-full"
            >
              Get Unlimited Hearts
            </Button>
            <Button
              variant="primaryOutline"
              size="lg"
              onClick={close}
              className="w-full"
            >
              No Thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
