import chalk from "chalk";
import path from "path";
import ora from "ora";
import { notesDir, gamesDir, booksDir } from "./config";
import { createGame, deleteAllGames } from "../backend/data/games";
import parseNotesDir from "./parseNotesDir";
import { createBook, deleteAllBooks } from "../backend/data/books";

let spinner = ora("Deleting old games").start();

await deleteAllGames();

spinner.succeed(chalk.green`Deleted old games`);

spinner = ora("Deleting old books").start();

await deleteAllBooks();

spinner.succeed(chalk.green`Deleted old books`);

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

spinner = ora("Reading book files").start();

const booksPath = path.join(notesDir, booksDir);
const books = await parseNotesDir(booksPath);
books.forEach((book) => {
  createBook({
    name: path.basename(book.filePath, ".md"),
    filePath: book.filePath,
    rating: book.data.rating,
    status: book.data.status,
    tags: book.data.tags?.join?.(", "),
    content: book.content,
  });
});

spinner.succeed(chalk.green`Finished reading books`);
