import { describe, it, expect } from "bun:test";
import { noteFileFactory } from "../factories";
import parseDataViewFields from "../parseDataViewFields";
import { stripIndent } from "common-tags";

describe("parseDataViewFields", () => {
  it("parses different field keys", () => {
    const note = noteFileFactory.build({
      content: stripIndent`
        played:: test game
        not a dataview key
        other-field:: this is a value
      `,
    });

    const fields = parseDataViewFields(note);

    expect(fields).toEqual([
      {
        key: "played",
        value: "test game",
      },
      {
        key: "other-field",
        value: "this is a value",
      },
    ]);
  });

  it("parses indented fields", () => {
    const note = noteFileFactory.build({
      content: stripIndent`
        played:: normal1
            played:: space indents
        \tplayed:: tab indents
        played:: normal2
      `,
    });

    const fields = parseDataViewFields(note);

    expect(fields).toEqual([
      {
        key: "played",
        value: "normal1",
      },
      {
        key: "played",
        value: "space indents",
      },
      {
        key: "played",
        value: "tab indents",
      },
      {
        key: "played",
        value: "normal2",
      },
    ]);
  });

  it("should parse inline fields", () => {
    const note = noteFileFactory.build({
      content: stripIndent`
        played:: normal1
        This is an [inline field :: with a value] that should be parsed.
        [other_field:: other value   ]
      `,
    });

    const fields = parseDataViewFields(note);

    expect(fields).toEqual([
      {
        key: "played",
        value: "normal1",
      },
      {
        key: "inline field",
        value: "with a value",
      },
      {
        key: "other_field",
        value: "other value",
      },
    ]);
  });

  it("should parse hidden  inline fields", () => {
    const note = noteFileFactory.build({
      content: stripIndent`
        played:: normal1
        This is an (inline field :: with a value) that should be parsed.
        (other_field:: other value   )
      `,
    });

    const fields = parseDataViewFields(note);

    expect(fields).toEqual([
      {
        key: "played",
        value: "normal1",
      },
      {
        key: "inline field",
        value: "with a value",
      },
      {
        key: "other_field",
        value: "other value",
      },
    ]);
  });
});
