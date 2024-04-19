abstract class Filetype<
  T extends string,
  F extends typeof IOFile = typeof ReadOnlyIOFile,
> {
  protected readonly _file: IOFile;

  constructor(
    _type: T,
    FileConstructor: F,
    ...subpaths: string[]
  ) {
    try {
      this._file = new FileConstructor(
        this._rootBookmark(
          _type,
        ),
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

  public read(): string {
    try {
      return this._file.isFile
        ? this._file.read()
        : "";
    }
    catch (e) {
      throw new EvalError(
        `Filetype: read`,
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

  private _rootBookmark(
    _type: T,
  ): Bookmark {
    try {
      if (_type === "")
        throw new SyntaxError(
          `Empty _type`,
        );
      else
        return new Filetype.IOFile.Bookmark(
          "#" + _type,
        );
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
