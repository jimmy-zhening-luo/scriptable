class File {
  readonly _nominalType: string = "File";
  private readonly _root: FilepathString;
  private _subpath: FilepathString;

  constructor(
    base:
    | File
    | Bookmark
    | ConstructorParameters<typeof FilepathString>[0] = "",
    ...subpaths: ConstructorParameters<typeof FilepathString>
  ) {
    try {
      this._root
        = base instanceof File
          ? base._path
          : new File.FilepathString(
            base instanceof File.Bookmark ? base.path : base,
          );
      this._subpath = new File.FilepathString(...subpaths);
    }
    catch (e) {
      throw new SyntaxError(
        `File: constructor: Error constructing File: \n${e}`,
      );
    }
  }

  get subpath(): string {
    try {
      return this._subpath.toString();
    }
    catch (e) {
      throw new EvalError(`File: subpath: Error getting subpath: \n${e}`);
    }
  }

  set subpath(subpath: ConstructorParameters<typeof FilepathString>[0]) {
    try {
      this._subpath = new File.FilepathString(subpath);
    }
    catch (e) {
      throw new SyntaxError(`File: subpath: Error setting subpath: \n${e}`);
    }
  }

  private get _path(): FilepathString {
    try {
      return this._root.append(this._subpath);
    }
    catch (e) {
      throw new EvalError(`File: _path: Error getting path: \n${e}`);
    }
  }

  get path(): string {
    try {
      return this._path.toString();
    }
    catch (e) {
      throw new EvalError(`File: path: Error getting path: \n${e}`);
    }
  }

  get leaf(): string {
    try {
      return this._path.leaf;
    }
    catch (e) {
      throw new EvalError(`File: leaf: Error getting leaf: \n${e}`);
    }
  }

  get root(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof File>
      ) => this)(this._root);
    }
    catch (e) {
      throw new EvalError(`File: root: Error getting root: \n${e}`);
    }
  }

  get parent(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof File>
      ) => this)(this.root, this._subpath.parent);
    }
    catch (e) {
      throw new ReferenceError(
        `File: parent: Error getting parent File object: \n${e}`,
      );
    }
  }

  get exists(): boolean {
    try {
      return this.isFile || this.isDirectory;
    }
    catch (e) {
      throw new ReferenceError(
        `File: exists: Error checking whether file exists: \n${e}`,
      );
    }
  }

  get isFile(): boolean {
    try {
      return FileManager.iCloud()
        .fileExists(this.path) && !this.isDirectory;
    }
    catch (e) {
      throw new ReferenceError(
        `File: isFile: Error using Scriptable FileManager class to check whether path is file: \n${e}`,
      );
    }
  }

  get isDirectory(): boolean {
    try {
      return FileManager.iCloud()
        .isDirectory(this.path);
    }
    catch (e) {
      throw new ReferenceError(
        `File: isDirectory: Error using Scriptable FileManager class to check whether path is directory: \n${e}`,
      );
    }
  }

  get isRoot(): boolean {
    try {
      return this._subpath.isEmpty;
    }
    catch (e) {
      throw new EvalError(
        `File: isRoot: Error checking whether file is root (empty subpath): \n${e}`,
      );
    }
  }

  get isLeaf(): boolean {
    try {
      return (
        !this.exists
        || this.isFile
        || this.isDirectory && this.ls.length === 0
      );
    }
    catch (e) {
      throw new ReferenceError(
        `File: isLeaf: Error checking whether file is leaf: \n${e}`,
      );
    }
  }

  get ls(): string[] {
    try {
      return this.isDirectory
        ? FileManager.iCloud()
          .listContents(this.path)
        : [];
    }
    catch (e) {
      throw new ReferenceError(
        `File: ls: Error using Scriptable FileManager class to list contents of directory: \n${e}`,
      );
    }
  }

  get descendants(): File[] {
    try {
      return this.isFile
        ? [this]
        : this.isLeaf
          ? []
          : this.ls
            .map(leaf => this.append(leaf))
            .filter(child => !this.path.startsWith(child.path))
            .map(file => file.descendants)
            .flat(1);
    }
    catch (e) {
      throw new ReferenceError(`File: Error getting descendants: \n${e}`);
    }
  }

  append(
    ...filepaths: Parameters<typeof FilepathString.prototype.append>
  ): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof File>
      ) => this)(this.root, this._subpath.append(...filepaths));
    }
    catch (e) {
      throw new EvalError(`File: append: Error appending subpath: \n${e}`);
    }
  }

  cd(
    ...relativeFilepath: Parameters<typeof FilepathString.prototype.cd>
  ): this {
    try {
      this._subpath.cd(...relativeFilepath);

      return this;
    }
    catch (e) {
      throw new EvalError(`File: cd: Error changing directory: \n${e}`);
    }
  }

  read(): string {
    try {
      if (!this.isFile) throw new ReferenceError(`File does not exist.`);

      return FileManager.iCloud()
        .readString(this.path);
    }
    catch (e) {
      throw new EvalError(
        `File: read: Error reading file at "${this.path}": \n${e}`,
      );
    }
  }

  write(data: string, overwrite: boolean = false): this {
    try {
      if (this.isDirectory)
        throw new ReferenceError(
          `Path points to folder. Cannot write to a folder.`,
        );
      else if (this.isFile && !overwrite)
        throw new ReferenceError(
          `To overwrite an existing file, File.write must be called with flag 'overwrite' === true.`,
        );
      else {
        if (!this.parent.isDirectory)
          try {
            FileManager.iCloud()
              .createDirectory(this.parent.path, true);
          }
          catch (e) {
            throw new EvalError(
              `Could not create parent directory using Scriptable FileManager class. See caught error: \n${e}`,
            );
          }
        try {
          FileManager.iCloud()
            .writeString(this.path, data);
        }
        catch (e) {
          throw new EvalError(
            `Could not write data to file using Scriptable FileManager class. See caught error: \n${e}`,
          );
        }

        return this;
      }
    }
    catch (e) {
      throw new EvalError(
        `File: write: Error writing data to file "${this.path}": \n${e}`,
      );
    }
  }

  delete(force: boolean = false): this {
    try {
      if (this.exists) {
        if (force) __deleteUsingFileManager(this.path);
        else {
          const confirm: Alert = new Alert();

          confirm.message = `Are you sure you want to delete this file or folder (including all descendants)? Path: ${this.path}`;
          confirm.addDestructiveAction("Yes, DELETE this file");
          confirm.addCancelAction("Cancel");
          confirm.present()
            .then(userChoice => {
              userChoice === 0
                ? __deleteUsingFileManager(this.path)
                : console.warn(
                  `User canceled file deletion of file or folder at path: ${this.path}`,
                );
            });
        }
      }

      function __deleteUsingFileManager(path: string): void {
        try {
          FileManager.iCloud()
            .remove(path);
          if (FileManager.iCloud()
            .fileExists(path))
            throw new ReferenceError(
              `File still exists after using Scriptable FileManager class to delete it.`,
            );
        }
        catch (e) {
          if (!(e instanceof ReferenceError))
            e = new EvalError(
              `Could not delete file using Scriptable FileManager class. See caught error: \n${e}`,
            );
          throw new EvalError(`__deleteUsingFileManager: \n${e}`);
        }
      }

      return this;
    }
    catch (e) {
      throw new EvalError(
        `File: delete: Error deleting file at path "${this.path}": \n${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.path;
    }
    catch (e) {
      throw new EvalError(`File: toString: Error getting path: \n${e}`);
    }
  }

  toTree(): string[] {
    try {
      return this._path.toTree();
    }
    catch (e) {
      throw new EvalError(`File: toTree: Error getting tree: \n${e}`);
    }
  }

  static join(
    ...filepaths: Parameters<typeof FilepathString.join>
  ): ReturnType<typeof FilepathString.join> {
    try {
      return File.FilepathString.join(...filepaths);
    }
    catch (e) {
      throw new SyntaxError(`File: static join: Error joining paths: \n${e}`);
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null
        && instance !== undefined
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as File)._nominalType === "File"
      );
    }
    catch (e) {
      throw new Error(`File: Error checking if object is File: \n${e}`);
    }
  }

  static get Bookmark(): typeof Bookmark {
    try {
      return importModule("bookmark/Bookmark") as typeof Bookmark;
    }
    catch (e) {
      throw new ReferenceError(`File: Error importing Bookmark class: \n${e}`);
    }
  }

  static get FilepathString(): typeof FilepathString {
    try {
      return importModule(
        "filepathstring/FilepathString",
      ) as typeof FilepathString;
    }
    catch (e) {
      throw new ReferenceError(
        `File: Error importing FilepathString class: \n${e}`,
      );
    }
  }
}

module.exports = File;
