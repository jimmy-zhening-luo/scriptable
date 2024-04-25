abstract class Filetype<
  Class extends string,
  F extends typeof IOFile = typeof ReadOnlyIOFile,
> {
  protected readonly _file: IOFile;

  constructor(
    _class: Class extends "" ? never : Class,
    FileConstructor: F,
    ...subpaths: string[]
  ) {
    try {
      this._file = new FileConstructor(
        this._rootBookmark(_class),
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

  protected static get ReadOnlyIOFile(): typeof ReadOnlyIOFile {
    try {
      return importModule("file/ReadOnlyIOFile") as typeof ReadOnlyIOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import ReadOnlyIOFile`,
        { cause: e },
      );
    }
  }

  protected static get IOFile(): typeof IOFile {
    try {
      return importModule("file/IOFile") as typeof IOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import IOFile`,
        { cause: e },
      );
    }
  }

  public get subpath(): string {
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

  public read(error?: boolean): string {
    try {
      return this._file.read(error);
    }
    catch (e) {
      throw new EvalError(
        `Filetype: read`,
        { cause: e },
      );
    }
  }

  public readful(label?: string): stringful {
    try {
      return this._file.readful(label);
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

  private _rootBookmark(_type: Class): Bookmark {
    try {
      if (_type === "")
        throw new SyntaxError(
          `Expected app child type name; instead, type is empty`,
        );
      else
        return new Filetype.IOFile.Bookmark("#" + _type);
    }
    catch (e) {
      throw new EvalError(
        `Filetype: _rootBookmark`,
        { cause: e },
      );
    }
  }
}

module.exports = Filetype;
