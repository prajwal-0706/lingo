'use client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { courses, userProgress } from '@/db/schema';
import { upsertUserProgress } from '@/actions/user-progress';

import Card from './card';

type ListProps = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export default function List({ courses, activeCourseId }: ListProps) {
  const router = useRouter();
  const [pending, StartTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (activeCourseId === id) {
      return router.push('/learn');
    }

    StartTransition(() => {
      upsertUserProgress(id).catch((err) =>
        toast.error('Something went wrong. Please try again!!')
      );
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          active={course.id === activeCourseId}
          disabled={pending}
        />
      ))}
    </div>
  );
}
