export default class File<Filetype extends string> {
  private static readonly manager = FileManager.iCloud();
  protected readonly path;
  protected readonly parent;
  protected readonly exists;

  constructor(
    filetype: literalful<Filetype>,
    {
      file,
      folder = "",
    }: Field<"file", "folder">,
    public readonly mutable = false,
  ) {
    try {
      const bookmarked = File.manager.bookmarkExists(filetype);

      if (!bookmarked && !mutable)
        throw new ReferenceError("No file root found");

      const root = bookmarked
        ? File.manager.bookmarkedPath(filetype)
        : [
            File.manager.libraryDirectory(),
            filetype,
          ]
            .join("/"),
      subpath = [folder, file]
        .join("/")
        .split("/")
        .filter(segment => segment !== "");

      if (subpath.length === 0)
        throw new SyntaxError("No file subpath");

      this.path = [
        root,
        ...subpath,
      ]
        .join("/");
      this.parent = [
        root,
        ...subpath.slice(0, -1),
      ]
        .join("/");
      this.exists = File.manager.fileExists(this.path);
    }
    catch (e) {
      throw new Error(
        "Failed to handle file",
        {
          cause: new Error(
            `${filetype}:${folder}/${file}`,
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
          throw new ReferenceError("Non-existent file");

        return "";
      }

      return File.manager.readString(this.path);
    }
    catch (e) {
      throw this.error(e, "read");
    }
  }

  public readful() {
    const read = this.read(true);

    if (read === "")
      throw new TypeError("Unstringful file content", { cause: { path: this.path } });

    return read as stringful;
  }

  public write(
    data: Null<
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
    const { path, parent } = this;

    try {
      if (!this.mutable)
        throw new ReferenceError("Readonly file");
      else if (data === null)
        throw new TypeError("Null write data");
      else if (File.manager.isDirectory(path))
        throw new ReferenceError("Write target is folder");
      else if (this.exists) {
        if (overwrite === false)
          throw new ReferenceError("Mutable file but overwrite=false");
      }
      else if (!File.manager.isDirectory(parent))
        File.manager.createDirectory(parent, true);

      File.manager.writeString(
        path,
        Array.isArray(data)
          ? [
              data
                .reverse()
                .join("\n"),
              this.read(),
            ]
              .join("\n")
          : typeof data === "object"
            ? JSON.stringify(data)
            : typeof overwrite !== "string"
              ? String(data)
              : overwrite === "line"
                ? [
                    String(data),
                    this.read(),
                  ]
                    .join("\n")
                : [
                    this.read(),
                    String(data),
                  ]
                    .join(""),
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
