class File<Mutable extends boolean> {
  private static readonly manager = FileManager.local();
  public readonly name: string;
  public readonly path: string;
  private readonly parent: string;

  constructor(
    public readonly mutable: Mutable,
    bookmark: string,
    ...subpaths: string[]
  ) {
    if (!File.manager.bookmarkExists(bookmark))
      throw new ReferenceError("Bookmark does not exist", { cause: { bookmark } });

    const root = File.manager.bookmarkedPath(bookmark),
    subpath = subpaths.flatMap(
      subpath => subpath
        .split("/")
        .map(node => node.trim())
        .filter((node): node is vstring<"f"> => node.length > 0 && node.length < 256 && ![":", "&"].some(c => node.includes(c))),
    ) satisfies readonly vstring<"f">[],
    separator = "/";

    this.name = [bookmark, ...subpath].join(separator);
    this.path = [root, ...subpath].join(separator);
    this.parent = [root, ...subpath.slice(0, -1)].join(separator);
  }

  public get isDirectory() {
    return File.manager.isDirectory(this.path);
  }

  public get isFile() {
    return File.manager.fileExists(this.path);
  }

  public read(fail = false) {
    if (!this.isFile) {
      if (fail)
        throw new ReferenceError("Read non-existent file", { cause: this.name });

      return "";
    }

    return File.manager.readString(this.path);
  }

  public readful(cause = this.name) {
    const read = this.read(true);

    if (read.length < 1)
      throw new TypeError(`Non-readful empty file`, { cause });

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
      else if (this.isDirectory)
        throw new ReferenceError("Write path is folder");
      else if (this.isFile) {
        if (overwrite === false)
          throw new ReferenceError("Existing file, overwrite false");
      }
      else if (!File.manager.isDirectory(this.parent))
        File.manager.createDirectory(this.parent, true);

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

      File.manager.writeString(
        this.path,
        after,
      );

      return after;
    }
    catch (e) {
      throw new Error(`File: write (${this.name})`, { cause: e });
    }
  }

  public delete() {
    File.manager.remove(this.path);
  }
}

module.exports = File;
export type { File };
