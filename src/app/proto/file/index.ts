export default class File<Type extends string> {
  private static readonly manager = FileManager.iCloud();
  protected readonly path;
  protected readonly parent;
  protected readonly exists;

  constructor(
    type: literalful<Type>,
    {
      file,
      folder = "",
    }: Field<"file", "folder">,
    public readonly mutable = false,
  ) {
    try {
      const { manager } = File,
      bookmarked = manager.bookmarkExists(type);

      if (!bookmarked && !mutable)
        throw new ReferenceError("Missing file root");

      const root = bookmarked
        ? manager.bookmarkedPath(type)
        : [
            manager.libraryDirectory(),
            type,
          ].join("/"),
      subpath = [folder, file]
        .join("/")
        .split("/")
        .filter(segment => segment !== "");

      if (subpath.length === 0)
        throw new SyntaxError("Empty file subpath");

      this.path = [root, ...subpath].join("/");
      this.parent = [
        root,
        ...subpath.slice(0, -1),
      ].join("/");
      this.exists = manager.fileExists(this.path);
    }
    catch (e) {
      throw new Error(
        "File handler construction failed",
        {
          cause: new Error(
            `[Filetype: '${type}'] Subpath: '${folder}/${file}'`,
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
      | Readonly<Record<string, unknown>>
    > = null,
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    try {
      const { manager } = File,
      {
        path,
        parent,
      } = this;

      if (!this.mutable)
        throw new ReferenceError("Readonly file");
      else if (content === null)
        throw new TypeError("Null write-data");
      else if (manager.isDirectory(path))
        throw new ReferenceError("Write target is folder");
      else if (this.exists) {
        if (overwrite === false)
          throw new ReferenceError("File already exists, and overwrite:false");
      }
      else if (!manager.isDirectory(parent))
        manager.createDirectory(parent, true);

      manager.writeString(
        path,
        Array.isArray(content)
          ? [
              content
                .reverse()
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
                : [
                    this.read(),
                    String(content),
                  ].join(""),
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
      `Failed to '${verb}' file`,
      {
        cause: new Error(
          this.path,
          { cause: e },
        ),
      },
    );
  }
}
