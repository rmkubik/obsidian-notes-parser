import type { Config } from "drizzle-kit";
import { databasePath } from "../src/ingestion/config";

export default {
  schema: "./src/backend/data/db/schema.ts",
  out: "./migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: databasePath,
  },
  verbose: true,
  strict: true,
} satisfies Config;
