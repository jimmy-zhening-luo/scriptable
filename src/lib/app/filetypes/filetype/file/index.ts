class File<Mutable extends boolean> {
  public readonly name: string;
  public readonly path: string;
  public readonly subpath: string;
  private readonly parent: string;
  private readonly manager = FileManager.local();

  constructor(
    public readonly mutable: Mutable,
    alias: string,
    ...subpaths: string[]
  ) {
    try {
      const bookmark = File.bookmark(alias),
      subpath = subpaths
        .flatMap(
          subpath => subpath
            .split("/")
            .map(node => node.trim())
            .filter((node): node is vstring<"filenode"> => node.length > 0 && node.length < 256 && [":", "&"].every(c => !node.includes(c))),
        );

      this.name = File.append(alias, subpath);
      this.path = File.append(bookmark, subpath);
      this.parent = File.append(bookmark, subpath.slice(0, -1));
      this.subpath = subpath.join("/");
    }
    catch (e) {
      throw new Error(`File`, { cause: e });
    }
  }

  public get isDirectory() {
    return this.manager.isDirectory(this.path);
  }

  public get isFile() {
    return this.manager.fileExists(this.path);
  }

  private static bookmark(bookmark: string) {
    try {
      const alias = bookmark.trim(),
      manager = FileManager.iCloud();

      if (alias.length < 1)
        throw new TypeError("Empty bookmark alias");
      else if (!manager.bookmarkExists(alias))
        throw new ReferenceError("Bookmark does not exist");
      else
        return manager.bookmarkedPath(alias);
    }
    catch (e) {
      throw new ReferenceError(`File: bookmark (${bookmark})`, { cause: e });
    }
  }

  private static append(
    bookmark: string,
    subpath: readonly vstring<"filenode">[],
  ) {
    return [bookmark, ...subpath].join("/");
  }

  public read(fail = false) {
    try {
      if (!this.isFile)
        if (fail)
          throw new ReferenceError("File does not exist");
        else
          return "";
      else
        return this.manager.readString(this.path);
    }
    catch (e) {
      throw new Error(`File: read (${this.name})`, { cause: e });
    }
  }

  public readful(cause = this.name) {
    try {
      const read = this.read(true);

      if (read.length > 0)
        return read as stringful;
      else
        throw new TypeError(`Empty file is not stringful`, { cause });
    }
    catch (e) {
      throw new Error(`File: readful`, { cause: e });
    }
  }

  public write(
    string: string,
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    try {
      const {
        mutable,
        isDirectory,
        isFile,
        path,
        manager,
      } = this;

      if (!mutable)
        throw new TypeError("Readonly file");
      else if (isDirectory)
        throw new ReferenceError("Write path is folder");
      else if (isFile)
        if (overwrite === false)
          throw new ReferenceError("Existing file, overwrite false");
        else {
          const read = this.read();

          manager.writeString(
            path,
            overwrite === "append"
              ? `${read}${string}`
              : overwrite === "line"
                ? `${string}\n${read}`
                : string,
          );
        }
      else {
        this.mkdir();
        manager.writeString(path, string);
      }
    }
    catch (e) {
      throw new Error(`File: write (${this.name})`, { cause: e });
    }
  }

  public delete() {
    try {
      this.manager.remove(this.path);
    }
    catch (e) {
      throw new Error(`File: delete (${this.name})`, { cause: e });
    }
  }

  private mkdir() {
    const { parent, manager } = this;

    if (!manager.isDirectory(parent))
      manager.createDirectory(parent, true);
  }
}

module.exports = File;
export type { File };
