class File<Writable extends boolean> {
  private readonly manager = FileManager.local();
  private readonly _root: Stringify<rootpath>;
  private readonly _subpath: InstanceType<subpath>;

  constructor(
    public readonly writable: Writable,
    root:
      | File<Writable>
      | { bookmark: string }
      | { graft: File<Writable> },
    ...subpaths: ConstructorParameters<subpath>[1][]
  ) {
    try {
      this._root = "root" in root
        ? root.path
        : "bookmark" in root
          ? this.bookmark(root.bookmark)
          : root.graft._root;
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
    return this._subpath.prepend(this._root);
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

  public get root(): File<Writable> {
    try {
      const { constructor, writable } = this;

      return new (constructor as Constructor<typeof File<Writable>>)(
        writable,
        { graft: this },
      );
    }
    catch (e) {
      throw new Error(
        `File: root`,
        { cause: e },
      );
    }
  }

  public get parent() {
    try {
      const {
        constructor,
        writable,
        root,
        _subpath,
      } = this;

      return new (constructor as Constructor<typeof File<Writable>>)(
        writable,
        root,
        _subpath.parent,
      );
    }
    catch (e) {
      throw new Error(
        `File: parent`,
        { cause: e },
      );
    }
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

      if (writable === false)
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
            const { parent } = this;

            if (!parent.isDirectory)
              manager.createDirectory(
                parent.path,
                true,
              );

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
}

module.exports = File;
