const _APPLICATION_CONFIG_BOOKMARK: string = "@_APPLICATION_CONFIG";

abstract class Utility {
  private static readonly _APPLICATION_CONFIG_BOOKMARK: string =
    _APPLICATION_CONFIG_BOOKMARK;

  protected readonly _file: File;

  constructor(
    utilityName: string,
    FileTypeConstructor: typeof File,
    utilityFileSubpath: string,
  ) {
    try {
      this._file = new FileTypeConstructor(
        Utility._utilityRootBookmark(utilityName),
        utilityFileSubpath,
      );
    } catch (e) {
      throw new Error(
        `Utility: constructor: Caught unhandled exception while creating Utility file: ${e}`,
      );
    }
  }

  private static _utilityRootBookmark(utilityName: string): Bookmark {
    try {
      const utilityRootBookmarkName: string =
        new Map<string, string>(Object.entries(Utility._applicationConfig)).get(
          utilityName,
        ) ?? "";
      if (utilityRootBookmarkName === "")
        throw new ReferenceError(
          `Utility class named '${utilityName}' is not configured in the application config. Each utility class should have a corresponding entry in the application config with [key: utility class name]: value: file root bookmark name.`,
        );
      else {
        return new Utility.Bookmark(utilityRootBookmarkName);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError))
        e = new Error(
          `Caught unhandled exception while getting utility root bookmark name for the Utility class named '${utilityName}'. See unhandled exception: ${e}`,
        );
      throw new Error(
        `Error while getting Utility root bookmark for the Utility class named '${utilityName}': ${e}`,
      );
    }
  }

  private static get _applicationConfig(): ApplicationConfigProto {
    try {
      return JSON.parse(
        new Utility.ReadOnlyFile(
          new Utility.Bookmark(Utility._APPLICATION_CONFIG_BOOKMARK),
        ).data,
      );
    } catch (e) {
      throw new Error(
        `Utility: applicationConfig: Caught unhandled exception while parsing application config into JSON object: ${e}`,
      );
    }
  }

  get exists(): boolean {
    try {
      return this._file.exists;
    } catch (e) {
      throw new Error(`Utility: exists: Error checking if file exists: ${e}`);
    }
  }

  get path(): typeof Utility.prototype._file.path {
    try {
      return this._file.path;
    } catch (e) {
      throw new Error(`Utility: path: Error getting path: ${e}`);
    }
  }

  get subpath(): typeof Utility.prototype._file.subpath {
    try {
      return this._file.subpath;
    } catch (e) {
      throw new Error(`Utility: subpath: Error getting subpath: ${e}`);
    }
  }

  get filename(): typeof Utility.prototype._file.leaf {
    try {
      return this._file.leaf;
    } catch (e) {
      throw new Error(`Utility: filename: Error getting filename: ${e}`);
    }
  }

  get data(): typeof Utility.prototype._file.data {
    try {
      return this._file.data;
    } catch (e) {
      throw new Error(`Utility: data: Error getting data: ${e}`);
    }
  }

  read(): ReturnType<typeof Utility.prototype._file.read> {
    try {
      return this._file.read();
    } catch (e) {
      throw new Error(`Utility: read: Error reading file: ${e}`);
    }
  }

  toString(): typeof Utility.prototype.data {
    try {
      return this.data;
    } catch (e) {
      throw new Error(`Utility: toString: Error getting data: ${e}`);
    }
  }

  static get Files(): typeof Files {
    try {
      return importModule("./system/application/files/Files");
    } catch (e) {
      throw new ReferenceError(
        `Utility: Files: Error importing Files module: ${e}`,
      );
    }
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    try {
      return Utility.Files.ReadOnlyFile;
    } catch (e) {
      throw new ReferenceError(
        `Utility: ReadOnlyFile: Error importing ReadOnlyFile class: ${e}`,
      );
    }
  }

  static get File(): typeof File {
    try {
      return Utility.Files.File;
    } catch (e) {
      throw new ReferenceError(
        `Utility: File: Error importing File class: ${e}`,
      );
    }
  }

  static get Bookmark(): typeof Bookmark {
    try {
      return Utility.Files.Bookmark;
    } catch (e) {
      throw new ReferenceError(
        `Utility: Bookmark: Error importing Bookmark class: ${e}`,
      );
    }
  }
}

module.exports = Utility;
