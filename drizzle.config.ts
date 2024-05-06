

import { type Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://Spendiedb_owner:7t8xImGYsSWA@ep-lingering-thunder-a5kcfrdz.us-east-2.aws.neon.tech/Spendiedb?sslmode=require",
  },
} satisfies Config;