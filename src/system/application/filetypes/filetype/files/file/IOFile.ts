class IOFile {
  public readonly _nominalType: string = "IOFile";
  private readonly _root: FilepathString;
  private _subpath: FilepathString;

  constructor(
    base:
    | IOFile
    | Bookmark
    | ConstructorParameters<typeof FilepathString>[0] = "",
    ...subpaths: ConstructorParameters<typeof FilepathString>
  ) {
    try {
      this._root
        = base instanceof IOFile
          ? base._path
          : new IOFile.FilepathString(
            base instanceof IOFile.Bookmark
              ? base.path
              : base,
          );
      this._subpath = new IOFile.FilepathString(...subpaths);
    }
    catch (e) {
      throw new SyntaxError(
        `IOFile: constructor: Error constructing IOFile: \n${e as string}`,
      );
    }
  }

  public static get Bookmark(): typeof Bookmark {
    try {
      return importModule("bookmark/Bookmark") as typeof Bookmark;
    }
    catch (e) {
      throw new ReferenceError(`IOFile: Error importing Bookmark class: \n${e as string}`);
    }
  }

  public static get FilepathString(): typeof FilepathString {
    try {
      return importModule(
        "filepathstring/FilepathString",
      ) as typeof FilepathString;
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: Error importing FilepathString class: \n${e as string}`,
      );
    }
  }

  public get subpath(): string {
    try {
      return this._subpath.toString();
    }
    catch (e) {
      throw new EvalError(`IOFile: subpath: Error getting subpath: \n${e as string}`);
    }
  }

  public get path(): string {
    try {
      return this._path.toString();
    }
    catch (e) {
      throw new EvalError(`IOFile: path: Error getting path: \n${e as string}`);
    }
  }

  public get leaf(): string {
    try {
      return this._path.leaf;
    }
    catch (e) {
      throw new EvalError(`IOFile: leaf: Error getting leaf: \n${e as string}`);
    }
  }

  public get root(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IOFile>
      ) => this)(this._root);
    }
    catch (e) {
      throw new EvalError(`IOFile: root: Error getting root: \n${e as string}`);
    }
  }

  public get parent(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IOFile>
      ) => this)(this.root, this._subpath.parent);
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: parent: Error getting parent IOFile object: \n${e as string}`,
      );
    }
  }

  public get exists(): boolean {
    try {
      return this.isFile || this.isDirectory;
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: exists: Error checking whether file exists: \n${e as string}`,
      );
    }
  }

  public get isFile(): boolean {
    try {
      return FileManager.iCloud()
        .fileExists(this.path) && !this.isDirectory;
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: isFile: Error using Scriptable FileManager class to check whether path is file: \n${e as string}`,
      );
    }
  }

  public get isDirectory(): boolean {
    try {
      return FileManager.iCloud()
        .isDirectory(this.path);
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: isDirectory: Error using Scriptable FileManager class to check whether path is directory: \n${e as string}`,
      );
    }
  }

  public get isRoot(): boolean {
    try {
      return this._subpath.isEmpty;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: isRoot: Error checking whether file is root (empty subpath): \n${e as string}`,
      );
    }
  }

  public get isLeaf(): boolean {
    try {
      return (
        !this.exists
        || this.isFile
        || this.isDirectory && this.ls.length === 0
      );
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: isLeaf: Error checking whether file is leaf: \n${e as string}`,
      );
    }
  }

  public get ls(): string[] {
    try {
      return this.isDirectory
        ? FileManager.iCloud()
          .listContents(this.path)
        : [];
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: ls: Error using Scriptable FileManager class to list contents of directory: \n${e as string}`,
      );
    }
  }

  public get descendants(): IOFile[] {
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
      throw new ReferenceError(`IOFile: Error getting descendants: \n${e as string}`);
    }
  }

  private get _path(): FilepathString {
    try {
      return this._root.append(this._subpath);
    }
    catch (e) {
      throw new EvalError(`IOFile: _path: Error getting path: \n${e as string}`);
    }
  }

  public set subpath(subpath: ConstructorParameters<typeof FilepathString>[0]) {
    try {
      this._subpath = new IOFile.FilepathString(subpath);
    }
    catch (e) {
      throw new SyntaxError(`IOFile: subpath: Error setting subpath: \n${e as string}`);
    }
  }

  public static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null
        && instance !== undefined
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as IOFile)._nominalType === "IOFile"
      );
    }
    catch (e) {
      throw new Error(`IOFile: Error checking if object is IOFile: \n${e as string}`);
    }
  }

  public static join(
    ...filepaths: Parameters<typeof FilepathString.join>
  ): ReturnType<typeof FilepathString.join> {
    try {
      return IOFile.FilepathString.join(...filepaths);
    }
    catch (e) {
      throw new SyntaxError(`IOFile: static join: Error joining paths: \n${e as string}`);
    }
  }

  public append(
    ...filepaths: Parameters<typeof FilepathString.prototype.append>
  ): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IOFile>
      ) => this)(this.root, this._subpath.append(...filepaths));
    }
    catch (e) {
      throw new EvalError(`IOFile: append: Error appending subpath: \n${e as string}`);
    }
  }

  public cd(
    ...relativeFilepath: Parameters<typeof FilepathString.prototype.cd>
  ): this {
    try {
      this._subpath.cd(...relativeFilepath);

      return this;
    }
    catch (e) {
      throw new EvalError(`IOFile: cd: Error changing directory: \n${e as string}`);
    }
  }

  public read(): string {
    try {
      if (!this.isFile) throw new ReferenceError(`IOFile does not exist.`);

      return FileManager.iCloud()
        .readString(this.path);
    }
    catch (e) {
      throw new EvalError(
        `IOFile: read: Error reading file at "${this.path}": \n${e as string}`,
      );
    }
  }

  public write(data: string, overwrite: boolean = false): this {
    try {
      if (this.isDirectory)
        throw new ReferenceError(
          `Path points to folder. Cannot write to a folder.`,
        );
      else if (this.isFile && !overwrite)
        throw new ReferenceError(
          `To overwrite an existing file, IOFile.write must be called with flag 'overwrite' === true.`,
        );
      else {
        if (!this.parent.isDirectory)
          try {
            FileManager.iCloud()
              .createDirectory(this.parent.path, true);
          }
          catch (e) {
            throw new EvalError(
              `Could not create parent directory using Scriptable FileManager class. See caught error: \n${e as string}`,
            );
          }
        try {
          FileManager.iCloud()
            .writeString(this.path, data);
        }
        catch (e) {
          throw new EvalError(
            `Could not write data to file using Scriptable FileManager class. See caught error: \n${e as string}`,
          );
        }

        return this;
      }
    }
    catch (e) {
      throw new EvalError(
        `IOFile: write: Error writing data to file "${this.path}": \n${e as string}`,
      );
    }
  }

  public async delete(force: boolean = false): Promise<this> {
    try {
      if (this.exists) {
        if (force) __deleteUsingFileManager(this.path);
        else {
          const confirm: Alert = new Alert();

          confirm.message = `Are you sure you want to delete this file or folder (including all descendants)? Path: ${this.path}`;
          confirm.addDestructiveAction("Yes, DELETE this file");
          confirm.addCancelAction("Cancel");
          await confirm.present()
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
              `IOFile still exists after using Scriptable FileManager class to delete it.`,
            );
        }
        catch (e) {
          if (!(e instanceof ReferenceError))
            e = new EvalError(
              `Could not delete file using Scriptable FileManager class. See caught error: \n${e as string}`,
            );
          throw new EvalError(`__deleteUsingFileManager: \n${e as string}`);
        }
      }

      return this;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: delete: Error deleting file at path "${this.path}": \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.path;
    }
    catch (e) {
      throw new EvalError(`IOFile: toString: Error getting path: \n${e as string}`);
    }
  }

  public toTree(): string[] {
    try {
      return this._path.toTree();
    }
    catch (e) {
      throw new EvalError(`IOFile: toTree: Error getting tree: \n${e as string}`);
    }
  }
}

module.exports = IOFile;
