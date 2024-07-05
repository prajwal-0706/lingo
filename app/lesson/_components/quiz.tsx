'use client';

import { useState } from 'react';

import { challengeOptions, challenges } from '@/db/schema';
import Header from './header';
import QuestionBubble from './question-bubble';
import Challenge from './challenge';

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

  const [challenges, setChallenges] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const unCompletedChallengeIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );

    return unCompletedChallengeIndex === -1 ? 0 : unCompletedChallengeIndex;
  });

  const challenge = challenges[activeIndex];
  const options = challenge.challengeOptions || [];
  const title =
    challenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : challenge.question;

  return (
    <>
      <Header
        percentage={percentage}
        hasActiveSubscription={!!userSubcription?.isActive}
        hearts={hearts}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div className="">
              {challenge.type === 'ASSIST' && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={() => {}}
                status="correct"
                selectedOption={undefined}
                disabled={false}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
