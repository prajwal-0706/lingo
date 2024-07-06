'use client';

import { useState, useTransition } from 'react';

import { challengeOptions, challenges } from '@/db/schema';
import Header from './header';
import QuestionBubble from './question-bubble';
import Challenge from './challenge';
import Footer from './footer';
import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { toast } from 'sonner';
import { reduceHearts } from '@/actions/user-progress';

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
  const [isPending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);

  const [challenges, setChallenges] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const unCompletedChallengeIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );

    return unCompletedChallengeIndex === -1 ? 0 : unCompletedChallengeIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');

  const challenge = challenges[activeIndex];
  const options = challenge.challengeOptions || [];
  const title =
    challenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : challenge.question;

  const onSelect = (id: number) => {
    if (status !== 'none') return;
    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === 'wrong') {
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }

    if (status === 'correct') {
      onNext();
      setStatus('none');
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === 'Hearts') {
              console.log('Not enough hearts');
              return;
            }

            setStatus('correct');
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch((error) =>
            toast.error('Something went wrong, please try again later')
          );
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === 'hearts') {
              console.log('Not enough hearts');
              return;
            }

            setStatus('wrong');

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch((error) =>
            toast.error('Something went wrong, please try again later')
          );
      });
    }
  };

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
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={isPending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        status={status}
        disabled={isPending || !selectedOption}
        onCheck={onContinue}
      />
    </>
  );
}
