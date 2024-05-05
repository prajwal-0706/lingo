'use server';

import { getCourseById, getUserProgress } from '@/db/queries';
import { auth, currentUser } from '@clerk/nextjs';

const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = currentUser();

  if (!userId || !user) throw new Error('Unauthorized');

  const course = await getCourseById(courseId);

  if (!course) throw new Error('Course not found');

  // TODO: Enable once units and lessons are added
  // if (!course.units.length || !course.units[0].lessons.length)
  //   throw new Error('Course is empty');

  const existingUserProgress = await getUserProgress();
};
