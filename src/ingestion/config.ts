import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const notesDir = process.env.NOTES_DIRECTORY as string;
export const gamesDir = process.env.GAMES_DIRECTORY as string;
export const databasePath = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "notes.sqlite3"
);
