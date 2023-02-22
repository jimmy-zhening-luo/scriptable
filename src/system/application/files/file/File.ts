class File {

  readonly _nominalType: string = "File";
  private readonly _base: Filepath;
  private _subpath: Filepath;

  constructor(
    base:
      | string
      | string[]
      | Filepath
      | File
      | Bookmark = "",
    subpath:
      | string
      | string[]
      | Filepath = "",
  ) {
    this._base = this.parse(base);
    this._subpath = this.parse(subpath);
  }

  private parse(
    path: ConstructorParameters<typeof File>[0],
  ): Filepath {
    try {
      return new File.Filepath(
        typeof path === "string"
          || Array.isArray(path)
          || typeof path !== "string"
          && path instanceof File.Filepath ?
          path
          : path instanceof File.Bookmark
            || path instanceof File ?
            path.path
            : ""
      );
    } catch (e) {
      console.error(`File: Error parsing constructor input: ${e}`);
      throw e;
    }
  }

  get base(): ReturnType<typeof Filepath.prototype.toString> {
    try {
      return this._base.toString();
    } catch (e) {
      console.error(`File: Error getting base path: ${e}`);
      throw e;
    }
  }

  get root(): typeof File.prototype.base {
    return this.base;
  }

  get top(): typeof File.prototype.base {
    return this.base;
  }

  get subpath(): ReturnType<typeof Filepath.prototype.toString> {
    try {
      return this._subpath.toString();
    } catch (e) {
      console.error(`File: Error getting subpath: ${e}`);
      throw e;
    }
  }

  set subpath(
    subpath: ConstructorParameters<typeof File>[1]
  ) {
    try {
      this._subpath = new this.Filepath(subpath);
    } catch (e) {
      console.error(`File: Error setting subpath: ${e}`);
      throw e;
    }
  }

  append(
    subpath: ConstructorParameters<typeof File>[1]
  ): this {
    try {
      this.subpath = this._subpath.append(subpath);
      return this;
    } catch (e) {
      console.error(`File: Error appending subpath: ${e}`);
      throw e;
    }
  }

  cd(
    relativePath: ConstructorParameters<typeof File>[1]
  ): this {
    try {
      this.subpath = this._subpath.cd(relativePath);
      return this;
    } catch (e) {
      console.error(`File: Error changing directory: ${e}`);
      throw e;
    }
  }

  private get _path(): Filepath {
    return this._base.append(this.subpath);
  }

  get path(): ReturnType<typeof Filepath.prototype.toString> {
    try {
      return this._path.toString();
    } catch (e) {
      console.error(`File: Error getting path: ${e}`);
      throw e;
    }
  }

  get tree(): ReturnType<typeof Filepath.prototype.toTree> {
    try {
      return this._path.toTree();
    } catch (e) {
      console.error(`File: Error getting path tree: ${e}`);
      throw e;
    }
  }

  toString(): typeof File.prototype.path {
    return this.path;
  }

  toTree(): typeof File.prototype.tree {
    return this.tree;
  }

  get leaf(): string {
    try {
      return this.subpath === "" ?
        this._base.leaf
        : this._subpath.leaf;
    } catch (e) {
      console.error(`File: Error getting leaf: ${e}`);
      throw e;
    }
  }

  get isTop(): boolean {
    return this.subpath === "";
  }

  get isDirectory(): boolean {
    try {
      return this.m.isDirectory(this.path);
    } catch (e) {
      console.error(`File: Error checking if path is directory: ${e}`);
      throw e;
    }
  }

  get isFile(): boolean {
    try {
      return this.parentIsDirectory
        && this.m.fileExists(this.path)
        && !this.isDirectory;
    } catch (e) {
      console.error(`File: Error checking if path is file: ${e}`);
      throw e;
    }
  }

  get exists(): boolean {
    return this.isFile || this.isDirectory;
  }

  get isEnumerable(): boolean {
    return this.isDirectory;
  }

  get isReadable(): boolean {
    return this.isFile;
  }

  get parentSubpath(): string {
    return this._subpath.parent;
  }

  get isOwnParent(): boolean {
    return this.subpath === this.parentSubpath;
  }

  get parent(): File {
    try {
      return new File(
        this.base,
        this.parentSubpath
      );
    } catch (e) {
      console.error(`File: Error getting parent File object: ${e}`);
      throw e;
    }
  }

  get parentPath(): string {
    return this.parent.path;
  }

  get parentIsDirectory(): boolean {
    return this.parent.isDirectory;
  }

  get ls(): string[] {
    try {
      return this.isDirectory ?
        File.m.listContents(this.path)
        : [];
    } catch (e) {
      console.error(`File: Error listing contents of directory: ${e}`);
      throw e;
    }
  }

  get isBottom(): boolean {
    return !this.exists
      || this.isFile
      || this.isDirectory
      && this.ls.length === 0;
  }

  get descendants(): File[] {
    try {
      return this.isFile ?
        [this]
        : this.isBottom ?
          []
          : this.ls.map(leaf =>
            new File(this.base, this.subpath).append(leaf)
          ).filter(child =>
            !this.path.startsWith(child.path)
          ).map(file =>
            file.descendants
          ).flat(1);
    } catch (e) {
      console.error(`File: Error getting descendants: ${e}`);
      throw e;
    }
  }

  get data(): string {
    try {
      if (!this.isReadable)
        throw new ReferenceError(
          "File:data: File is not readable. File must be a file and must exist."
        );
      return this.m.readString(this.path);
    } catch (e) {
      console.error(`File: Error reading file: ${e}`);
      throw e;
    }
  }

  read(): typeof File.prototype.data {
    return this.data;
  }

  write(
    data: typeof File.prototype.data,
    overwrite: boolean = false
  ): this {
    try {
      if (this.isDirectory)
        throw new ReferenceError(
          "File:write: File path points to a folder. Cannot write data to a folder."
        );
      else if (this.isReadable && !overwrite)
        throw new ReferenceError(
          "File:write: Overwrite is set to false. To overwrite an existing file, write must be called with overwrite === true."
        );
      else {
        if (!this.parentIsDirectory)
          try {
            this.m.createDirectory(this.parentPath, true);
          } catch (e) {
            throw new ReferenceError(
              "File:write: Could not create parent directory using Scriptable file manager.See previous error: " + e
            );
          }
        try {
          this.m.writeString(this.path, data);
        } catch (e) {
          throw new ReferenceError(
            "File:write: Could not write data to file using Scriptable file manager. See previous error: " + e
          );
        }
        return this;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  delete(
    force: boolean = false
  ): this {
    try {
      if (this.exists) {
        if (force)
          File.m.remove(
            this.path
          );
        else {
          const confirm: Alert = new Alert();
          confirm.message = String(
            "Are you sure you want to delete this file or folder (including all descendants)? Path: "
            + this.path
          );
          confirm.addDestructiveAction(
            "Yes, DELETE this file"
          );
          confirm.addCancelAction(
            "Cancel"
          );
          confirm.present().then(userChoice =>
            userChoice === 0 ?
              File.m.remove(this.path)
              : console.log("User canceled file deletion.")
          );
        }
      }
      return this;
    } catch (e) {
      console.error(`File: Error deleting file: ${e}`);
      throw e;
    }
  }

  static join(
    ...paths: Parameters<typeof Filepath.join>
  ): ReturnType<typeof Filepath.join> {
    try {
      return File.Filepath.join(...paths);
    } catch (e) {
      console.error(`File: static join: Error joining paths: ${e}`);
      throw e;
    }
  }

  static mutate(
    ...paths: Parameters<typeof Filepath.mutate>
  ): ReturnType<typeof Filepath.mutate> {
    try {
      return File.Filepath.mutate(...paths);
    } catch (e) {
      console.error(`File: static mutate: Error mutating paths: ${e}`);
      throw e;
    }
  }

  static toString(
    ...paths: Parameters<typeof Filepath.toString>
  ): ReturnType<typeof Filepath.toString> {
    try {
      return File.Filepath.toString(...paths);
    } catch (e) {
      console.error(`File: static toString: Error converting paths to string: ${e}`);
      throw e;
    }
  }

  static toTree(
    ...paths: Parameters<typeof Filepath.toTree>
  ): ReturnType<typeof Filepath.toTree> {
    try {
      return File.Filepath.toTree(...paths);
    } catch (e) {
      console.error(`File: static toTree: Error converting paths to tree: ${e}`);
      throw e;
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return (
      instance !== null
      && instance !== undefined
      && typeof instance === "object"
      && "_nominalType" in instance
      && instance._nominalType === "File"
    );
  }

  get Bookmark(): typeof Bookmark {
    return File.Bookmark;
  }

  get Filepath(): typeof Filepath {
    return File.Filepath;
  }

  protected get m(): FileManager {
    return File.m;
  }

  static get Bookmark(): typeof Bookmark {
    return importModule("bookmark/Bookmark");
  }

  static get Filepath(): typeof Filepath {
    return importModule("filepath/Filepath");
  }

  protected static get m(): FileManager {
    return FileManager.iCloud();
  }

}

module.exports = File;
