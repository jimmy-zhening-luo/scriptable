class File {
  readonly _nominalType: string = "File";
  private readonly _base: FilepathString;
  private _subpath: FilepathString;

  constructor(
    base: string | string[] | FilepathString | File | Bookmark = "",
    subpath: string | string[] | FilepathString = "",
  ) {
    try {
      try {
        this._base =
          base instanceof File
            ? new File.FilepathString(base.base)
            : base instanceof Bookmark
            ? new File.FilepathString(base.path)
            : this.parse(base);
      } catch (e) {
        throw new SyntaxError(`Error parsing base: ${e}`);
      }
      try {
        this._subpath = this.parse(subpath);
      } catch (e) {
        throw new SyntaxError(`Error parsing subpath: ${e}`);
      }
    } catch (e) {
      console.error(`File: constructor: Error constructing File: ${e}`);
      throw e;
    }
  }

  private parse(path: ConstructorParameters<typeof File>[1]): FilepathString {
    return new File.FilepathString(
      typeof path === "string" ||
      Array.isArray(path) ||
      (typeof path !== "string" && path instanceof File.FilepathString)
        ? path
        : "",
    );
  }

  get base(): ReturnType<typeof FilepathString.prototype.toString> {
    return this._base.toString();
  }

  get root(): typeof File.prototype.base {
    return this.base;
  }

  get top(): typeof File.prototype.base {
    return this.base;
  }

  get subpath(): ReturnType<typeof FilepathString.prototype.toString> {
    return this._subpath.toString();
  }

  set subpath(subpath: ConstructorParameters<typeof File>[1]) {
    this._subpath = new this.Filepath(subpath);
  }

  append(subpath: ConstructorParameters<typeof File>[1]): this {
    this.subpath = this._subpath.append(subpath);
    return this;
  }

  cd(relativePath: ConstructorParameters<typeof File>[1]): this {
    this.subpath = this._subpath.cd(relativePath);
    return this;
  }

  private get _path(): FilepathString {
    return this._base.append(this.subpath);
  }

  get path(): ReturnType<typeof FilepathString.prototype.toString> {
    return this._path.toString();
  }

  get tree(): ReturnType<typeof FilepathString.prototype.toTree> {
    return this._path.toTree();
  }

  toString(): typeof File.prototype.path {
    return this.path;
  }

  toTree(): typeof File.prototype.tree {
    return this.tree;
  }

  get leaf(): string {
    return this.subpath === "" ? this._base.leaf : this._subpath.leaf;
  }

  get isTop(): boolean {
    return this.subpath === "";
  }

  get isDirectory(): boolean {
    try {
      return File.Manager.isDirectory(this.path);
    } catch (e) {
      console.error(
        `File: isDirectory: Error using Scriptable FileManager class to check whether path is directory: ${e}`,
      );
      throw e;
    }
  }

  get isFile(): boolean {
    try {
      return (
        this.parentIsDirectory &&
        File.Manager.fileExists(this.path) &&
        !this.isDirectory
      );
    } catch (e) {
      console.error(
        `File: isFile: Error using Scriptable FileManager class to check whether path is file: ${e}`,
      );
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
      return new File(this.base, this.parentSubpath);
    } catch (e) {
      console.error(`File: parent: Error getting parent File object: ${e}`);
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
      return this.isDirectory ? File.Manager.listContents(this.path) : [];
    } catch (e) {
      console.error(
        `File: ls: Error using Scriptable FileManager class to list contents of directory: ${e}`,
      );
      throw e;
    }
  }

  get isBottom(): boolean {
    return (
      !this.exists || this.isFile || (this.isDirectory && this.ls.length === 0)
    );
  }

  get descendants(): File[] {
    try {
      return this.isFile
        ? [this]
        : this.isBottom
        ? []
        : this.ls
            .map(leaf => new File(this.base, this.subpath).append(leaf))
            .filter(child => !this.path.startsWith(child.path))
            .map(file => file.descendants)
            .flat(1);
    } catch (e) {
      console.error(`File: Error getting descendants: ${e}`);
      throw e;
    }
  }

  get data(): string {
    try {
      if (!this.isReadable)
        throw new ReferenceError(
          "File is not readable. File must be a file and must exist.",
        );
      return File.Manager.readString(this.path);
    } catch (e) {
      if (!(e instanceof ReferenceError))
        e = new Error(
          `Caught unhandled exception while using Scriptable FileManager class to read data. See unhandled exception: ${e}`,
        );
      console.error(`File: data: Error reading file: ${e}`);
      throw e;
    }
  }

  read(): typeof File.prototype.data {
    return this.data;
  }

  write(data: typeof File.prototype.data, overwrite: boolean = false): this {
    try {
      if (this.isDirectory)
        throw new ReferenceError(
          "File path points to a folder. Cannot write data to a folder.",
        );
      else if (this.isReadable && !overwrite)
        throw new ReferenceError(
          "Overwrite is set to false. To overwrite an existing file, write must be called with overwrite === true.",
        );
      else {
        if (!this.parentIsDirectory)
          try {
            File.Manager.createDirectory(this.parentPath, true);
          } catch (e) {
            throw new ReferenceError(
              `Could not create parent directory using Scriptable file manager.See previous error: ${e}`,
            );
          }
        try {
          File.Manager.writeString(this.path, data);
        } catch (e) {
          throw new Error(
            `Caught unhandled exception trying to write data to file using Scriptable FileManager class. See unhandled exception: ${e}`,
          );
        }
        return this;
      }
    } catch (e) {
      console.error(`File: write: Error writing data to file: ${e}`);
      throw e;
    }
  }

  delete(force: boolean = false): this {
    try {
      if (this.exists) {
        if (force) _deleteUsingFileManager(this.path);
        else {
          const confirm: Alert = new Alert();
          confirm.message = `Are you sure you want to delete this file or folder (including all descendants)? Path: ${this.path}`;
          confirm.addDestructiveAction("Yes, DELETE this file");
          confirm.addCancelAction("Cancel");
          confirm.present().then(userChoice => {
            userChoice === 0
              ? _deleteUsingFileManager(this.path)
              : console.warn(
                  `User canceled file deletion of file or folder at path: ${this.path}`,
                );
          });
        }
      }

      function _deleteUsingFileManager(path: string): void {
        try {
          File.Manager.remove(path);
          if (File.Manager.fileExists(path))
            throw new ReferenceError(
              `File still exists after attempting to delete it using Scriptable FileManager class.`,
            );
        } catch (e) {
          if (!(e instanceof ReferenceError))
            e = new Error(
              `Caught unhandled exception trying to delete file using Scriptable FileManager class. See unhandled exception: ${e}`,
            );
          throw new Error(`_deleteUsingFileManager: ${e}`);
        }
      }

      return this;
    } catch (e) {
      console.error(`File: delete: Error deleting file: ${e}`);
      throw e;
    }
  }

  static join(
    ...paths: Parameters<typeof FilepathString.join>
  ): ReturnType<typeof FilepathString.join> {
    return File.FilepathString.join(...paths);
  }

  static mutate(
    ...paths: Parameters<typeof FilepathString.mutate>
  ): ReturnType<typeof FilepathString.mutate> {
    return File.FilepathString.mutate(...paths);
  }

  static toString(
    ...paths: Parameters<typeof FilepathString.toString>
  ): ReturnType<typeof FilepathString.toString> {
    return File.FilepathString.toString(...paths);
  }

  static toTree(
    ...paths: Parameters<typeof FilepathString.toTree>
  ): ReturnType<typeof FilepathString.toTree> {
    return File.FilepathString.toTree(...paths);
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return (
      instance !== null &&
      instance !== undefined &&
      typeof instance === "object" &&
      "_nominalType" in instance &&
      (instance as File)._nominalType === "File"
    );
  }

  get Bookmark(): typeof Bookmark {
    return File.Bookmark;
  }

  get Filepath(): typeof FilepathString {
    return File.FilepathString;
  }

  static get Bookmark(): typeof Bookmark {
    try {
      return importModule("bookmark/Bookmark");
    } catch (e) {
      console.error(`File: Error importing Bookmark class: ${e}`);
      throw e;
    }
  }

  static get FilepathString(): typeof FilepathString {
    try {
      return importModule("filepathstring/FilepathString");
    } catch (e) {
      console.error(`File: Error importing FilepathString class: ${e}`);
      throw e;
    }
  }

  static get Manager(): FileManager {
    return File.Bookmark.Manager;
  }
}

module.exports = File;
