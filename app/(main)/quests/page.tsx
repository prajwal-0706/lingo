import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getUserProgress, getUserSubscription } from '@/db/queries';

import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';
import { QUESTS } from '@/constants';
import { Progress } from '@/components/ui/progress';
import Promo from '@/components/promo';

export default async function QuestsPage() {
  const userProgressData = getUserProgress();
  const getUserSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    getUserSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect('/courses');

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        {!isPro && <Promo />}
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/quest.svg" alt="quests" width={90} height={90} />
          <h1 className="text-center font-bold text-black text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points.
          </p>
          <ul className="w-full">
            {QUESTS.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  className="flex w-full items-center gap-x-4 border-t-2 p-4"
                  key={quest.title}
                >
                  <Image
                    src="/points.svg"
                    alt="Points"
                    width={60}
                    height={60}
                  />

                  <div className="flex w-full flex-col gap-y-2">
                    <p className="text-xl font-bold text-neutral-700">
                      {quest.title}
                    </p>

                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
}
