export default class File<
  Filetype extends string,
  Mutable extends boolean = false,
> {
  private static readonly manager = FileManager.iCloud();
  protected readonly path: string;
  protected readonly parent: string;
  protected readonly exists: boolean;

  constructor(
    filetype: literalful<Filetype>,
    public readonly mutable: Mutable,
    { name, folder = "" }: Field<"name", "folder">,
  ) {
    try {
      const root = File.manager.bookmarkExists(filetype)
        ? File.manager.bookmarkedPath(filetype)
        : mutable
          ? `${File.manager.libraryDirectory()}/${filetype}`
          : null,
      subpath = `${folder}/${name}`
        .split("/")
        .filter(node => node !== "");

      if (root === null)
        throw new ReferenceError("Missing filetype root", { cause: { filetype } });
      else if (subpath.length === 0)
        throw new SyntaxError("Empty file subpath", { cause: { folder, name } });

      this.path = `${root}/${subpath.join("/")}`;
      this.parent = `${root}/${subpath.slice(0, -1).join("/")}`;
      this.exists = File.manager.fileExists(this.path);
    }
    catch (e) {
      throw new Error("Failed to create file handler", { cause: new Error(`${filetype}/${folder}/${name}`, { cause: e }) });
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
      throw new RangeError("Unstringful file content", { cause: { path: this.path } });

    return read as stringful;
  }

  public write(
    data:
      | null
      | string
      | number
      | boolean
      | (string | number | boolean)[]
      | Record<string, unknown> = null,
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
          ? `${data.reverse().join("\n")}\n${this.read()}`
          : typeof data === "object"
            ? JSON.stringify(data)
            : typeof overwrite !== "string"
              ? String(data)
              : overwrite === "line"
                ? `${String(data)}\n${this.read()}`
                : `${this.read()}${String(data)}`,
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
