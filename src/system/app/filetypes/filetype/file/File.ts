class File {
  private readonly manager = FileManager.local();
  private readonly _root: Stringify<filepath<1>>;
  private readonly _subpath: filepath<0>;

  constructor(
    root:
      | File
      | Bookmark
      | { graft: File },
    ...subpaths: ConstructorParameters<typeof filepath<0>>[1][]
  ) {
    try {
      this._root = "root" in root || "alias" in root
        ? root.path
        : root.graft._root;
      this._subpath = new File.Subpath(
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

  private static get Subpath() {
    try {
      return importModule<typeof filepath<0>>(
        "./common/validator/impl/filepath/filepath",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `File: import filepath<0> as Subpath`,
        { cause: e },
      );
    }
  }

  public get path(): Stringify<filepath<1>> {
    return this._subpath.prepend(this._root);
  }

  public get subpath(): Stringify<filepath<0>> {
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
      return new (this.constructor as new (...path: ConstructorParameters<typeof File>)=> this)({ graft: this });
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
      return new (this.constructor as new (...path: ConstructorParameters<typeof File>)=> this)(
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

  public readful(error = ""): stringful {
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
