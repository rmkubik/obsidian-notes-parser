import db from "./db/database";
import { Game, InsertGame, games } from "./db/schema";

export async function createGame(game: InsertGame) {
  try {
    await db.insert(games).values(game).run();

    return true;
  } catch (error) {
    return false;
  }
}

export function readAllGames() {
  return db.select().from(games).all();
}
