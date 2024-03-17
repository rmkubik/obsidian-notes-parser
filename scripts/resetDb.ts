import path from "path";
import { Database } from "bun:sqlite";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbPath = path.join(__dirname, "../data/games.sqlite3");
console.log(`Initializing db: ${chalk.blue(dbPath)}`);

const database = new Database(dbPath);

database.prepare("DROP TABLE Games").run();
const createGamesTable = database.prepare(
  `CREATE TABLE Games
  (
    name TEXT,
    filePath TEXT NOT NULL UNIQUE,
    rating TEXT,
    status TEXT,
    tags TEXT,
    content TEXT
  )`
);
const info = createGamesTable.run();

console.log(info);
