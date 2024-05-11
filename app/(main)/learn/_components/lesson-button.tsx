'use client';

import { Check, Crown, Star } from 'lucide-react';

type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export default function LessonButton({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: LessonButtonProps) {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;
  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked && percentage === 100;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : `/lesson`;

  return <div className=""></div>;
}
