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
          ? File.bookmark(root.bookmark)
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

  private static get bookmark() {
    try {
      return importModule<typeof bookmark>(
        "bookmark/Bookmark",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `File: import bookmark`,
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
    try {
      return this.manager.isDirectory(this.path);
    }
    catch (e) {
      throw new SyntaxError(
        `File: isDirectory`,
        { cause: e },
      );
    }
  }

  public get isFile() {
    try {
      return this.manager.fileExists(this.path);
    }
    catch (e) {
      throw new SyntaxError(
        `File: isFile`,
        { cause: e },
      );
    }
  }

  public get root(): this {
    try {
      return new (this.constructor as ThisConstructor<typeof File, this>)({ graft: this });
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
      return new (this.constructor as ThisConstructor<typeof File, this>)(
        this.root,
        this._subpath.parent,
      );
    }
    catch (e) {
      throw new Error(
        `File: parent`,
        { cause: e },
      );
    }
  }

  public read(stringful = false) {
    try {
      if (!this.isFile)
        if (stringful)
          throw new ReferenceError(`Tried to read non-existent file`);
        else
          return "";
      else
        return this.manager.readString(this.path);
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
        throw new TypeError(
          `Read empty file, expected non-empty`,
          { cause: { error } },
        );
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
      if (this.isDirectory)
        throw new ReferenceError(`Tried to write to folder`);
      else
        if (this.isFile)
          if (overwrite === false)
            throw new TypeError(`Tried to overwrite existing file with overwrite:false`);
          else
            this.manager.writeString(
              this.path,
              overwrite === "append"
                ? [this.read(), string]
                    .join("")
                : overwrite === "line"
                  ? [string, this.read()]
                      .join("\n")
                  : string,
            );
        else {
          if (!this.parent.isDirectory)
            this.manager.createDirectory(
              this.parent.path,
              true,
            );

          this.manager.writeString(
            this.path,
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
}

module.exports = File;
