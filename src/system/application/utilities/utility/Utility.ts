abstract class Utility {
  protected readonly _file: File;

  constructor(
    utilityClassName: string,
    FileTypeConstructor: typeof File,
    utilityFileSubpath: string,
  ) {
    try {
      this._file = new FileTypeConstructor(
        this._utilityClassNameToBookmark(utilityClassName),
        utilityFileSubpath,
      );
    } catch (e) {
      throw new Error(
        `Utility: constructor: Caught unhandled exception while creating Utility file: \n${e}`,
      );
    }
  }

  private _utilityClassNameToBookmark(utilityClassName: string): Bookmark {
    try {
      if (utilityClassName === "")
        throw new SyntaxError(
          `Utility name passed to Utility abstract base class constructor was empty. Utility name must be a non-empty string.`
        );
      else {
        const utilityRootBookmarkName: string = ["#", utilityClassName].join("");
        const utilityRootBookmark: Bookmark = new Utility.File.Bookmark(utilityRootBookmarkName);
        if (!utilityRootBookmark.exists)
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

  get exists(): boolean {
    try {
      return this._file.exists;
    } catch (e) {
      throw new EvalError(`Utility: exists: Error checking if file exists: \n${e}`);
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
      return this._file.leaf;
    } catch (e) {
      throw new EvalError(`Utility: filename: Error getting filename: \n${e}`);
    }
  }

  get data(): typeof Utility.prototype._file.data {
    try {
      return this._file.data;
    } catch (e) {
      throw new ReferenceError(`Utility: data: Error getting data: \n${e}`);
    }
  }

  read(): ReturnType<typeof Utility.prototype._file.read> {
    try {
      return this._file.isReadable ? this._file.read() : "";
    } catch (e) {
      throw new ReferenceError(`Utility: read: Error reading file: \n${e}`);
    }
  }

  toString(): typeof Utility.prototype.data {
    try {
      return this.data;
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
