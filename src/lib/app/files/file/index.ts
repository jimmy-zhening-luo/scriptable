abstract class File<
  FT extends string,
  Mutable extends boolean = false,
> {
  private static readonly manager = FileManager.local();
  protected readonly path: string;
  protected readonly parent: string;
  protected readonly exists: boolean;

  constructor(
    filetype: literalful<FT>,
    public readonly mutable: Mutable,
    filename: string,
    folder: string = "",
  ) {
    if (!File.manager.bookmarkExists(filetype))
      throw new ReferenceError(`No bookmark for ${filetype}`);

    const root = File.manager.bookmarkedPath(filetype),
    subpath = `${folder}/${filename}`
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

    if (read.length < 1)
      throw new ReferenceError("Unreadful file", { cause: this.path });

    return read as stringful;
  }

  public data<Data>(): Null<Data> {
    const string = this.read().trim();

    return string.length > 0 ? JSON.parse(string) as Data : null;
  }

  public write(
    string: string,
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    if (!this.mutable)
      throw new TypeError("Cannot write to readonly file", { cause: this.path });
    else if (File.manager.isDirectory(this.path))
      throw new ReferenceError("Write location is folder", { cause: this.path });
    else if (this.exists) {
      if (overwrite === false)
        throw new ReferenceError("File exists, overwrite false", { cause: this.path });
    }
    else if (!File.manager.isDirectory(this.parent))
      File.manager.createDirectory(this.parent, true);

    File.manager.writeString(
      this.path,
      typeof overwrite !== "string"
        ? string
        : (prior => overwrite === "line"
            ? `${string}${prior.length > 0 ? "" : `\n${prior}`}`
            : `${prior}${string}`)(this.read()),
    );
  }

  public delete() {
    if (!this.mutable)
      throw new TypeError("Cannot delete readonly file", { cause: this.path });

    File.manager.remove(this.path);
  }
}

export default File;
