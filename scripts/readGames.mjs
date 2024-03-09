#!/usr/bin/env zx

import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new Database(path.join(__dirname, "../data/games.sqlite3"));

const games = db.prepare("SELECT * FROM Games").all();

echo(JSON.stringify(games, undefined, 2));
