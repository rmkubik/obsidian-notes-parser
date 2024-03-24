import { eq } from "drizzle-orm";
import db from "./db/database";
import { InsertLink, links } from "./db/schema";

export async function createLink(link: InsertLink) {
  try {
    await db.insert(links).values(link).run();
    return true;
  } catch (error) {
    return false;
  }
}

export function readLinksByFromPath(fromPath: string) {
  return db.select().from(links).where(eq(links.fromPath, fromPath)).all();
}

export function readLinksByToPath(toPath: string) {
  return db.select().from(links).where(eq(links.toPath, toPath)).all();
}

export async function deleteAllLinks() {
  await db.delete(links);
}
