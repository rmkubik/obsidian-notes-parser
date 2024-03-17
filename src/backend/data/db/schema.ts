import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const games = sqliteTable("games", {
  id: integer("id").primaryKey(),
  name: text("name"),
  filePath: text("filePath").notNull().unique(),
  rating: text("rating"),
  status: text("status"),
  tags: text("tags"),
  content: text("content"),
});

export type Game = typeof games.$inferSelect; // return type when queried
export type InsertGame = typeof games.$inferInsert; // insert type
