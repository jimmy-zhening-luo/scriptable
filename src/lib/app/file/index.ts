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
        throw new ReferenceError("Filetype root missing", { cause: { filetype } });
      else if (subpath.length < 1)
        throw new RangeError("File subpath empty", { cause: { folder, name } });

      this.path = `${root}/${subpath.join("/")}`;
      this.parent = `${root}/${subpath.slice(0, -1).join("/")}`;
      this.exists = File.manager.fileExists(this.path);
    }
    catch (e) {
      throw new Error(`File handler rejected: '${filetype}/${folder}/${name}'`, { cause: e });
    }
  }

  public read(fail = false) {
    const { path } = this;

    try {
      if (!this.exists) {
        if (fail)
          throw new ReferenceError("File does not exist");

        return "";
      }

      return File.manager.readString(path);
    }
    catch (e) {
      throw new Error(`File read failed: '${path}'`, { cause: e });
    }
  }

  public readful() {
    const read = this.read(true);

    if (read === "")
      throw new ReferenceError("Unstringful file read", { cause: { path: this.path } });

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
    const { path } = this;

    try {
      if (!this.mutable)
        throw new TypeError("Readonly file");
      else if (data === null)
        throw new TypeError("Null write data");
      else if (File.manager.isDirectory(path))
        throw new ReferenceError("Write target is folder");
      else if (this.exists) {
        if (overwrite === false)
          throw new ReferenceError("Mutable file but overwrite:false");
      }
      else if (!File.manager.isDirectory(this.parent))
        File.manager.createDirectory(this.parent, true);

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
      throw new Error(`File write failed: '${path}'`, { cause: e });
    }
  }

  public delete() {
    const { path } = this;

    try {
      if (!this.mutable)
        throw new TypeError("Readonly file");

      if (this.exists)
        File.manager.remove(path);
    }
    catch (e) {
      throw new Error(`File deletion failed: '${path}'`, { cause: e });
    }
  }
}
