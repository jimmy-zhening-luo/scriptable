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
    if (!File.manager.bookmarkExists(filetype))
      throw new ReferenceError(`No bookmark for ${filetype}`);

    const root = File.manager.bookmarkedPath(filetype),
    subpath = `${folder}/${name}`
      .split("/")
      .filter(node => node !== "");

    if (subpath.length < 1)
      throw new RangeError("No subpath");

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
      throw new ReferenceError("File is empty", { cause: this.path });

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
      throw new TypeError("Write readonly file", { cause: path });
    else if (data === null)
      throw new TypeError("Write null data");
    else if (File.manager.isDirectory(path))
      throw new ReferenceError("Write path is folder", { cause: path });
    else if (this.exists) {
      if (overwrite === false)
        throw new ReferenceError("File exists, overwrite false", { cause: path });
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
    if (!this.mutable)
      throw new TypeError("Cannot delete readonly file", { cause: this.path });

    if (this.exists)
      File.manager.remove(this.path);
  }
}
