import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { InfinityIcon } from 'lucide-react';
import { courses } from '@/db/schema';

type UserProgressProps = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export default function UserProgress({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            alt={activeCourse.title}
            src={activeCourse.imageSrc}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>

      <Link href="/shop">
        <Button className="text-orange-500" variant="ghost">
          <Image
            alt="Points"
            src="/points.svg"
            className="mr-2"
            width={28}
            height={28}
          />
          {points}
        </Button>
      </Link>

      <Link href="/shop">
        <Button className="text-rose-500" variant="ghost">
          <Image
            alt="heart"
            src="/heart.svg"
            className="mr-2"
            width={28}
            height={28}
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
}
