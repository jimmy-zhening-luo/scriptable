export default class File<Type extends string> {
  private static readonly manager = FileManager.iCloud();
  private readonly path;
  private readonly parent;
  private readonly exists;

  constructor(
    type: Literalful<Type>,
    name: string,
    subfolder = "",
    private readonly mutable = false,
    ephemeral = false,
  ) {
    try {
      const root = File.manager.bookmarkExists(type)
        ? File.manager.bookmarkedPath(type)
        : mutable
          ? [
              File.manager[
                ephemeral
                  ? "cacheDirectory"
                  : "libraryDirectory"
              ](),
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

      this.path = [
        root,
        ...subpath,
      ].join("/");
      this.parent = [
        root,
        ...subpath
          .slice(0, -1),
      ].join("/");
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

  public toString(fail?: boolean): string {
    return this.read(fail) ?? "";
  }

  public read(fail = false) {
    try {
      if (!this.exists) {
        if (fail)
          throw new ReferenceError("Non-existent file");

        return undefined;
      }

      return File.manager.readString(this.path);
    }
    catch (e) {
      throw this.error("read", e);
    }
  }

  public readful() {
    const content = this.toString(true);

    if (content === "")
      throw this.error(
        "readful",
        new TypeError("Empty file content"),
      );

    return content as stringful;
  }

  public write(
    content: Null<
      | string
      | number
      | boolean
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
        typeof content === "object"
          ? JSON.stringify(content)
          : typeof overwrite !== "string"
            ? String(content)
            : overwrite === "line"
              ? [
                  String(content),
                  String(this),
                ].join("\n")
              : String(this)
                + String(content),
      );
    }
    catch (e) {
      throw this.error("write", e);
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
      throw this.error("delete", e);
    }
  }

  private error(
    verb: string,
    error: unknown,
  ) {
    return new Error(
      `Failed to ${verb} file`,
      {
        cause: new Error(
          this.path,
          { cause: error },
        ),
      },
    );
  }
}
