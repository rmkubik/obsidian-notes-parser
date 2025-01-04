import { and, eq, gt } from "drizzle-orm";
import db from "./db/database";
import { Book, InsertRead, books, reads } from "./db/schema";

export async function createRead(read: InsertRead) {
  try {
    await db.insert(reads).values(read).run();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function readReadsAfterDate(date: Date) {
  return db.select().from(reads).where(gt(reads.date, date)).all();
}

export async function readBooksReadAfterDate(date: Date) {
  return await db
    .select()
    .from(books)
    .where(gt(reads.date, date))
    .leftJoin(reads, eq(books.id, reads.bookId))
    .all();
}

export async function readReadsForBook(book: Book) {
  return await db.select().from(reads).where(eq(reads.bookId, book.id)).all();
}

export async function readReadsAfterDateForBook(book: Book, date: Date) {
  return await db
    .select()
    .from(reads)
    .where(and(gt(reads.date, date), eq(reads.bookId, book.id)))
    .all();
}

export async function deleteAllReads() {
  await db.delete(reads);
}
