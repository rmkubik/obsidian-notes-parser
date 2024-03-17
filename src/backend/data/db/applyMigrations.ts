import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import path from "path";
import getDirname from "../../../ingestion/getDirname";

const __dirname = getDirname(import.meta.url);
const migrationsPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "migrations"
);

async function applyMigrations(db) {
  await migrate(db, { migrationsFolder: migrationsPath });
}

export default applyMigrations;
