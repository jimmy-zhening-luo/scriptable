export default class File<Class extends string> {
  private static readonly manager = FileManager.local();
  private readonly path;
  private readonly parent;
  private readonly exists;
  private readonly folder;

  constructor(
    Class: Literalful<Class>,
    name: string,
    subfolder = "",
    private readonly mutable = false,
    ephemeral = false,
  ) {
    const root = File.manager.bookmarkExists(Class)
      ? File.manager.bookmarkedPath(Class)
      : mutable
        ? [
            File.manager[
              ephemeral
                ? "cacheDirectory"
                : "libraryDirectory"
            ](),
            Class,
          ]
            .join("/")
        : null;

    if (root === null)
      throw new ReferenceError(
        "No directory root provided",
        { cause: `<${Class}> ${subfolder}/${name}` },
      );

    const subpath = [
      ...subfolder.split("/"),
      ...name.split("/"),
    ]
      .filter(segment => segment !== "");

    if (subpath.length === 0)
      throw new ReferenceError(
        "No file subpath provided",
        { cause: `<${Class}> ${subfolder}/${name}` },
      );

    this.path = [root, ...subpath].join("/");
    this.parent = [
      root,
      ...subpath.slice(0, -1),
    ]
      .join("/");
    this.exists = File.manager.fileExists(this.path);
    this.folder = File.manager.isDirectory(this.path);
  }

  public read(fail = false) {
    if (this.exists) {
      if (this.folder)
        throw this.error(
          "read",
          new TypeError("Filesystem object is Folder"),
        );
    }
    else {
      if (fail)
        throw this.error(
          "read",
          new ReferenceError("File does not exist"),
        );

      return undefined;
    }

    return File.manager.readString(this.path);
  }

  public readString(fail?: boolean): string {
    return this.read(fail) ?? "";
  }

  public readStringful() {
    const content = this.readString(true);

    if (content === "")
      throw this.error(
        "readStringful",
        new TypeError("Empty file content"),
      );

    return content as stringful;
  }

  public write(
    content?:
      | string
      | number
      | boolean
      | ReadonlyRecord<string, unknown>,
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    if (!this.mutable)
      throw this.error(
        "write",
        new TypeError("Readonly File"),
      );
    else if (this.folder)
      throw this.error(
        "write",
        new TypeError("Filesystem object is Folder"),
      );
    else if (this.exists) {
      if (overwrite === false)
        throw this.error(
          "write",
          new ReferenceError("File already exists, but `overwrite:false`"),
        );
    }
    else if (!File.manager.isDirectory(this.parent))
      File.manager.createDirectory(this.parent, true);

    const buffer = content ?? "";

    File.manager.writeString(
      this.path,
      typeof buffer === "object"
        ? JSON.stringify(buffer)
        : typeof overwrite !== "string"
          ? String(buffer)
          : overwrite === "line"
            ? [
                String(buffer),
                this.readString(),
              ]
                .join("\n")
            : this.readString() + String(buffer),
    );
  }

  public delete() {
    if (!this.mutable)
      throw this.error(
        "delete",
        new ReferenceError("Readonly File/Folder"),
      );

    if (this.exists)
      File.manager.remove(this.path);
  }

  private error(verb: string, error: unknown) {
    return new Error(
      `Failed to ${verb} file`,
      {
        cause: new Error(this.path, { cause: error }),
      },
    );
  }
}
