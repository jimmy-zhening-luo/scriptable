abstract class Utility {
  protected readonly _file: File;

  constructor(
    utilityClassName: string,
    utilityFileSubpath: string,
    FileTypeConstructor: typeof File = Utility.ReadOnlyFile,
  ) {
    try {
      this._file = new FileTypeConstructor(
        this._utilityClassNameToBookmark(utilityClassName),
        utilityFileSubpath,
      );
    } catch (e) {
      throw new EvalError(
        `Utility: constructor: Caught unhandled exception while creating Utility file: \n${e}`,
      );
    }
  }

  private _utilityClassNameToBookmark(utilityClassName: string): Bookmark {
    try {
      if (utilityClassName === "")
        throw new SyntaxError(
          `Utility name passed to Utility abstract base class constructor was empty. Utility name must be a non-empty string.`,
        );
      else {
        const utilityRootBookmarkName: string = ["#", utilityClassName].join(
          "",
        );
        const utilityRootBookmark: Bookmark = new Utility.File.Bookmark(
          utilityRootBookmarkName,
        );
        if (!utilityRootBookmark.resolves)
          throw new ReferenceError(
            `Utility root bookmark name '${utilityRootBookmarkName}' does not resolve to a Scriptable bookmark`,
          );
        else return utilityRootBookmark;
      }
    } catch (e) {
      throw new EvalError(
        `Error while getting Utility root bookmark for the Utility class named '${utilityClassName}': \n${e}`,
      );
    }
  }

  get isFile(): boolean {
    try {
      return this._file.isFile;
    } catch (e) {
      throw new EvalError(
        `Utility: isFile: Error checking if file exists and is a file, not a directory: \n${e}`,
      );
    }
  }

  get path(): typeof Utility.prototype._file.path {
    try {
      return this._file.path;
    } catch (e) {
      throw new EvalError(`Utility: path: Error getting path: \n${e}`);
    }
  }

  get subpath(): typeof Utility.prototype._file.subpath {
    try {
      return this._file.subpath;
    } catch (e) {
      throw new EvalError(`Utility: subpath: Error getting subpath: \n${e}`);
    }
  }

  get filename(): typeof Utility.prototype._file.leaf {
    try {
      return this._file.isFile ? this._file.leaf : "";
    } catch (e) {
      throw new EvalError(`Utility: filename: Error getting filename: \n${e}`);
    }
  }

  read(): ReturnType<typeof Utility.prototype._file.read> {
    try {
      return this._file.isFile ? this._file.read() : "";
    } catch (e) {
      throw new ReferenceError(`Utility: read: Error reading file: \n${e}`);
    }
  }

  toString(): ReturnType<typeof Utility.prototype.read> {
    try {
      return this.read();
    } catch (e) {
      throw new EvalError(`Utility: toString: Error getting data: \n${e}`);
    }
  }

  static get Files(): typeof Files {
    try {
      return importModule("./system/application/files/Files");
    } catch (e) {
      throw new ReferenceError(
        `Utility: Files: Error importing Files module: \n${e}`,
      );
    }
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    try {
      return Utility.Files.ReadOnlyFile;
    } catch (e) {
      throw new ReferenceError(
        `Utility: ReadOnlyFile: Error importing ReadOnlyFile class: \n${e}`,
      );
    }
  }

  static get File(): typeof File {
    try {
      return Utility.Files.File;
    } catch (e) {
      throw new ReferenceError(
        `Utility: File: Error importing File class: \n${e}`,
      );
    }
  }
}

module.exports = Utility;
