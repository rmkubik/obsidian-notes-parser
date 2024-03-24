import { NoteFile } from "./parseNote";

const InternalLinkRegex = /\[\[(.+?)\]\]/g;

function parseLinkedNotes(note: NoteFile) {
  const content = note.content;
  const matches = content.matchAll(InternalLinkRegex);

  // TODO: Obsidian supports link renaming
  // We need to add that to the regex

  return [...matches].map(([_, noteLinkPath]) => {
    return noteLinkPath;
  });
}

export default parseLinkedNotes;
