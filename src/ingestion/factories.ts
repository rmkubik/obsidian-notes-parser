import { Factory } from "fishery";
import { NoteFile } from "./parseNote";

export const noteFileFactory = Factory.define<NoteFile>(({ sequence }) => {
  return {
    // Use sequence to create unique file path per note
    filePath: `path/${sequence}`,
    data: {},
    content: "File contents",
  };
});
