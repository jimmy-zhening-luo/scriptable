abstract class Filetype {
  protected readonly _file: IOFile;

  constructor(
    utilityClassName: string,
    utilityFileSubpath: string,
    FileTypeConstructor: typeof IOFile = Filetype.ReadOnlyIOFile,
  ) {
    try {
      this._file = new FileTypeConstructor(
        this._utilityClassNameToBookmark(utilityClassName),
        utilityFileSubpath,
      );
    }
    catch (e) {
      throw new EvalError(
        `Utility: constructor: Caught unhandled exception while creating Utility file: \n${e as string}`,
      );
    }
  }

  public static get Files(): typeof Files {
    try {
      return importModule("files/Files") as typeof Files;
    }
    catch (e) {
      throw new ReferenceError(
        `Utility: import Files: \n${e as string}`,
      );
    }
  }

  public static get ReadOnlyIOFile(): typeof ReadOnlyIOFile {
    try {
      return Filetype.Files.ReadOnlyIOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Utility: import Files.ReadOnlyIOFile: \n${e as string}`,
      );
    }
  }

  public static get IOFile(): typeof IOFile {
    try {
      return Filetype.Files.IOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Utility: import Files.IOFile: \n${e as string}`,
      );
    }
  }

  public static get Bookmark(): typeof Bookmark {
    try {
      return Filetype.Files.Bookmark;
    }
    catch (e) {
      throw new ReferenceError(
        `Utility: import Files.Bookmark: \n${e as string}`,
      );
    }
  }

  public get isFile(): boolean {
    try {
      return this._file.isFile;
    }
    catch (e) {
      throw new EvalError(
        `Utility: isFile: Error checking if file exists and is a file, not a directory: \n${e as string}`,
      );
    }
  }

  public get path(): typeof Filetype.prototype._file.path {
    try {
      return this._file.path;
    }
    catch (e) {
      throw new EvalError(`Utility: path: Error getting path: \n${e as string}`);
    }
  }

  public get subpath(): typeof Filetype.prototype._file.subpath {
    try {
      return this._file.subpath;
    }
    catch (e) {
      throw new EvalError(`Utility: subpath: Error getting subpath: \n${e as string}`);
    }
  }

  public get filename(): typeof Filetype.prototype._file.leaf {
    try {
      return this._file.isFile
        ? this._file.leaf
        : "";
    }
    catch (e) {
      throw new EvalError(`Utility: filename: Error getting filename: \n${e as string}`);
    }
  }

  public read(): ReturnType<typeof Filetype.prototype._file.read> {
    try {
      return this._file.isFile
        ? this._file.read()
        : "";
    }
    catch (e) {
      throw new ReferenceError(`Utility: read: Error reading file: \n${e as string}`);
    }
  }

  public toString(): ReturnType<typeof Filetype.prototype.read> {
    try {
      return this.read();
    }
    catch (e) {
      throw new EvalError(`Utility: toString: Error getting data: \n${e as string}`);
    }
  }

  private _utilityClassNameToBookmark(utilityClassName: string): Bookmark {
    try {
      if (utilityClassName === "")
        throw new SyntaxError(
          `Utility name cannot be empty.`,
        );
      else
        return new Filetype.IOFile.Bookmark(
          "#" + utilityClassName,
        );
    }
    catch (e) {
      throw new EvalError(
        `Error while getting Utility root bookmark for the Utility class named '${utilityClassName}': \n${e as string}`,
      );
    }
  }
}

module.exports = Filetype;
