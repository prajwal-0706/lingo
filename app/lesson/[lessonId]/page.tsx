import { getLesson, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react';
import Quiz from '../_components/quiz';

type LessonIdPageProps = {
  params: {
    lessonId: number;
  };
};

export default async function lessonIdPage({ params }: LessonIdPageProps) {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
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
      userSubcription={null}
    />
  );
}
