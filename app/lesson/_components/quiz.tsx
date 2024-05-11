'use client';

import { useState } from 'react';

import { challengeOptions, challenges } from '@/db/schema';
import Header from './header';

type QuizProps = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubcription: any; // TODO: TO replace it with the actual schema type
};

export default function Quiz({
  initialLessonId,
  initialLessonChallenges,
  initialHearts,
  initialPercentage,
  userSubcription,
}: QuizProps) {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <>
      <Header
        percentage={percentage}
        hasActiveSubscription={!!userSubcription?.isActive}
        hearts={hearts}
      />
    </>
  );
}
