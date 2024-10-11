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

    const write = Array.isArray(content)
      ? {
          string: content.reverse().join("\n"),
          overwrite: overwrite === false ? false : "line" as const,
        }
      : typeof content === "object"
        ? {
            string: JSON.stringify(content),
            overwrite: overwrite !== false,
          }
        : {
            string: String(content),
            overwrite,
          };

    this.file.write(write.string, write.overwrite);
  }

  public override delete(): void {
    this.file.delete();
  }
}

module.exports = Storage;
export type { Storage };
