import { expect, it, describe, beforeEach, mock } from "bun:test";
import { createGame, readAllGames } from "../games";
import createTestDb from "../../../../testHelpers/createTestDb";
import applyMigrations from "../db/applyMigrations";

describe("createGame", () => {
  beforeEach(async () => {
    const db = createTestDb();
    await applyMigrations(db);
    mock.module("../db/database", () => ({ default: db }));
  });

  it("creates a new db record", async () => {
    await createGame({ name: "new test game", filePath: "new test game.md" });

    const games = await readAllGames();

    expect(games.length).toEqual(1);
    expect(games[0].name).toEqual("new test game");
  });
});
