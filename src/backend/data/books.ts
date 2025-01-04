import { eq } from "drizzle-orm";
import db from "./db/database";
import { Book, InsertBook, books } from "./db/schema";

export async function createBook(book: InsertBook) {
  try {
    await db.insert(books).values(book).run();
    return true;
  } catch (error) {
    console.log(book, error);
    return false;
  }
}

export function readAllBooks() {
  return db.select().from(books).all();
}

export function readBookByName(name: string) {
  return db.select().from(books).where(eq(books.name, name)).get();
}

export async function updateBookById(id: number, book: InsertBook) {
  try {
    await db.update(books).set(book).where(eq(books.id, id)).run();
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateBookByName(name: string, book: InsertBook) {
  try {
    await db.update(books).set(book).where(eq(books.name, name)).run();
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteAllBooks() {
  await db.delete(books);
}
