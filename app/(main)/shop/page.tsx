import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getUserProgress, getUserSubscription } from '@/db/queries';

import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';
import { Quests } from '@/components/quests';

import Items from './_components/items';

export default async function ShopPage() {
  const userProgressData = getUserProgress();
  const getUserSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    getUserSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect('/courses');

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />

        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/shop.svg" alt="Shop" width={90} height={90} />
          <h1 className="text-center font-bold text-black text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
        </div>
      </FeedWrapper>
    </div>
  );
}
