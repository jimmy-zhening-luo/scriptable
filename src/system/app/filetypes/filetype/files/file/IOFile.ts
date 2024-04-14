class IOFile {
  public readonly _nominalType: string = "IOFile";

  private readonly _root: Filepath;
  private _subpath: Filepath;

  constructor(
    base:
    | IOFile
    | ConstructorParameters<typeof Filepath>[0],
    ...subpaths: ConstructorParameters<typeof Filepath>
  ) {
    try {
      this._root
        = base instanceof IOFile
          ? base._path
          : new IOFile.Filepath(
            base,
          );
      this._subpath = new IOFile.Filepath(
        ...subpaths
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: ctor: \n${e as string}`,
      );
    }
  }

  public static get Bookmark(): typeof Bookmark {
    try {
      return importModule("bookmark/Bookmark") as typeof Bookmark;
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: import Bookmark: \n${e as string}`
      );
    }
  }

  protected static get Filepath(): typeof Filepath {
    try {
      return importModule(
        "filepath/Filepath",
      ) as typeof Filepath;
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: Error importing Filepath class: \n${e as string}`,
      );
    }
  }

  public get path(): string {
    try {
      return this._path.toString();
    }
    catch (e) {
      throw new EvalError(
        `IOFile: path: \n${e as string}`,
      );
    }
  }

  public get tree(): string {
    try {
      return this._path.tree;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: tree: \n${e as string}`,
      );
    }
  }

  public get root(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IOFile>
      ) => this)(
        this._root,
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: root: \n${e as string}`,
      );
    }
  }

  public get subpath(): string {
    try {
      return this._subpath.toString();
    }
    catch (e) {
      throw new EvalError(
        `IOFile: subpath: Error getting subpath: \n${e as string}`
      );
    }
  }

  public get leaf(): string {
    try {
      return this._path.leaf;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: leaf: \n${e as string}`,
      );
    }
  }

  public get exists(): boolean {
    try {
      return this.isFile || this.isDirectory;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: exists: \n${e as string}`,
      );
    }
  }

  public get isFile(): boolean {
    try {
      return FileManager
        .iCloud()
        .fileExists(
          this.path,
        )
        && !this.isDirectory;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: isFile: \n${e as string}`,
      );
    }
  }

  public get isDirectory(): boolean {
    try {
      return FileManager
        .iCloud()
        .isDirectory(
          this.path,
        );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: isDirectory: \n${e as string}`,
      );
    }
  }

  public get isRoot(): boolean {
    try {
      return this._subpath.isEmpty;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: isRoot: \n${e as string}`,
      );
    }
  }

  public get isLeaf(): boolean {
    try {
      return (
        !this.exists
        || this.isFile
        || this.isDirectory
        && this.ls.length === 0
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: isLeaf: \n${e as string}`,
      );
    }
  }

  public get parent(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IOFile>
      ) => this)(
        this.root,
        this._subpath.parent,
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: parent: \n${e as string}`,
      );
    }
  }

  public get ls(): string[] {
    try {
      return this.isDirectory
        ? FileManager
          .iCloud()
          .listContents(
            this.path,
          )
        : [];
    }
    catch (e) {
      throw new EvalError(
        `IOFile: ls: \n${e as string}`,
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
            .map(leaf =>
              this.append(
                leaf,
              ))
            .filter(child =>
              !this.path.startsWith(
                child.path,
              ))
            .map(file =>
              file.descendants)
            .flat(1);
    }
    catch (e) {
      throw new EvalError(
        `IOFile: descendants: \n${e as string}`,
      );
    }
  }

  private get _path(): Filepath {
    try {
      return this._root.append(
        this._subpath,
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: _path: \n${e as string}`,
      );
    }
  }

  public set subpath(
    subpath: ConstructorParameters<typeof Filepath>[1],
  ) {
    try {
      this._subpath = new IOFile.Filepath(
        subpath,
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: subpath: \n${e as string}`,
      );
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
      throw new EvalError(
        `IOFile: [Symbol.hasInstance]: \n${e as string}`,
      );
    }
  }

  public static join(
    ...filepaths: Parameters<typeof Filepath.join>
  ): ReturnType<typeof Filepath.join> {
    try {
      return IOFile.Filepath.join(...filepaths);
    }
    catch (e) {
      throw new EvalError(`IOFile: static join: Error joining paths: \n${e as string}`);
    }
  }

  public append(
    ...filepaths: Parameters<typeof Filepath.prototype.append>
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
    ...relativeFilepath: Parameters<typeof Filepath.prototype.cd>
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
              `Could not create parent directory using Scriptable FileManager class: \n${e as string}`,
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

  public async delete(
    force: boolean = false,
  ): Promise<this> {
    try {
      if (this.exists) {
        if (force) __deleteUsingFileManager(this.path);
        else {
          const confirm: Alert = new Alert();

          confirm
            .message = `Are you sure you want to delete this file or folder (including all descendants)? Path: ${this.path}`;
          confirm
            .addDestructiveAction(
              "Yes, DELETE this file",
            );
          confirm
            .addCancelAction(
              "Cancel",
            );
          await confirm
            .present()
            .then(userChoice => {
              userChoice === 0
                ? __deleteUsingFileManager(
                  this.path,
                )
                : console
                  .warn(
                    `User canceled file deletion of file or folder at path: ${this.path}`,
                  );
            });
        }
      }

      function __deleteUsingFileManager(
        path: string,
      ): void {
        try {
          FileManager.iCloud()
            .remove(path);
          if (FileManager.iCloud()
            .fileExists(path))
            throw new ReferenceError(
              `Unexpected: IOFile still exists, even after deleting it using Scriptable.FileManager`,
            );
        }
        catch (e) {
          throw new EvalError(
            `__deleteUsingFileManager: \n${e as string}`,
          );
        }
      }

      return this;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: delete: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.path;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: toString: \n${e as string}`,
      );
    }
  }
}

module.exports = IOFile;
