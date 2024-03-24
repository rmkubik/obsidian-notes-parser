import { $ } from "zx/core";
import path from "path";
import parseNote, { NoteFile } from "./parseNote";

async function parseNotesDir(directory: string) {
  const lsOutput = await $`ls ${directory}`.quiet();
  const fileNames = lsOutput.stdout.trim().split("\n");

  const notes: NoteFile[] = [];

  for (let fileName of fileNames) {
    const filePath = path.join(directory, fileName);
    const note = await parseNote(filePath);
    if (!note) {
      continue;
    }

    notes.push(note);
  }

  return notes;
}

export default parseNotesDir;
