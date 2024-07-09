'use client';

import { useState, useTransition } from 'react';
import Confetti from 'react-confetti';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAudio, useWindowSize, useMount } from 'react-use';

import { challengeOptions, challenges } from '@/db/schema';
import { upsertChallengeProgress } from '@/actions/challenge-progress';
import { reduceHearts } from '@/actions/user-progress';

import { useHeartModal } from '@/store/use-hearts-modal';
import { usePracticeModal } from '@/store/use-practice-modal';

import Header from './header';
import QuestionBubble from './question-bubble';
import Challenge from './challenge';
import Footer from './footer';
import ResultCard from './result-card';

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
  const { open: openHeartsModal } = useHeartModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const [correctAudio, _c, correctControls] = useAudio({
    src: '/correct.wav',
  });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: '/incorrect.wav',
  });
  const [finishAudio] = useAudio({
    src: '/finish.mp3',
    autoPlay: true,
  });

  const { height, width } = useWindowSize();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [lessonId, setLessonId] = useState(initialLessonId);

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

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          height={height}
          width={width}
          numberOfPieces={500}
          tweenDuration={10000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            alt="Finish"
            src="/finish.svg"
            className="hidden lg:block"
            height={100}
            width={100}
          />
          <Image
            alt="Finish"
            src="/finish.svg"
            className="lg:hidden block"
            height={50}
            width={50}
          />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great Job! <br /> You&apos;ve completed the lesson.
          </h1>

          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push('/learn')}
        />
      </>
    );
  }
  const title =
    challenge.type === 'ASSIST'
      ? 'Select the correct meaning'
      : challenge.question;
  const options = challenge.challengeOptions || [];

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
              openHeartsModal();
              return;
            }
            correctControls.play();
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
              openHeartsModal();
              return;
            }
            incorrectControls.play();
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
      {correctAudio}
      {incorrectAudio}
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
