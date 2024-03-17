import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { databasePath } from "../../../ingestion/config";

const sqlite = new Database(databasePath);
const db = drizzle(sqlite);

export default db;
