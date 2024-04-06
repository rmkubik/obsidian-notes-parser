import { and, eq, gt } from "drizzle-orm";
import db from "./db/database";
import { Game, InsertPlay, games, plays } from "./db/schema";

export async function createPlay(play: InsertPlay) {
  try {
    await db.insert(plays).values(play).run();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function readPlaysAfterDate(date: Date) {
  return db.select().from(plays).where(gt(plays.date, date)).all();
}

export async function readGamesPlayedAfterDate(date: Date) {
  return await db
    .select()
    .from(games)
    .where(gt(plays.date, date))
    .leftJoin(plays, eq(games.id, plays.gameId))
    .all();
}

export async function readPlaysForGame(game: Game) {
  return await db.select().from(plays).where(eq(plays.gameId, game.id)).all();
}

export async function readPlaysAfterDateForGame(game: Game, date: Date) {
  return await db
    .select()
    .from(plays)
    .where(and(gt(plays.date, date), eq(plays.gameId, game.id)))
    .all();
}

export async function deleteAllPlays() {
  await db.delete(plays);
}
