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
        = root instanceof IOFile || root instanceof IOFile.Bookmark
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
        `IOFile: ctor`,
        { cause: e },
      );
    }
  }

  public static get Bookmark(): typeof Bookmark {
    try {
      return importModule("bookmark/Bookmark") as typeof Bookmark;
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile: import Bookmark`,
        { cause: e },
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
        `IOFile: import Filepath`,
        { cause: e },
      );
    }
  }

  public get path(): string {
    try {
      return this._subpath.prepend(this._root);
    }
    catch (e) {
      throw new EvalError(
        `IOFile: path`,
        { cause: e },
      );
    }
  }

  public get subpath(): string {
    try {
      return this._subpath.toString();
    }
    catch (e) {
      throw new EvalError(
        `IOFile: subpath`,
        { cause: e },
      );
    }
  }

  public get exists(): boolean {
    try {
      return this.isFile || this.isDirectory;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: exists`,
        { cause: e },
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
        `IOFile: isFile`,
        { cause: e },
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
        `IOFile: isDirectory`,
        { cause: e },
      );
    }
  }

  public get isRoot(): boolean {
    try {
      return this._subpath.isEmpty;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: isRoot`,
        { cause: e },
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
        `IOFile: isLeaf`,
        { cause: e },
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
        `IOFile: root`,
        { cause: e },
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
        `IOFile: parent`,
        { cause: e },
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
        `IOFile: ls`,
        { cause: e },
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
        `IOFile: descendants`,
        { cause: e },
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
        `IOFile: subpath`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as IOFile)._nominalType === "IOFile"
      );
    }
    catch (e) {
      throw new EvalError(
        `IOFile: [Symbol.hasInstance]`,
        { cause: e },
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
        `IOFile: append`,
        { cause: e },
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
        `IOFile: cd`,
        { cause: e },
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
        `IOFile: read: ${this.path}`,
        { cause: e },
      );
    }
  }

  public write(data: string, overwrite: boolean = false): this {
    try {
      if (this.isDirectory)
        throw new ReferenceError(
          `unwriteable location; filepath points to a folder`,
        );
      else if (this.isFile && !overwrite)
        throw new ReferenceError(
          `unwriteable file: file already exists, and overwrite is false`,
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
              `Unexpected: FileManager tried but failed to create parent directory for file to write`,
              { cause: e },
            );
          }
        try {
          FileManager
            .iCloud()
            .writeString(this.path, data);
        }
        catch (e) {
          throw new EvalError(
            `Unexpected: FileManager tried but failed to write data to file`,
            { cause: e },
          );
        }

        return this;
      }
    }
    catch (e) {
      throw new EvalError(
        `IOFile: write: ${this.path}`,
        { cause: e },
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
              `Unexpected: FileManager deleted file, but file still exists`,
            );
        }
        catch (e) {
          throw new EvalError(
            `__deleteUsingFileManager`,
            { cause: e },
          );
        }
      }

      return this;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: delete: ${this.path}`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this.path;
    }
    catch (e) {
      throw new EvalError(
        `IOFile: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = IOFile;
