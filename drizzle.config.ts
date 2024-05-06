

import { type Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString:  process.env.NEXT_PUBLIC_POSTGRES_URL!,
  },
} satisfies Config;