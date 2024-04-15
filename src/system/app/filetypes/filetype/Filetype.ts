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
        `Filetype: ctor: \n${e as string}`,
      );
    }
  }

  protected static get Files(): typeof Files {
    try {
      return importModule("files/Files") as typeof Files;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import Files: \n${e as string}`,
      );
    }
  }

  protected static get ReadOnlyIOFile(): typeof ReadOnlyIOFile {
    try {
      return Filetype.Files.ReadOnlyIOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import Files.ReadOnlyIOFile: \n${e as string}`,
      );
    }
  }

  protected static get IOFile(): typeof IOFile {
    try {
      return Filetype.Files.IOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import Files.IOFile: \n${e as string}`,
      );
    }
  }

  public get subpath(): string {
    try {
      return this._file.subpath;
    }
    catch (e) {
      throw new EvalError(
        `Filetype: subpath: \n${e as string}`,
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
        `Filetype: read: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this._file.toString();
    }
    catch (e) {
      throw new EvalError(
        `Filetype: toString: \n${e as string}`,
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
        `Filetype: _rootBookmark: \n${e as string}`,
      );
    }
  }
}

module.exports = Filetype;
