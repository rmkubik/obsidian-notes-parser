# Obsidian Parser

This project ingests my Obsidian notes into a SQLite DB so I can work with the data in them more usefully. Obsidian is much better for input and linking of notes than actual processing of data. I miss the database features of Notion in this way, mostly.

This project uses `bun` for scripting. We're using `zx` for running scripts. The database is `sqlite3` and uses `drizzle` as an ORM, then `drizzle-kit` on the CLI for managing migrations.

Inspect database contents - you can use `SQLite Explorer` VS Code extension - right click on the db file `data/notes.sqlite3` and pick `Open Database`.
