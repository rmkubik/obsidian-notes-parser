import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

function createTestDb() {
  const sqlite = new Database(":memory:");
  const db = drizzle(sqlite);

  return db;
}

export default createTestDb;
