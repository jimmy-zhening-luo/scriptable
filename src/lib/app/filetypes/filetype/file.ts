class File<Mutable extends boolean> {
  private static readonly manager = FileManager.local();
  public readonly name: string;
  public readonly path: string;
  public readonly exists: boolean;

  constructor(
    public readonly mutable: Mutable,
    bookmark: string,
    ...subpaths: string[]
  ) {
    const subpath = subpaths.flatMap(subpath => subpath.split("/").filter(node => node !== "")).join("/");

    if (!File.manager.bookmarkExists(bookmark))
      throw new ReferenceError(`Bookmark "${bookmark}" not found`);
    else if (subpath === "")
      throw new ReferenceError("Empty subpath");

    this.name = `${bookmark}/${subpath}`;
    this.path = `${File.manager.bookmarkedPath(bookmark)}/${subpath}`;
    this.exists = File.manager.fileExists(this.path);
  }

  public read(fail = false) {
    if (!this.exists) {
      if (fail)
        throw new ReferenceError("File not found", { cause: this.name });

      return "";
    }

    return File.manager.readString(this.path);
  }

  public readful(cause = this.name) {
    const read = this.read(true);

    if (read.length < 1)
      throw new TypeError("Unreadful", { cause });

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
        throw new TypeError("Readonly");
      else if (File.manager.isDirectory(this.path))
        throw new ReferenceError("Folder, not file");
      else if (this.exists) {
        if (overwrite === false)
          throw new ReferenceError("Exists (no overwrite)");
      }
      else {
        const parent = this.path.slice(0, this.path.lastIndexOf("/"));

        if (!File.manager.isDirectory(parent))
          File.manager.createDirectory(parent, true);
      }

      const before = this.read(),
      after = overwrite === "append"
        ? `${before}${string}`
        : overwrite === "line"
          ? [
              string,
              ...before.length > 0
                ? [before]
                : [],
            ].join("\n")
          : string;

      File.manager.writeString(this.path, after);

      return after;
    }
    catch (e) {
      throw new Error(`Write: ${this.name}`, { cause: e });
    }
  }

  public delete() {
    File.manager.remove(this.path);
  }
}

export default File;
