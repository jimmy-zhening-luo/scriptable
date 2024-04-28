abstract class Filetype<
  Type extends string,
  F extends IFile = ReadOnlyFile,
> {
  protected readonly _file: F;

  constructor(
    filetype: Type extends "" ? never : Type,
    File: new(...args: ConstructorParameters<typeof IFile>)=> IFile & F,
    appClass: stringful,
    app: stringful,
    ...subpaths: string[]
  ) {
    try {
      this._file = new File(
        this._rootBookmark(filetype),
        appClass,
        app,
        ...subpaths,
      );
    }
    catch (e) {
      throw new EvalError(
        `Filetype: ctor`,
        { cause: e },
      );
    }
  }

  protected static get ReadOnlyFile(): typeof ReadOnlyFile {
    try {
      return importModule("files/ReadOnlyFile") as typeof ReadOnlyFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import ReadOnlyFile`,
        { cause: e },
      );
    }
  }

  protected static get WriteFile(): typeof WriteFile {
    try {
      return importModule("files/WriteFile") as typeof WriteFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import WriteFile`,
        { cause: e },
      );
    }
  }

  public get subpath(): F["subpath"] {
    try {
      return this._file.subpath;
    }
    catch (e) {
      throw new EvalError(
        `Filetype: subpath`,
        { cause: e },
      );
    }
  }

  public read(...error: Parameters<F["read"]>): string {
    try {
      return this._file.read(...error);
    }
    catch (e) {
      throw new EvalError(
        `Filetype: read`,
        { cause: e },
      );
    }
  }

  public readful(): stringful {
    try {
      return this._file.readful(this.subpath);
    }
    catch (e) {
      throw new EvalError(
        `Filetype: readful`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this._file.toString();
    }
    catch (e) {
      throw new EvalError(
        `Filetype: toString`,
        { cause: e },
      );
    }
  }

  private _rootBookmark(_type: Type): Bookmark {
    try {
      if (_type === "")
        throw new SyntaxError(
          `Expected app child type name; instead, type is empty`,
        );
      else
        return new Filetype.WriteFile.Bookmark("#" + _type);
    }
    catch (e) {
      throw new EvalError(
        `Filetype: _rootBookmark`,
        { cause: e },
      );
    }
  }

  public abstract write(
    ...args: Parameters<F["write"]>
  ): ReturnType<F["write"]> extends never ? never : Filetype<Type, F>;
}

module.exports = Filetype;
