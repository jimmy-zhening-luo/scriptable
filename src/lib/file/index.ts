export default class File<Type extends string> {
  private static readonly manager = FileManager.iCloud();
  protected readonly path;
  protected readonly parent;
  protected readonly exists;

  constructor(
    type: Literalful<Type>,
    name: string,
    subfolder = "",
    public readonly mutable = false,
  ) {
    try {
      const root = File.manager.bookmarkExists(type)
        ? File.manager.bookmarkedPath(type)
        : mutable
          ? [
              File.manager.libraryDirectory(),
              type,
            ].join("/")
          : null;

      if (root === null)
        throw new ReferenceError("No file root");

      const subpath = [subfolder, name]
        .join("/")
        .split("/")
        .filter(segment => segment !== "");

      if (subpath.length === 0)
        throw new SyntaxError("No file subpath");

      const path = [root, ...subpath];

      this.path = path
        .join("/");
      this.parent = path
        .slice(0, -1)
        .join("/");
      this.exists = File.manager.fileExists(this.path);
    }
    catch (e) {
      throw new Error(
        "Failed to construct file handler",
        {
          cause: new Error(
            `<${type}> ${subfolder}/${name}`,
            { cause: e },
          ),
        },
      );
    }
  }

  public read(fail = false) {
    try {
      if (!this.exists) {
        if (fail)
          throw new ReferenceError("File does not exist");

        return "";
      }

      return File.manager.readString(this.path);
    }
    catch (e) {
      throw this.error(e, "read");
    }
  }

  public readful() {
    const content = this.read(true);

    if (content === "")
      throw this.error(
        new TypeError("Empty file"),
        "readful",
      );

    return content as stringful;
  }

  public write(
    content: Null<
      | string
      | number
      | boolean
      | readonly (string | number | boolean)[]
      | ReadonlyRecord<string, unknown>
    > = null,
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    try {
      if (!this.mutable)
        throw new ReferenceError("Readonly file");
      else if (content === null)
        throw new TypeError("Null write-data");
      else if (File.manager.isDirectory(this.path))
        throw new ReferenceError("Write target is folder");
      else if (this.exists) {
        if (overwrite === false)
          throw new ReferenceError("File already exists, and overwrite:false");
      }
      else if (!File.manager.isDirectory(this.parent))
        File.manager.createDirectory(
          this.parent,
          true,
        );

      File.manager.writeString(
        this.path,
        Array.isArray(content)
          ? [
              content
                .toReversed()
                .join("\n"),
              this.read(),
            ].join("\n")
          : typeof content === "object"
            ? JSON.stringify(content)
            : typeof overwrite !== "string"
              ? String(content)
              : overwrite === "line"
                ? [
                    String(content),
                    this.read(),
                  ].join("\n")
                : (this.read() + String(content)),
      );
    }
    catch (e) {
      throw this.error(e, "write");
    }
  }

  public delete() {
    try {
      if (!this.mutable)
        throw new ReferenceError("Readonly file");

      if (this.exists)
        File.manager.remove(this.path);
    }
    catch (e) {
      throw this.error(e, "delete");
    }
  }

  private error(e: unknown, verb: string) {
    return new Error(
      `Failed to ${verb} file`,
      {
        cause: new Error(
          this.path,
          { cause: e },
        ),
      },
    );
  }
}
