import chalk from "chalk";
import { $ } from "zx/core";
import path from "path";
import matter from "gray-matter";
import ora from "ora";
import { notesDir, gamesDir } from "./config";
import { createGame } from "../backend/data/games";

console.log(`Reading directory: ${chalk.blue(notesDir)}`);
const gamesPath = path.join(notesDir, gamesDir);

const gamesList = await $`ls ${gamesPath}`.quiet();
const gameFiles = gamesList.stdout.trim().split("\n");

const spinner = ora("Reading game files").start();

for (let gameFile of gameFiles) {
  const gameContent = await $`cat ${path.join(gamesPath, gameFile)}`.quiet();

  let frontmatter;
  try {
    frontmatter = matter(gameContent.stdout);
  } catch (err) {
    console.log(
      `${chalk.red("Failed to parse frontmatter")} - ${
        err.name
      }\nFile name: ${gameFile}`
    );
    continue;
  }

  const success = createGame({
    name: path.basename(gameFile, ".md"),
    filePath: gameFile,
    rating: frontmatter.data.rating,
    status: frontmatter.data.status,
    tags: frontmatter.data.tags,
    content: frontmatter.content,
  });

  if (!success) {
    console.log(chalk.red`Insert failed`);
  }
}

spinner.succeed(chalk.green`Finished reading games`);
