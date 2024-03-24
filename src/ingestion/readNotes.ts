import chalk from "chalk";
import path from "path";
import ora from "ora";
import { notesDir, gamesDir } from "./config";
import { createGame } from "../backend/data/games";
import parseNotesDir from "./parseNotesDir";

console.log(`Reading directory: ${chalk.blue(notesDir)}`);
const gamesPath = path.join(notesDir, gamesDir);

const spinner = ora("Reading game files").start();

const games = await parseNotesDir(gamesPath);
games.forEach((game) => {
  createGame({
    name: path.basename(game.filePath, ".md"),
    filePath: game.filePath,
    rating: game.data.rating,
    status: game.data.status,
    tags: game.data.tags,
    content: game.content,
  });
});

spinner.succeed(chalk.green`Finished reading games`);
