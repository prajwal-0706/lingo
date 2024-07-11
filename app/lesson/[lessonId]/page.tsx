import { redirect } from 'next/navigation';

import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';

import Quiz from '../_components/quiz';

type LessonIdPageProps = {
  params: {
    lessonId: number;
  };
};

export default async function lessonIdPage({ params }: LessonIdPageProps) {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  console.log(userProgress);

  if (!lesson || !userProgress) redirect('/learn');

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
}
