export default class File<
  FT extends string,
  Mutable extends boolean,
> {
  protected readonly path: string;
  protected readonly parent: string;
  protected readonly exists: boolean;
  private readonly manager: FileManager;

  constructor(
    filetype: literalful<FT>,
    public readonly mutable: Mutable,
    {
      name,
      folder = "",
    }: Field<
      "name",
      | "folder"
    >,
  ) {
    this.manager = FileManager.iCloud();

    if (!this.manager.bookmarkExists(filetype))
      throw new ReferenceError(`No bookmark for ${filetype}`);

    const root = this.manager.bookmarkedPath(filetype),
    subpath = `${folder}/${name}`
      .split("/")
      .filter(node => node !== "");

    if (subpath.length < 1)
      throw new RangeError("No subpath");

    this.path = `${root}/${subpath.join("/")}`;
    this.parent = `${root}/${subpath.slice(0, -1).join("/")}`;
    this.exists = this.manager.fileExists(this.path);
  }

  public read(fail = false) {
    if (!this.exists) {
      if (fail)
        throw new ReferenceError("File not found", { cause: this.path });

      return "";
    }

    return this.manager.readString(this.path);
  }

  public readful() {
    const read = this.read(true);

    if (read === "")
      throw new ReferenceError("Unreadful file", { cause: this.path });

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
    if (data === null)
      throw new TypeError("Write null data");
    else if (!this.mutable)
      throw new TypeError("Write readonly file", { cause: this.path });
    else if (this.manager.isDirectory(this.path))
      throw new ReferenceError("Write location is folder", { cause: this.path });
    else if (this.exists) {
      if (overwrite === false)
        throw new ReferenceError("File exists, overwrite false", { cause: this.path });
    }
    else if (!this.manager.isDirectory(this.parent))
      this.manager.createDirectory(this.parent, true);

    this.manager.writeString(
      this.path,
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
      this.manager.remove(this.path);
  }
}
