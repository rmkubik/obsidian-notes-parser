import * as Bun from "bun";
import path from "path";
import { readAllGames } from "./data/games";
import { readLinksByToPath } from "./data/links";
import { readPlaysForGame } from "./data/plays";
import { readAllBooks } from "./data/books";
import { readReadsForBook } from "./data/reads";

const BASE_PATH = "./public";

Bun.serve({
  port: 8080,
  async fetch(req) {
    const { pathname } = new URL(req.url);

    // Redirect root path to app
    if (pathname === "/") return Response.redirect("/app", 301);

    if (pathname.startsWith("/api/games")) {
      const games = await readAllGames();
      const linkPromises = games.map(async (game) => {
        if (!game.name) return game;
        try {
          const links = await readLinksByToPath(game.name);
          const plays = await readPlaysForGame(game);

          return {
            ...game,
            links: links.map((link) => link.fromPath),
            plays: plays.map((play) => play.date),
          };
        } catch (error) {
          console.error(error);
          return game;
        }
      });
      const gamesWithLinks = await Promise.all(linkPromises);
      return new Response(JSON.stringify(gamesWithLinks));
    }

    if (pathname.startsWith("/api/books")) {
      const books = await readAllBooks();
      const linkPromises = books.map(async (book) => {
        if (!book.name) return book;
        try {
          const links = await readLinksByToPath(book.name);
          const reads = await readReadsForBook(book);

          return {
            ...book,
            links: links.map((link) => link.fromPath),
            reads: reads.map((play) => play.date),
          };
        } catch (error) {
          console.error(error);
          return book;
        }
      });
      const booksWithLinks = await Promise.all(linkPromises);
      return new Response(JSON.stringify(booksWithLinks));
    }

    /**
     * Let client handle all /app routing
     */
    if (pathname.startsWith("/app")) {
      // We don't have a special "index.html" for the app
      const filePath = path.join(BASE_PATH, "index.html");
      const file = Bun.file(filePath);

      return new Response(file);
    }

    const extname = path.extname(pathname);

    if (extname === "") {
      try {
        // If no extname, try index.html instead
        const filePath = path.join(BASE_PATH, pathname, "index.html");
        const file = Bun.file(filePath);

        return new Response(file);
      } catch (err) {}

      try {
        // Otherwise, fallthrough to .html instead
        // Is this actually normal webserver behavior?
        const filePath = path.join(BASE_PATH, pathname + ".html");
        const file = Bun.file(filePath);

        return new Response(file);
      } catch (err) {}
    }

    const filePath = path.join(BASE_PATH, pathname);
    const file = Bun.file(filePath);

    return new Response(file);
  },
  error(error) {
    console.error(error);
    return new Response("404", { status: 404 });
  },
});
