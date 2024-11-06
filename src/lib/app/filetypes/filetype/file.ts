class File<Mutable extends boolean> {
  private static readonly manager = FileManager.local();
  public readonly path: string;
  public readonly parent: string;
  public readonly exists: boolean;

  constructor(
    public readonly mutable: Mutable,
    bookmark: string,
    ...subpaths: string[]
  ) {
    if (!File.manager.bookmarkExists(bookmark))
      throw new ReferenceError(`Bookmark "${bookmark}" not found`);

    const root = File.manager.bookmarkedPath(bookmark),
    subpath = subpaths.flatMap(subpath => subpath.split("/").filter(node => node !== ""));

    if (subpath.length < 1)
      throw new Error("Empty subpath");

    this.path = `${root}/${subpath.join("/")}`;
    this.parent = `${root}/${subpath.slice(0, -1).join("/")}`;
    this.exists = File.manager.fileExists(this.path);
  }

  public read(fail = false) {
    if (!this.exists) {
      if (fail)
        throw new ReferenceError(`File not found: ${this.path}`);

      return "";
    }

    return File.manager.readString(this.path);
  }

  public readful() {
    const read = this.read(true);

    if (read.length < 1)
      throw new TypeError(`Unreadful: ${this.path}`);

    return read as stringful;
  }

  public write(
    string: string,
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    try {
      if (!this.mutable)
        throw new TypeError("Readonly file");
      else if (File.manager.isDirectory(this.path))
        throw new ReferenceError("Write location is folder");
      else if (this.exists) {
        if (overwrite === false)
          throw new ReferenceError("File exists, overwrite false");
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
    catch (e) {
      throw new Error(`Unwritable: ${this.path}`, { cause: e });
    }
  }

  public delete() {
    File.manager.remove(this.path);
  }
}

export default File;
