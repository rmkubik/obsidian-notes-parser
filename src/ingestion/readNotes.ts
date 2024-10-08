import chalk from "chalk";
import path from "path";
import ora from "ora";
import { notesDir, gamesDir } from "./config";
import { createGame, deleteAllGames } from "../backend/data/games";
import parseNotesDir from "./parseNotesDir";

let spinner = ora("Deleting old games").start();

await deleteAllGames();

spinner.succeed(chalk.green`Deleted old games`);

console.log(`Reading directory: ${chalk.blue(notesDir)}`);
const gamesPath = path.join(notesDir, gamesDir);

spinner = ora("Reading game files").start();

const games = await parseNotesDir(gamesPath);
games.forEach((game) => {
  createGame({
    name: path.basename(game.filePath, ".md"),
    filePath: game.filePath,
    rating: game.data.rating,
    status: game.data.status,
    tags: game.data.tags?.join?.(", "),
    content: game.content,
  });
});

spinner.succeed(chalk.green`Finished reading games`);
