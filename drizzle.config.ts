import 'dotenv/config';
import type { Config } from 'drizzle-kit';

console.log(process.env.DATABASE_URL);
export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
