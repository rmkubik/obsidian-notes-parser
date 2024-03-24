import { eq } from "drizzle-orm";
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

export function readGameByName(name: string) {
  return db.select().from(games).where(eq(games.name, name)).get();
}

export async function updateGameById(id: number, game: InsertGame) {
  try {
    await db.update(games).set(game).where(eq(games.id, id)).run();
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateGameByName(name: string, game: InsertGame) {
  try {
    await db.update(games).set(game).where(eq(games.name, name)).run();
    return true;
  } catch (error) {
    return false;
  }
}
