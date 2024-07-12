import { redirect } from 'next/navigation';

import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from '@/db/queries';

import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';
import Promo from '@/components/promo';
import { Quests } from '@/components/quests';

import Header from './_components/header';
import Unit from './_components/unit';

export default async function page() {
  const userProgessData = getUserProgress();
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgessData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect('/courses');

  if (!courseProgress) redirect('/courses');

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[40px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div className="mb-10" key={unit.id}>
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              lessons={unit.lessons}
              description={unit.description}
              activeLesson={courseProgress.activeLeson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
}
