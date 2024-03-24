import path from "path";
import klaw from "klaw";
import through2 from "through2";
import micromatch from "micromatch";
import parseNotesDir from "./parseNotesDir";
import { gamesDir, notesDir } from "./config";
import parseLinkedNotes from "./parseLinkedNotes";
import parseNote from "./parseNote";
import { createLink, deleteAllLinks } from "../backend/data/links";
import ora from "ora";
import chalk from "chalk";

// const gamesPath = path.join(notesDir, gamesDir);
// const games = await parseNotesDir(gamesPath);
// const game = games.find((game) =>
//   game.filePath.includes("Twilight Imperium.md")
// );
// if (game) {
//   console.log(parseLinkedNotes(game));
// }

const excludedGlobs = ["**/.obsidian/**"];
const excludedGlobsFilter = through2.obj(function (item, enc, next) {
  if (!micromatch.isMatch(item.path, excludedGlobs)) this.push(item);
  next();
});
const mdOnlyFilter = through2.obj(function (item, enc, next) {
  if (path.extname(item.path) === ".md") this.push(item);
  next();
});

let spinner = ora("Deleting old links").start();

await deleteAllLinks();

spinner.succeed(chalk.green`Deleted old links`);

spinner = ora("Reading note files").start();

let noteCount = 0;
klaw(notesDir)
  .pipe(excludedGlobsFilter)
  .pipe(mdOnlyFilter)
  .on("readable", async function () {
    const item = this.read();
    try {
      const note = await parseNote(item.path);
      if (note) {
        noteCount += 1;
        const links = parseLinkedNotes(note);
        links.forEach((link) =>
          createLink({
            fromPath: path.basename(item.path, ".md"),
            toPath: link,
          })
        );
      }
    } catch (error) {
      console.error("Error parsing file", item);
    }
  })
  .on("error", (err, item) => {
    console.log(err.message);
    console.log(item.path); // the file the error occurred on
  })
  .on("end", () => {
    spinner.succeed(chalk.green`Finished reading note count: ` + noteCount);
  });

// to parse backlinks
// we need to klaw the entire notes directory
// build a Note for each Note
// find all links in each Note
// we need to build a graph, with links in each direction
//
// links are built by
// - finding a note anywhere by this name
//
// obsidian "shortest path when possible"
// If the file name is unique, then it’s just the filename.
// If it’s not unique, then it’s the absolute path from the vault root
//
// this means, if there is a dupe, then JUST the basename will be the root one
// if it's ambiguous, you just return the first matching note alphabetically
//
// i think i could just create a DB entry for each link between 2 notes
// then you look up the backlinks by searching the table backwards
