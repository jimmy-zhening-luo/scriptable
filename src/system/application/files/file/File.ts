class File {
  readonly _nominalType: string = "File";
  private readonly _base: FilepathString;
  private _subpath: FilepathString;

  constructor(
    base: string | string[] | FilepathString | File | Bookmark = "",
    subpath: string | string[] | FilepathString = "",
  ) {
    try {
      if (base instanceof File) {
        this._base = new File.FilepathString(base.base);
        this._subpath = new File.FilepathString(base.subpath);
      } else if (base instanceof File.Bookmark) {
        this._base = new File.FilepathString(base.path);
        this._subpath = new File.FilepathString(subpath);
      } else {
        this._base = new File.FilepathString(base);
        this._subpath = new File.FilepathString(subpath);
      }
    } catch (e) {
      throw new SyntaxError(`File: constructor: Error constructing File: ${e}`);
    }
  }

  get base(): ReturnType<typeof FilepathString.prototype.toString> {
    try {
      return this._base.toString();
    } catch (e) {
      throw new Error(`File: base: Error getting base: ${e}`);
    }
  }

  get root(): typeof File.prototype.base {
    try {
      return this.base;
    } catch (e) {
      throw new Error(`File: root: Error getting root: ${e}`);
    }
  }

  get top(): typeof File.prototype.base {
    try {
      return this.base;
    } catch (e) {
      throw new Error(`File: top: Error getting top: ${e}`);
    }
  }

  get subpath(): ReturnType<typeof FilepathString.prototype.toString> {
    try {
      return this._subpath.toString();
    } catch (e) {
      throw new Error(`File: subpath: Error getting subpath: ${e}`);
    }
  }

  set subpath(subpath: ConstructorParameters<typeof File>[1]) {
    try {
      this._subpath = new this.Filepath(subpath);
    } catch (e) {
      throw new Error(`File: subpath: Error setting subpath: ${e}`);
    }
  }

  append(subpath: ConstructorParameters<typeof File>[1]): this {
    try {
      this.subpath = this._subpath.append(subpath);
      return this;
    } catch (e) {
      throw new Error(`File: append: Error appending subpath: ${e}`);
    }
  }

  cd(relativePath: ConstructorParameters<typeof File>[1]): this {
    try {
      this.subpath = this._subpath.cd(relativePath);
      return this;
    } catch (e) {
      throw new Error(`File: cd: Error changing directory: ${e}`);
    }
  }

  private get _path(): FilepathString {
    try {
      return this._base.append(this.subpath);
    } catch (e) {
      throw new Error(`File: _path: Error getting path: ${e}`);
    }
  }

  get path(): ReturnType<typeof FilepathString.prototype.toString> {
    try {
      return this._path.toString();
    } catch (e) {
      throw new Error(`File: path: Error getting path: ${e}`);
    }
  }

  get tree(): ReturnType<typeof FilepathString.prototype.toTree> {
    try {
      return this._path.toTree();
    } catch (e) {
      throw new Error(`File: tree: Error getting tree: ${e}`);
    }
  }

  toString(): typeof File.prototype.path {
    try {
      return this.path;
    } catch (e) {
      throw new Error(`File: toString: Error getting path: ${e}`);
    }
  }

  toTree(): typeof File.prototype.tree {
    try {
      return this.tree;
    } catch (e) {
      throw new Error(`File: toTree: Error getting tree: ${e}`);
    }
  }

  get leaf(): string {
    try {
      return this.subpath === "" ? this._base.leaf : this._subpath.leaf;
    } catch (e) {
      throw new Error(`File: leaf: Error getting leaf: ${e}`);
    }
  }

  get isTop(): boolean {
    try {
      return this.subpath === "";
    } catch (e) {
      throw new Error(`File: isTop: Error checking whether file is top: ${e}`);
    }
  }

  get isDirectory(): boolean {
    try {
      return File.Manager.isDirectory(this.path);
    } catch (e) {
      throw new Error(
        `File: isDirectory: Error using Scriptable FileManager class to check whether path is directory: ${e}`,
      );
    }
  }

  get isFile(): boolean {
    try {
      return !this.isDirectory && File.Manager.fileExists(this.path);
    } catch (e) {
      throw new Error(
        `File: isFile: Error using Scriptable FileManager class to check whether path is file: ${e}`,
      );
    }
  }

  get exists(): boolean {
    try {
      return this.isFile || this.isDirectory;
    } catch (e) {
      throw new Error(`File: exists: Error checking whether file exists: ${e}`);
    }
  }

  get isEnumerable(): boolean {
    try {
      return this.isDirectory;
    } catch (e) {
      throw new Error(
        `File: isEnumerable: Error checking whether file is enumerable: ${e}`,
      );
    }
  }

  get isReadable(): boolean {
    try {
      return this.isFile;
    } catch (e) {
      throw new Error(
        `File: isReadable: Error checking whether file is readable: ${e}`,
      );
    }
  }

  get parentSubpath(): string {
    try {
      return this._subpath.parent;
    } catch (e) {
      throw new Error(
        `File: parentSubpath: Error getting parent subpath: ${e}`,
      );
    }
  }

  get isOwnParent(): boolean {
    try {
      return this.subpath === this.parentSubpath;
    } catch (e) {
      throw new Error(
        `File: isOwnParent: Error checking whether file is own parent: ${e}`,
      );
    }
  }

  get parent(): File {
    try {
      return new File(this.base, this.parentSubpath);
    } catch (e) {
      throw new Error(`File: parent: Error getting parent File object: ${e}`);
    }
  }

  get parentPath(): string {
    try {
      return this.parent.path;
    } catch (e) {
      throw new Error(`File: parentPath: Error getting parent path: ${e}`);
    }
  }

  get parentIsDirectory(): boolean {
    try {
      return this.parent.isDirectory;
    } catch (e) {
      throw new Error(
        `File: parentIsDirectory: Error checking whether parent is directory: ${e}`,
      );
    }
  }

  get ls(): string[] {
    try {
      return this.isDirectory ? File.Manager.listContents(this.path) : [];
    } catch (e) {
      throw new Error(
        `File: ls: Error using Scriptable FileManager class to list contents of directory: ${e}`,
      );
    }
  }

  get isBottom(): boolean {
    try {
      return (
        !this.exists ||
        this.isFile ||
        (this.isDirectory && this.ls.length === 0)
      );
    } catch (e) {
      throw new Error(
        `File: isBottom: Error checking whether file is bottom: ${e}`,
      );
    }
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
      throw new Error(`File: Error getting descendants: ${e}`);
    }
  }

  get data(): string {
    try {
      if (!this.isReadable)
        throw new ReferenceError(
          `File is not readable. File must be a file and must exist.`,
        );
      return File.Manager.readString(this.path);
    } catch (e) {
      if (!(e instanceof ReferenceError))
        e = new Error(
          `Caught unhandled exception while using Scriptable FileManager class to read data. See unhandled exception: ${e}`,
        );
      throw new Error(`File: data: Error reading file at "${this.path}": ${e}`);
    }
  }

  read(): typeof File.prototype.data {
    try {
      return this.data;
    } catch (e) {
      throw new Error(`File: read: Error reading file: ${e}`);
    }
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
      throw new Error(
        `File: write: Error writing data to file "${this.path}": ${e}`,
      );
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
      throw new Error(`File: delete: Error deleting file: ${e}`);
    }
  }

  static join(
    ...paths: Parameters<typeof FilepathString.join>
  ): ReturnType<typeof FilepathString.join> {
    try {
      return File.FilepathString.join(...paths);
    } catch (e) {
      throw new Error(`File: join: Error joining paths: ${e}`);
    }
  }

  static mutate(
    ...paths: Parameters<typeof FilepathString.mutate>
  ): ReturnType<typeof FilepathString.mutate> {
    try {
      return File.FilepathString.mutate(...paths);
    } catch (e) {
      throw new Error(`File: mutate: Error mutating paths: ${e}`);
    }
  }

  static toString(
    ...paths: Parameters<typeof FilepathString.toString>
  ): ReturnType<typeof FilepathString.toString> {
    try {
      return File.FilepathString.toString(...paths);
    } catch (e) {
      throw new Error(`File: toString: Error converting paths to string: ${e}`);
    }
  }

  static toTree(
    ...paths: Parameters<typeof FilepathString.toTree>
  ): ReturnType<typeof FilepathString.toTree> {
    try {
      return File.FilepathString.toTree(...paths);
    } catch (e) {
      throw new Error(`File: toTree: Error converting paths to tree: ${e}`);
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null &&
        instance !== undefined &&
        typeof instance === "object" &&
        "_nominalType" in instance &&
        (instance as File)._nominalType === "File"
      );
    } catch (e) {
      throw new Error(`File: Error checking if instance is File: ${e}`);
    }
  }

  get Bookmark(): typeof Bookmark {
    try {
      return File.Bookmark;
    } catch (e) {
      throw new Error(`File: Error getting Bookmark class: ${e}`);
    }
  }

  get Filepath(): typeof FilepathString {
    try {
      return File.FilepathString;
    } catch (e) {
      throw new Error(`File: Error getting FilepathString class: ${e}`);
    }
  }

  static get Bookmark(): typeof Bookmark {
    try {
      return importModule("bookmark/Bookmark");
    } catch (e) {
      throw new Error(`File: Error importing Bookmark class: ${e}`);
    }
  }

  static get FilepathString(): typeof FilepathString {
    try {
      return importModule("filepathstring/FilepathString");
    } catch (e) {
      throw new Error(`File: Error importing FilepathString class: ${e}`);
    }
  }

  static get Manager(): FileManager {
    try {
      return File.Bookmark.Manager;
    } catch (e) {
      throw new Error(`File: Error getting FileManager class: ${e}`);
    }
  }
}

module.exports = File;
