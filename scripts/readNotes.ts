import { Database } from "bun:sqlite";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import path from "path";
import minimist from "minimist";
import chalk from "chalk";
import { $ } from "zx/core";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { games } from "./schema";
import getDirname from "../src/ingestion/getDirname";

const argv = minimist(process.argv.slice(2));

const __dirname = getDirname(import.meta.url);

const notesDir = argv._[0];

console.log(`Reading directory: ${chalk.blue(notesDir)}`);
const gamesDir = "games";
const gamesPath = path.join(notesDir, gamesDir);

console.log(path.join(__dirname, "../data/games.sqlite3"));

const sqlite = new Database(path.join(__dirname, "../data/games.sqlite3"));
const db = drizzle(sqlite);

const gamesList = await $`ls ${gamesPath}`;
const gameFiles = gamesList.stdout.split("\n");

for (let gameFile of gameFiles) {
  const gameContent = await $`cat ${path.join(gamesPath, gameFile)}`;
  const frontmatter = matter(gameContent.stdout);

  db.insert(games)
    .values({
      name: path.basename(gameFile),
      filePath: gameFile,
      rating: frontmatter.data.rating,
      status: frontmatter.data.status,
      tags: frontmatter.data.tags,
      content: frontmatter.content,
    })
    .run();
}
