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
    const root = File.manager.bookmarkExists(filetype)
      ? File.manager.bookmarkedPath(filetype)
      : mutable
        ? `${File.manager.libraryDirectory()}/${filetype}`
        : null,
    subpath = `${folder}/${name}`
      .split("/")
      .filter(node => node !== "");

    if (root === null)
      throw new ReferenceError(`No bookmark for immutable filetype ${filetype}`);
    else if (subpath.length < 1)
      throw new RangeError("Empty subpath");

    this.path = `${root}/${subpath.join("/")}`;
    this.parent = `${root}/${subpath.slice(0, -1).join("/")}`;
    this.exists = File.manager.fileExists(this.path);
  }

  public read(fail = false) {
    if (!this.exists) {
      if (fail)
        throw new ReferenceError("File not found", { cause: this.path });

      return "";
    }

    return File.manager.readString(this.path);
  }

  public readful() {
    const read = this.read(true);

    if (read === "")
      throw new ReferenceError("Empty file", { cause: this.path });

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

    if (!this.mutable)
      throw new TypeError("Cannot write readonly file", { cause: path });
    else if (data === null)
      throw new TypeError("Null write data");
    else if (File.manager.isDirectory(path))
      throw new ReferenceError("Write target is folder", { cause: path });
    else if (this.exists) {
      if (overwrite === false)
        throw new ReferenceError("Cannot overwrite mutable file with `overwrite:false`", { cause: path });
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

  public delete() {
    const { path } = this;

    if (!this.mutable)
      throw new TypeError("Cannot delete readonly file", { cause: path });

    if (this.exists)
      File.manager.remove(path);
  }
}
