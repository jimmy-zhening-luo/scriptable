class File<Writable extends boolean> {
  public readonly path: bookmark & filepath<readonly filenode[]>;
  public readonly subpath: filepath<readonly filenode[]>;
  private readonly parent: filepath<readonly filenode[]>;
  private readonly manager = FileManager.local();

  constructor(
    public readonly writable: Writable,
    bookmark: string,
    ...subpaths: string[]
  ) {
    try {
      const root = File.bookmark(bookmark),
      subpath = subpaths
        .flatMap(
          subpath => subpath
            .split("/")
            .map(node => node.trim())
            .filter((node): node is stringful => node.length > 0)
            .map(node => File.node(node)),
        ),
      parentSubpath = subpath.slice(
        0,
        -1,
      );

      this.path = File.append(
        root,
        subpath,
      );
      this.parent = File.append(
        root,
        parentSubpath,
      );
      this.subpath = subpath.join("/") as filepath<typeof subpath>;
    }
    catch (e) {
      throw new Error(
        `File`,
        { cause: e },
      );
    }
  }

  private static get charstring() {
    try {
      return importModule<typeof charstring>(
        "./common/valid/string/index",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `File: import charstring`,
        { cause: e },
      );
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
      { length } = alias,
      manager = FileManager.iCloud();

      if (length < 1)
        throw new TypeError(`Bookmark alias is empty`);
      else if (!manager.bookmarkExists(alias))
        throw new ReferenceError(`Bookmark not found`);
      else
        return manager.bookmarkedPath(alias);
    }
    catch (e) {
      throw new ReferenceError(
        `File: bookmark "${bookmark}"`,
        { cause: e },
      );
    }
  }

  private static node(node: stringful) {
    return File.charstring<"filenode">(
      node,
      [
        ":" as char,
        "/" as char,
      ],
      { max: 255 as Positive<int> },
    );
  }

  private static append(
    root: bookmark,
    subpath: readonly filenode[],
  ) {
    return [
      root,
      ...subpath.length > 0 ? [...subpath] : [],
    ]
      .join("/") as typeof root & filepath<typeof subpath>;
  }

  public read(stringfully = false) {
    try {
      const { path, isFile } = this;

      if (!isFile)
        if (stringfully)
          throw new ReferenceError(`Tried to read non-existent file`);
        else
          return "";
      else
        return this.manager.readString(path);
    }
    catch (e) {
      throw new Error(
        `File: read (${String(this)})`,
        { cause: e },
      );
    }
  }

  public readful(error = "") {
    try {
      const read = this.read(true),
      { length } = read;

      if (length > 0)
        return read as stringful;
      else
        throw new TypeError(error);
    }
    catch (e) {
      throw new Error(
        `File: readful (${String(this)})`,
        { cause: e },
      );
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
        writable,
        isDirectory,
        isFile,
        path,
        manager,
      } = this;

      if (!writable)
        throw new TypeError("File is readonly");
      else
        if (isDirectory)
          throw new TypeError("Write destination is folder");
        else
          if (isFile)
            if (overwrite === false)
              throw new TypeError("Existing file, overwrite:false");
            else
              manager.writeString(
                path,
                overwrite === "append"
                  ? [this.read(), string].join("")
                  : overwrite === "line"
                    ? [string, this.read()].join("\n")
                    : string,
              );
          else {
            this.createParent();
            manager.writeString(
              path,
              string,
            );
          }
    }
    catch (e) {
      throw new Error(
        `File: write (${String(this)})`,
        { cause: e },
      );
    }
  }

  public toString() {
    return this.path;
  }

  private createParent() {
    const { parent, manager } = this;

    if (!manager.isDirectory(parent))
      manager.createDirectory(
        parent,
        true,
      );
  }
}

module.exports = File;
