class File<Writable extends boolean> {
  private readonly manager = FileManager.local();
  private readonly root: Stringify<rootpath>;
  private readonly _subpath: InstanceType<subpath>;

  constructor(
    public readonly writable: Writable,
    bookmark: string,
    ...subpaths: (InstanceType<subpath> | string)[]
  ) {
    try {
      this.root = this.bookmark(bookmark);
      this._subpath = new File.subpath(
        0,
        ...subpaths,
      );
    }
    catch (e) {
      throw new Error(
        `File`,
        { cause: e },
      );
    }
  }

  private static get subpath() {
    try {
      return importModule<subpath>(
        "./common/valid/string/filepath",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `File: import filepath<0> as subpath`,
        { cause: e },
      );
    }
  }

  public get path(): Stringify<rootpath> {
    const { root, _subpath } = this;

    return _subpath.prepend(root);
  }

  public get subpath(): Stringify<subpath> {
    return this._subpath.toString();
  }

  public get isDirectory() {
    return this.manager.isDirectory(this.path);
  }

  public get isFile() {
    return this.manager.fileExists(this.path);
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

  private bookmark(bookmark: string) {
    try {
      const name = bookmark.trim(),
      { length } = name,
      { manager } = this;

      if (length < 1)
        throw new TypeError(`Bookmark alias is empty`);
      else if (!manager.bookmarkExists(name))
        throw new ReferenceError(`Bookmark not found`);
      else
        return manager.bookmarkedPath(name) as Stringify<rootpath>;
    }
    catch (e) {
      throw new ReferenceError(
        `File: bookmark "${bookmark}"`,
        { cause: e },
      );
    }
  }

  private createParent() {
    try {
      const {
        root,
        _subpath,
        manager,
      } = this,
      parentPath = _subpath.parent.prepend(root);

      if (!manager.isDirectory(parentPath))
        manager.createDirectory(
          parentPath,
          true,
        );
    }
    catch (e) {
      throw new Error(
        `File: createParent`,
        { cause: e },
      );
    }
  }
}

module.exports = File;
