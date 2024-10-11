import type { Filetype } from "./filetype";

const dFiletype = importModule<typeof Filetype>("./filetype");

class Storage<T extends string> extends dFiletype<"Storage", T, true> {
  constructor(
    type: literalful<T>,
    app: stringful,
    name: string,
    ext: string,
  ) {
    super(
      true,
      "Storage",
      type,
      app,
      name,
      ext,
    );
  }

  public override write(
    content: unknown,
    overwrite:
      | "line"
      | "append"
      | boolean = true,
  ) {
    if (content === null || typeof content === "undefined")
      throw new TypeError("Write data is null", { cause: content });

    const { string, coerce }: { string: string; coerce: typeof overwrite } = Array.isArray(content)
      ? {
          string: content.reverse().join("\n"),
          coerce: overwrite === false ? false : "line",
        }
      : {
          string: JSON.stringify(content),
          coerce: typeof content === "object"
            ? overwrite !== false
            : overwrite,
        };

    this.file.write(string, coerce);
  }

  public override delete(): void {
    this.file.delete();
  }
}

module.exports = Storage;
export type { Storage };
