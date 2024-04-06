import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

// it makes the most generic sense
// to ONLY have a notes table...
// but I want to actually query on
// all my frontmatter properties

export const games = sqliteTable("games", {
  id: integer("id").primaryKey(),
  name: text("name"),
  filePath: text("filePath").notNull().unique(),
  rating: text("rating"),
  status: text("status"),
  tags: text("tags"),
  content: text("content"),
});

export type Game = typeof games.$inferSelect;
export type InsertGame = typeof games.$inferInsert;

export const links = sqliteTable(
  "links",
  {
    fromPath: text("fromPath").notNull(),
    toPath: text("toPath").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.fromPath, table.toPath] }),
    };
  }
);

export type Link = typeof links.$inferSelect;
export type InsertLink = typeof links.$inferInsert;

export const plays = sqliteTable("plays", {
  gameId: integer("gameId").references(() => games.id),
  content: text("content"),
  date: integer("date", { mode: "timestamp" }),
});

export type Play = typeof plays.$inferSelect;
export type InsertPlay = typeof plays.$inferInsert;
