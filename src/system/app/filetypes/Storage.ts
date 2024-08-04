import type { Filetype } from "./filetype/index";

const dFiletype = importModule<typeof Filetype>("./filetype/index");

class Storage<AT extends string> extends dFiletype<"Storage", AT, true> {
  constructor(
    apptype: literalful<AT>,
    app: stringful,
    file?: Null<string>,
    ext?: Null<string>,
  ) {
    const folder = app;

    super(
      "Storage",
      apptype,
      true,
      file ?? app,
      ext,
      folder,
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
        throw new TypeError("Tried to write null data");
      else if (typeof buffer === "object")
        if (Array.isArray(buffer) && buffer.every(i => typeof i === "string"))
          file.write(buffer.reverse().join("\n"), overwrite === false ? false : "line");
        else
          file.write(JSON.stringify(buffer), overwrite !== false);

      else
        file.write(String(buffer), overwrite);
    }
    catch (e) {
      throw new Error(`Storage: write (${String(this)})`, { cause: e });
    }
  }
}

module.exports = Storage;
export type { Storage };
