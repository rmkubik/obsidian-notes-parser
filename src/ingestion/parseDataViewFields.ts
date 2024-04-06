import { NoteFile } from "./parseNote";

function parseDataViewFields(note: NoteFile) {
  const content = note.content;
  const SEPARATOR = "::";
  const allDataViewSeparatorMatches = content.matchAll(
    new RegExp(SEPARATOR, "g")
  );
  const separatorIndices = [...allDataViewSeparatorMatches].map(
    (match) => match.index
  );
  const fields = separatorIndices
    .map((index) => {
      if (!index) return;

      // Find beginning of a dataview field
      // [key:: value] - inline field
      // (key:: value) - hidden inline field
      const leadingTerminatorIndex = findFirstMatchBeforeIndex(
        content,
        ["\n", "[", "("],
        index
      );

      // Look for a matching symbol to the starting one
      // If the match is the first line, there will be no newline char, default to looking for one
      const leadingTerminatorChar = content[leadingTerminatorIndex] ?? "\n";
      const charMap = {
        "\n": "\n",
        "[": "]",
        "(": ")",
      };
      const tailingSearchTarget = charMap[leadingTerminatorChar];

      const tailingTerminatorIndex = findFirstMatchAfterIndex(
        content,
        [tailingSearchTarget],
        index
      );

      const indexAfterLeadingTerminator = leadingTerminatorIndex + 1;
      // If the tailingSearchTarget is not found, then we DO want
      // to include the entire line. Otherwise, we do not want to
      // include the trailing terminator
      const effectiveTailingIndex =
        tailingTerminatorIndex === -1 ? undefined : tailingTerminatorIndex;

      return {
        key: content.slice(indexAfterLeadingTerminator, index).trim(),
        value: content
          .slice(index + SEPARATOR.length, effectiveTailingIndex)
          .trim(),
      };
    })
    // filter out any undefined field/matches
    .filter((index) => Boolean(index));

  // TODO: Obsidian & dataview supports link renaming
  // We need to add that here somehow

  return fields;
}

/**
 * Finds the first matching index of one of the needle characters
 * in the haystack starting at the provided index and working
 * backwards.
 *
 * @param haystack string to search within
 * @param needle array of single chars to search for
 * @param index index in the haystack to start searching from
 * @returns matching index or -1
 */
function findFirstMatchBeforeIndex(haystack, needle, index) {
  for (let i = index; i >= 0; i -= 1) {
    if (needle.includes(haystack[i])) return i;
  }

  return -1;
}

/**
 * Inverse of the previous function
 */
function findFirstMatchAfterIndex(haystack, needle, index) {
  for (let i = index; i < haystack.length; i += 1) {
    if (needle.includes(haystack[i])) return i;
  }

  return -1;
}

export default parseDataViewFields;
