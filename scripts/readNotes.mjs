#!/usr/bin/env zx

import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const notesDir = argv._[0];

echo`Reading directory: ${chalk.blue(notesDir)}`;
const gamesDir = "games";
const gamesPath = path.join(notesDir, gamesDir);

echo(path.join(__dirname, "../data/games.sqlite3"));

const db = new Database(path.join(__dirname, "../data/games.sqlite3"));

const gamesList = await $`ls ${gamesPath}`;
const gameFiles = gamesList.stdout.split("\n");

for (let gameFile of gameFiles) {
  const gameContent = await $`cat ${path.join(gamesPath, gameFile)}`;
  const frontmatter = matter(gameContent.stdout);

  db.prepare(
    `INSERT INTO Games
    (
      name,
      filePath,
      rating,
      status,
      tags,
      content
    )
    VALUES
    (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )`
  ).run(
    path.basename(gameFile),
    gameFile,
    frontmatter.data.rating,
    frontmatter.data.status,
    frontmatter.data.tags,
    frontmatter.content
  );
}
