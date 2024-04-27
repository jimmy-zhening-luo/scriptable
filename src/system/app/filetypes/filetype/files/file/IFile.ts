abstract class IFile {
  public readonly name: string = "IFile";
  protected readonly manager: FileManager = FileManager.iCloud();
  private readonly _root: string;
  private _subpath: Filepath;

  constructor(
    root:
      | IFile
      | { file: IFile; rootOnly: boolean }
      | Bookmark
      | ConstructorParameters<typeof Filepath>[0],
    ...subpaths: ConstructorParameters<typeof Filepath>
  ) {
    try {
      this._root = root instanceof IFile || root instanceof IFile.Bookmark
        ? root.path
        : typeof root === "object" && "file" in root && "rootOnly" in root
          ? root.rootOnly
            ? root.file._root
            : root.file.path
          : new IFile
            .Filepath(root)
            .toString();
      this._subpath = new IFile
        .Filepath(...subpaths);
    }
    catch (e) {
      throw new EvalError(
        `IFile: ctor`,
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
        `IFile: import Bookmark`,
        { cause: e },
      );
    }
  }

  private static get Filepath(): typeof Filepath {
    try {
      return importModule("./common/validators/filepath/Filepath") as typeof Filepath;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Filepath`,
        { cause: e },
      );
    }
  }

  private static get stringful(): typeof Stringful {
    try {
      return importModule("./common/types/strings/Stringful") as typeof Stringful;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Stringful`,
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
        `IFile: path`,
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
        `IFile: subpath`,
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
        `IFile: exists`,
        { cause: e },
      );
    }
  }

  public get isFile(): boolean {
    try {
      return this.manager.fileExists(this.path) && !this.isDirectory;
    }
    catch (e) {
      throw new EvalError(
        `IFile: isFile`,
        { cause: e },
      );
    }
  }

  public get isDirectory(): boolean {
    try {
      return this.manager.isDirectory(this.path);
    }
    catch (e) {
      throw new EvalError(
        `IFile: isDirectory`,
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
        `IFile: isRoot`,
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
        `IFile: isLeaf`,
        { cause: e },
      );
    }
  }

  public get root(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IFile>
      )=> this)({
        file: this,
        rootOnly: true,
      });
    }
    catch (e) {
      throw new EvalError(
        `IFile: root`,
        { cause: e },
      );
    }
  }

  public get parent(): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IFile>
      )=> this)(
        this.root,
        this._subpath.parent,
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: parent`,
        { cause: e },
      );
    }
  }

  public get ls(): string[] {
    try {
      return this.isDirectory
        ? this.manager.listContents(this.path)
        : [];
    }
    catch (e) {
      throw new EvalError(
        `IFile: ls`,
        { cause: e },
      );
    }
  }

  public get descendants(): IFile[] {
    try {
      return this.isFile
        ? [this]
        : this.isLeaf
          ? []
          : this.ls
            .map(
              filename =>
                this.append(filename),
            )
            .filter(
              child =>
                !this.path.startsWith(child.path),
            )
            .map(
              file =>
                file.descendants,
            )
            .flat(1);
    }
    catch (e) {
      throw new EvalError(
        `IFile: descendants`,
        { cause: e },
      );
    }
  }

  public set subpath(subpath: ConstructorParameters<typeof Filepath>[1]) {
    try {
      this._subpath = new IFile
        .Filepath(subpath);
    }
    catch (e) {
      throw new EvalError(
        `IFile: subpath`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && "name" in instance
        && (instance as IFile).name === "IFile"
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  public append(...filepaths: Parameters<typeof Filepath.prototype.append>): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IFile>
      )=> this)(
        this,
        this
          ._subpath
          .append(...filepaths),
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: append`,
        { cause: e },
      );
    }
  }

  public cd(...relativeFilepath: Parameters<typeof Filepath.prototype.cd>): this {
    try {
      this._subpath.cd(...relativeFilepath);

      return this;
    }
    catch (e) {
      throw new EvalError(
        `IFile: cd`,
        { cause: e },
      );
    }
  }

  public read(error: boolean = false): string {
    try {
      if (!this.isFile) {
        if (error)
          throw new ReferenceError(
            `file does not exist`,
          );
        else
          return "";
      }
      else
        return this.manager.readString(this.path);
    }
    catch (e) {
      throw new EvalError(
        `IFile: read: ${this.path}`,
        { cause: e },
      );
    }
  }

  public readful(label?: string): stringful {
    try {
      return IFile.stringful(
        this.read(true),
        label,
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: readful: ${this.path}`,
        { cause: e },
      );
    }
  }

  public write(
    data: string,
    overwrite:
      | boolean
      | "overwrite"
      | "append"
      | "line" = false,
  ): this {
    try {
      if (this.isDirectory)
        throw new ReferenceError(
          `Unwriteable: path points to folder`,
        );
      else {
        if (this.isFile) {
          if (overwrite === false)
            throw new TypeError(
              `Unwriteable: file already exists && !overwrite`,
            );
          else
            try {
              this.manager.writeString(
                this.path,
                overwrite === "append"
                  ? this.read() + data
                  : overwrite === "line"
                    ? data + "\n" + this.read()
                    : data,
              );

              return this;
            }
            catch (e) {
              throw new EvalError(
                `Unexpected: FileManager tried but failed to overwrite data to existing file`,
                { cause: e },
              );
            }
        }
        else {
          if (!this.parent.isDirectory)
            try {
              this.manager.createDirectory(
                this.parent.path,
                true,
              );
            }
            catch (e) {
              throw new EvalError(
                `Unexpected: FileManager tried to create parent folder because both file and parent do not exist, but failed`,
                { cause: e },
              );
            }

          try {
            this.manager.writeString(
              this.path,
              data,
            );

            return this;
          }
          catch (e) {
            throw new EvalError(
              `Unexpected: FileManager tried but failed to write data to new file`,
              { cause: e },
            );
          }
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `IFile: write: ${this.path}`,
        { cause: e },
      );
    }
  }

  public async delete(force: boolean = false): Promise<this> {
    try {
      if (this.exists) {
        if (force)
          this.manager.remove(this.path);
        else {
          const prompt: Alert = new Alert();

          prompt
            .message = `Permanently delete?\n${this.path}`;
          prompt
            .addDestructiveAction(
              "DELETE",
            );
          prompt
            .addCancelAction(
              "Cancel",
            );
          await prompt
            .present()
            .then(userChoice => {
              userChoice === 0
                ? this.manager.remove(this.path)
                : console
                  .warn(
                    `Canceled by user, did NOT delete:\n${this.path}`,
                  );
            });
        }
      }

      return this;
    }
    catch (e) {
      throw new EvalError(
        `IFile: delete: ${this.path}`,
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
        `IFile: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = IFile;
