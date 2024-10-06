import type { Filetype } from "./filetype";

const dFiletype = importModule<typeof Filetype>("./filetype");

class Storage<T extends string> extends dFiletype<"Storage", T, true> {
  constructor(
    type: literalful<T>,
    app: stringful,
    file?: Null<string>,
    ext?: string,
  ) {
    super(
      true,
      "Storage",
      type,
      app,
      file ?? app,
      ext,
    );
  }

  public override write(
    data: unknown,
    overwrite:
      | "line"
      | "append"
      | boolean = true,
  ) {
    const { file } = this,
    buffer = data ?? null;

    if (buffer === null)
      throw new TypeError("No data to write");
    else if (typeof buffer === "object")
      if (Array.isArray(buffer) && buffer.every(i => typeof i === "string"))
        file.write(
          buffer.reverse().join("\n"),
          overwrite === false ? false : "line",
        );
      else
        file.write(JSON.stringify(buffer), overwrite !== false);

    else
      file.write(String(buffer), overwrite);
  }

  protected override delete(): void {
    this.file.delete();
  }
}

module.exports = Storage;
export type { Storage };
