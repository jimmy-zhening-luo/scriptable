class File {
  private readonly manager = FileManager.local();
  private readonly _root: rootpath.toString;
  private readonly _subpath: subpath.instance;

  constructor(
    root:
      | File
      | { bookmark: string }
      | { graft: File },
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
        `File: import subpath as Subpath`,
        { cause: e },
      );
    }
  }

  public get path(): rootpath.toString {
    return this._subpath.prepend(this._root);
  }

  public get subpath(): subpath.toString {
    return this._subpath.toString();
  }

  public get isDirectory() {
    return this.manager.isDirectory(this.path);
  }

  public get isFile() {
    return this.manager.fileExists(this.path);
  }

  public get root(): this {
    try {
      const { constructor } = this;

      return new (constructor as ThisConstructor<typeof File, this>)({ graft: this });
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
        root,
        _subpath,
      } = this;

      return new (constructor as ThisConstructor<typeof File, this>)(
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
      const read = this.read(true);

      if (read.length > 0)
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
        path,
        isDirectory,
        isFile,
      } = this;

      if (isDirectory)
        throw new ReferenceError(`Tried to write to folder`);
      else
        if (isFile)
          if (overwrite === false)
            throw new TypeError(`Tried to overwrite existing file with overwrite:false`);
          else
            this.manager.writeString(
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
            this.manager.createDirectory(
              parent.path,
              true,
            );

          this.manager.writeString(
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
      const alias = bookmark.trim(),
      { length } = alias;

      if (length < 1)
        throw new TypeError(`Bookmark alias is empty`);
      else if (!this.manager.bookmarkExists(alias))
        throw new ReferenceError(`Bookmark not found`);
      else
        return this.manager.bookmarkedPath(alias) as rootpath.toString;
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
