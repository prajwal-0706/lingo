import { lessons, units } from '@/db/schema';
import React from 'react';
import UnitBanner from './unit-banner';
import LessonButton from './lesson-button';

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;

  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];

  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;

  activeLessonPercentage: number;
};

export default function Unit({
  id,
  order,
  title,
  lessons,
  description,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) {
  return (
    <React.Fragment>
      <UnitBanner description={description} title={title} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = activeLesson?.id === lesson.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}
