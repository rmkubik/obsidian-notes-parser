# Obsidian Parser

This project ingests my Obsidian notes into a SQLite DB so I can work with the data in them more usefully. Obsidian is much better for input and linking of notes than actual processing of data. I miss the database features of Notion in this way, mostly.

This project uses `bun` for scripting. We're using `zx` for running scripts. The database is `sqlite3` and uses `drizzle` as an ORM, then `drizzle-kit` on the CLI for managing migrations.

Inspect database contents - you can use `SQLite Explorer` VS Code extension - right click on the db file `data/notes.sqlite3` and pick `Open Database`.

## How to use

Currently, this project is very WIP. The steps to getting a list of games that you can manipulate is pretty jank right now.

There's a `games` table and a `links` table in the DB. These are both populated by walking the notes directory in various ways, as specified in the `.env` file paths.

Steps to get games table:

1. `bun src/ingestion/readNotes.ts` (populates all games in the db)
2. `bun src/ingestion/test.ts` (creates links between pages and play count info)
3. `bun start` (runs dev server)
4. Visit: [http://localhost:8080](http://localhost:8080).

These commands super temporary, but it's unlikely I'll be revisiting this project for little while. So I wanted to document how to use it this time since I just relearned a bunch about it.

## Sqlite Debugger

I also installed a VS Code extension called `SQLite`. It lets you right click on a SQLite file (like the `data/notes.sqlite3` in this project) and open it up. It shows you all the tables in that database in a `SQLITE EXPLORER` tab in the left bar. You can view the table contents and run select queries against them. This has pretty been useful to quickly diagnose issues with this project.
