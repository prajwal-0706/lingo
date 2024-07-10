'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { refillHearts } from '@/actions/user-progress';

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const POINTS_TO_REFILL = 10;

export default function Items({
  hearts,
  points,
  hasActiveSubscription,
}: ItemsProps) {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

    startTransition(() => {
      refillHearts().catch((error) => toast.error("Couldn't refill hearts"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill Hearts
          </p>
        </div>
        <Button
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
          onClick={onRefillHearts}
        >
          {hearts === 5 ? (
            'full'
          ) : (
            <div className="flex items-center">
              <Image
                src="/points.svg"
                alt="Points"
                className="mr-1"
                width={20}
                height={20}
              />
              <p className="">{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
}
