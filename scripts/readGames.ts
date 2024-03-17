import chalk from "chalk";
import { readAllGames } from "../src/backend/data/games";

const games = await readAllGames();

console.log(`Read games: ${chalk.blue(games.length)}`);
