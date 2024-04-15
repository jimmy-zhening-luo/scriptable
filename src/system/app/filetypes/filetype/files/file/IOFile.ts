class IOFile {
  public readonly _nominalType: string = "IOFile";
  private readonly _root: string;
  private _subpath: Filepath;

  constructor(
    root:
    | IOFile
    | { file: IOFile; rootOnly: boolean }
    | Bookmark
    | ConstructorParameters<typeof Filepath>[0],
    ...subpaths: ConstructorParameters<typeof Filepath>
  ) {
    try {
      this._root
        = root instanceof IOFile || root instanceof Bookmark
          ? root.path
          : typeof root === "object" && "file" in root && "rootOnly" in root
            ? root.rootOnly
              ? root.file._root
              : root.file.path
            : new IOFile
              .Filepath(
                root,
              )
              .toString();
      this._subpath = new IOFile
        .Filepath(
          ...subpaths,
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
        `IOFile: import Bookmark: \n${e as string}`,
      );
    }
  }

  protected static get Filepath(): typeof Filepath {
    try {
      return importModule(
        "./common/validators/filepath/Filepath",
      ) as typeof Filepath;
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: import Filepath: \n${e as string}`,
      );
    }
  }

  public get path(): string {
    try {
      return this._subpath.prepend(this._root);
    }
    catch (e) {
      throw new EvalError(
        `IOFile: path: \n${e as string}`,
      );
    }
  }

  public get subpath(): string {
    try {
      return this._subpath.toString();
    }
    catch (e) {
      throw new EvalError(
        `IOFile: subpath: \n${e as string}`,
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

  public get root(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IOFile>
      ) => this)(
        {
          file: this,
          rootOnly: true,
        },
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: root: \n${e as string}`,
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
            .map(
              filename =>
                this.append(
                  filename,
                ),
            )
            .filter(
              child =>
                !this.path.startsWith(
                  child.path,
                ),
            )
            .map(
              file =>
                file.descendants,
            )
            .flat(
              1,
            );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: descendants: \n${e as string}`,
      );
    }
  }

  public set subpath(
    subpath: ConstructorParameters<typeof Filepath>[1],
  ) {
    try {
      this._subpath = new IOFile
        .Filepath(
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

  public append(
    ...filepaths: Parameters<typeof Filepath.prototype.append>
  ): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IOFile>
      ) => this)(
        this,
        this
          ._subpath
          .append(
            ...filepaths,
          ),
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: append: \n${e as string}`,
      );
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
      throw new EvalError(
        `IOFile: cd: \n${e as string}`,
      );
    }
  }

  public read(): string {
    try {
      if (!this.isFile)
        throw new ReferenceError(
          `file does not exist`,
        );

      return FileManager
        .iCloud()
        .readString(this.path);
    }
    catch (e) {
      throw new EvalError(
        `IOFile: read: \n${e as string}`,
      );
    }
  }

  public write(data: string, overwrite: boolean = false): this {
    try {
      if (this.isDirectory)
        throw new ReferenceError(
          `path points to folder`,
        );
      else if (this.isFile && !overwrite)
        throw new ReferenceError(
          `cannot write: file already exists, and overwrite is set to false`,
        );
      else {
        if (!this.parent.isDirectory)
          try {
            FileManager
              .iCloud()
              .createDirectory(this.parent.path, true);
          }
          catch (e) {
            throw new EvalError(
              `tried to create directory, but FileManager failed to create directory: \n${e as string}`,
            );
          }
        try {
          FileManager
            .iCloud()
            .writeString(this.path, data);
        }
        catch (e) {
          throw new EvalError(
            `FileManager failed to write data: \n${e as string}`,
          );
        }

        return this;
      }
    }
    catch (e) {
      throw new EvalError(
        `IOFile: write: \n${e as string}`,
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
          FileManager
            .iCloud()
            .remove(path);
          if (
            FileManager
              .iCloud()
              .fileExists(path)
          )
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
