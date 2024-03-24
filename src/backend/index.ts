import * as Bun from "bun";
import path from "path";
import { readAllGames } from "./data/games";
import { readLinksByToPath } from "./data/links";

const BASE_PATH = "./public";

Bun.serve({
  port: 8080,
  async fetch(req) {
    const { pathname } = new URL(req.url);

    if (pathname.startsWith("/api/games")) {
      const games = await readAllGames();
      const linkPromises = games.map(async (game) => {
        if (!game.name) return game;
        try {
          const links = await readLinksByToPath(game.name);
          return {
            ...game,
            links: links.map((link) => link.fromPath),
          };
        } catch (error) {
          console.error(error);
          return game;
        }
      });
      const gamesWithLinks = await Promise.all(linkPromises);
      return new Response(JSON.stringify(gamesWithLinks));
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
