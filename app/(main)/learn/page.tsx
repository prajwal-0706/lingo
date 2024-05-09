import { redirect } from 'next/navigation';

import { getUnits, getUserProgress } from '@/db/queries';
import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';

import Header from './_components/header';

export default async function page() {
  const userProgessData = getUserProgress();
  const unitsData = getUnits();

  const [userProgress, units] = await Promise.all([userProgessData, unitsData]);

  if (!userProgress || !userProgress.activeCourse) redirect('/courses');

  return (
    <div className="flex flex-row-reverse gap-[40px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id}>{JSON.stringify(unit)}</div>
        ))}
      </FeedWrapper>
    </div>
  );
}
