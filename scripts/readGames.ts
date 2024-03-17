import chalk from "chalk";
import { readAllGames } from "../src/backend/data/games";

const games = await readAllGames();

console.log(`Count of read games: ${chalk.blue(games.length)}`);
