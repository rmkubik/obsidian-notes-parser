import { $ } from "zx/core";
import matter, { GrayMatterFile } from "gray-matter";
import chalk from "chalk";
import path from "path";
import { notesDir } from "./config";

export type NoteFile = {
  filePath: string;
} & Pick<GrayMatterFile<string>, "content" | "data">;

async function parseNote(filePath: string): Promise<NoteFile | null> {
  const fileContent = await $`cat ${filePath}`.quiet();
  const relativeFilePath = path.relative(notesDir, filePath);

  try {
    const note = matter(fileContent.stdout);
    return { ...note, filePath: relativeFilePath };
  } catch (err) {
    console.log(
      `${chalk.red("Failed to parse frontmatter: ")}${
        err.name
      }\nFile name: ${relativeFilePath}`
    );
    return null;
  }
}

export default parseNote;
