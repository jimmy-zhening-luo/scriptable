abstract class Filetype<
  Class extends string,
  Subtype extends string,
  F extends IFile = ReadOnlyFile,
> {
  protected readonly _file: F;

  constructor(
    File: new(...args: ConstructorParameters<typeof IFile>)=> IFile & F,
    filetype: literalful<Subtype>,
    appClass: literalful<Class>,
    ...subpaths: string[]
  ) {
    try {
      this._file = new File(
        this._rootBookmark(filetype),
        appClass,
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
      return importModule(
        "files/ReadOnlyFile",
      ) as typeof ReadOnlyFile;
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
      return importModule(
        "files/WriteFile",
      ) as typeof WriteFile;
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

  public read(...error: Parameters<F["read"]>): ReturnType<F["read"]> {
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

  public readful(): ReturnType<F["readful"]> {
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

  public toString(): ReturnType<F["toString"]> {
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

  private _rootBookmark(subtype: literalful<Subtype>): Bookmark {
    try {
      if (subtype.length === 0)
        throw new SyntaxError(
          `Filetype subclass name is empty`,
          { cause: { subtype } },
        );
      else
        return new Filetype.WriteFile.Bookmark(`#${subtype}`);
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
  ): ReturnType<F["write"]> extends never ? never : Filetype<Class, Subtype, F>;
}

module.exports = Filetype;
