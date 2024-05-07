import { redirect } from 'next/navigation';

import { getUserProgress } from '@/db/queries';
import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';

import Header from './_components/header';

export default async function page() {
  const userProgessData = getUserProgress();

  const [userProgress] = await Promise.all([userProgessData]);

  if (!userProgress || !userProgress.activeCourse) redirect('/courses');

  return (
    <div className="flex flex-row-reverse gap-[40px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: 'Spanish', imageSrc: '/spanish.svg' }}
          hearts={5}
          points={20}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>
    </div>
  );
}
