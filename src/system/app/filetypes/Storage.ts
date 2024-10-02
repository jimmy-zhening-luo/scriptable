import type { Filetype } from "./filetype/index";

const dFiletype = importModule<typeof Filetype>("./filetype/index");

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

  public write(
    data: unknown,
    overwrite:
      | "line"
      | "append"
      | boolean = true,
  ) {
    try {
      const { file } = this,
      buffer = data ?? null;

      if (buffer === null)
        throw new TypeError("Cannot write null data");
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
    catch (e) {
      throw new Error(`Storage: write (${this.name})`, { cause: e });
    }
  }

  protected delete(): void {
    this.file.delete();
  }
}

module.exports = Storage;
export type { Storage };
