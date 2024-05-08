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

    console.log('Seeding database completed');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to seed database');
  }
};

main();
