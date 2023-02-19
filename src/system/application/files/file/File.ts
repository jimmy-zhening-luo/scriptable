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
  }

  get base(): string {
    return this._base.toString();
  }

  get root(): typeof File.prototype.base {
    return this.base;
  }

  get top(): typeof File.prototype.base {
    return this.base;
  }

  get subpath(): string {
    return this._subpath.toString();
  }

  set subpath(
    subpath: ConstructorParameters<typeof File>[1]
  ) {
    this._subpath = new this.Filepath(subpath);
  }

  append(
    subpath: ConstructorParameters<typeof File>[1]
  ): this {
    this.subpath = this._subpath.append(subpath);
    return this;
  }

  cd(
    relativePath: ConstructorParameters<typeof File>[1]
  ): this {
    this.subpath = this._subpath.cd(relativePath);
    return this;
  }

  private get _path(): Filepath {
    return this._base.append(this.subpath);
  }

  get path(): ReturnType<typeof Filepath.prototype.toString> {
    return this._path.toString();
  }

  get tree(): ReturnType<typeof Filepath.prototype.toTree> {
    return this._path.toTree();
  }

  toString(): typeof File.prototype.path {
    return this.path;
  }

  toTree(): typeof File.prototype.tree {
    return this.tree;
  }

  get leaf(): string {
    return this.subpath === "" ?
      this._base.leaf
      : this._subpath.leaf;
  }

  get isTop(): boolean {
    return this.subpath === "";
  }

  get isDirectory(): boolean {
    return this.m.isDirectory(this.path);
  }

  get isFile(): boolean {
    return this.parentIsDirectory
      && this.m.fileExists(this.path)
      && !this.isDirectory;
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
    return new File(
      this.base,
      this.parentSubpath
    );
  }

  get parentPath(): string {
    return this.parent.path;
  }

  get parentIsDirectory(): boolean {
    return this.parent.isDirectory;
  }

  get ls(): string[] {
    return this.isDirectory ?
      File.m.listContents(this.path)
      : [];
  }

  get isBottom(): boolean {
    return !this.exists
      || this.isFile
      || this.isDirectory
      && this.ls.length === 0;
  }

  get descendants(): File[] {
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
  }

  get data(): string {
    try {
      if (!this.isReadable)
        throw new ReferenceError(
          "File:data: File is not readable. File must be a file and must exist."
        );
      return this.m.readString(this.path);
    } catch (e) {
      console.log(e);
      return "";
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
      return this;
    }
  }

  delete(
    force: boolean = false
  ): void {
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
