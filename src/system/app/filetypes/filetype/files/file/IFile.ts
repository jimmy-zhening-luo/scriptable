abstract class IFile {
  public readonly name: literalful<"IFile"> = "IFile";
  protected readonly manager: FileManager = FileManager.iCloud();
  private readonly _root: rootpath;
  private _subpath: Subpath;

  constructor(
    root:
      | IFile
      | { file: IFile; rootOnly: boolean }
      | Bookmark
      | ConstructorParameters<typeof IFilepath>[0],
    ...subpaths: ConstructorParameters<typeof IFilepath>
  ) {
    try {
      this._root = root instanceof this.Bookmark || root instanceof IFile
        ? root.path
        : typeof root === "object" && "file" in root && "rootOnly" in root
          ? root.rootOnly
            ? root.file._root
            : root.file.path
          : new this
            .Rootpath(root)
            .toString();
      this._subpath = new this
        .Subpath(...subpaths);
    }
    catch (e) {
      throw new EvalError(
        `IFile: ctor`,
        { cause: e },
      );
    }
  }

  public get path(): rootpath {
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

  public get subpath(): subpath {
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

  public get descendants(): this[] {
    try {
      return this.isFile
        ? [this]
        : this.isLeaf
          ? []
          : this.ls
            .map(
              (filename: string): this =>
                this.append(filename),
            )
            .filter(
              (child: this): boolean =>
                !this.path.startsWith(child.path),
            )
            .map(
              (file: this): this[] =>
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

  private get Bookmark(): typeof Bookmark {
    try {
      return importModule(
        "bookmark/Bookmark",
      ) as typeof Bookmark;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Bookmark`,
        { cause: e },
      );
    }
  }

  private get Rootpath(): typeof Rootpath {
    try {
      return importModule(
        "./common/validators/impl/filepaths/Rootpath",
      ) as typeof Rootpath;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Rootpath`,
        { cause: e },
      );
    }
  }

  private get Subpath(): typeof Subpath {
    try {
      return importModule(
        "./common/validators/impl/filepaths/Subpath",
      ) as typeof Subpath;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Subpath`,
        { cause: e },
      );
    }
  }

  private get stringful(): typeof Stringful {
    try {
      return importModule(
        "./common/types/safe/acceptors/string/Stringful",
      ) as typeof Stringful;
    }
    catch (e) {
      throw new ReferenceError(
        `IFile: import Stringful`,
        { cause: e },
      );
    }
  }

  public set subpath(subpath: ConstructorParameters<typeof IFilepath>[1]) {
    try {
      this._subpath = new this
        .Subpath(subpath);
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
        && (instance as { name: string }).name === "IFile"
      );
    }
    catch (e) {
      throw new EvalError(
        `IFile: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  public append(...filepaths: Parameters<typeof IFilepath.prototype.append>): this {
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

  public cd(...relativeFilepath: Parameters<typeof IFilepath.prototype.cd>): this {
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
      if (!this.isFile)
        if (error)
          throw new ReferenceError(
            `file does not exist`,
          );
        else
          return "";
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

  public readful(errorLabel?: string): stringful {
    try {
      return this.stringful(
        this.read(true),
        errorLabel,
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
    text: string,
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
      else
        if (this.isFile)
          if (overwrite === false)
            throw new TypeError(
              `Unwriteable: file already exists && !overwrite`,
            );
          else
            try {
              this.manager.writeString(
                this.path,
                overwrite === "append"
                  ? this.read() + text
                  : overwrite === "line"
                    ? `${text}\n${this.read()}`
                    : text,
              );

              return this;
            }
            catch (e) {
              throw new EvalError(
                `Unexpected: FileManager tried but failed to overwrite data to existing file`,
                { cause: e },
              );
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
              text,
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
    catch (e) {
      throw new EvalError(
        `IFile: write: ${this.path}`,
        { cause: e },
      );
    }
  }

  public async delete(force: boolean = false): Promise<this> {
    try {
      if (this.exists)
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
            .then((userChoice: number): void => {
              userChoice === 0
                ? this.manager.remove(this.path)
                : console
                  .warn(
                    `Canceled by user, did NOT delete:\n${this.path}`,
                  );
            });
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

  public toString(): stringful {
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
