import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Seeding database...');

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/spanish.svg',
      },
      {
        id: 2,
        title: 'Hindi',
        imageSrc: '/india.svg',
      },
      {
        id: 3,
        title: 'English',
        imageSrc: '/british.svg',
      },
      {
        id: 4,
        title: 'Italian',
        imageSrc: '/italian.svg',
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: 'Unit 1',
        description: 'Learn the basics of Spanish',
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1: learn the basics of Spanish
        order: 1,
        title: 'Nouns',
      },
      {
        id: 2,
        unitId: 1, // Unit 1: learn the basics of Spanish
        order: 2,
        title: 'Verbs',
      },
      {
        id: 3,
        unitId: 1, // Unit 1: learn the basics of Spanish
        order: 3,
        title: 'Adjectives',
      },
      {
        id: 4,
        unitId: 1, // Unit 1: learn the basics of Spanish
        order: 4,
        title: 'Phrases',
      },
      {
        id: 5,
        unitId: 1, // Unit 1: learn the basics of Spanish
        order: 5,
        title: 'Phrases',
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: 'SELECT',
        order: 1,
        question: 'Which one of these is the "The Man"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, //  which one of these is the man
        imageSrc: '/men.svg',
        correct: true,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        id: 2,
        challengeId: 1, //  which one of these is the man
        imageSrc: '/woman.svg',
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        id: 3,
        challengeId: 1, //  which one of these is the man
        imageSrc: '/robot.svg',
        correct: false,
        text: 'el robot',
        audioSrc: '/es_robot.mp3',
      },
    ]);

    console.log('Seeding database completed');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to seed database');
  }
};

main();
