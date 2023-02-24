abstract class Utility {

  private static readonly _APPLICATION_CONFIG_BOOKMARK: string = "@_APPLICATION_CONFIG";

  protected readonly _file: File;

  constructor(
    utilityName: string,
    FileTypeConstructor: typeof File,
    utilityFileSubpath: string
  ) {
    try {
      this._file = new FileTypeConstructor(
        Utility._utilityRootBookmark(utilityName),
        utilityFileSubpath
      );
    } catch (e) {
      console.error(
        `Utility: constructor: Caught unhandled exception while creating Utility file: ${e}`
      );
      throw e;
    }
  }

  private static _utilityRootBookmark(
    utilityName: string
  ): Bookmark {
    try {
      const utilityRootBookmarkName: string =
        new Map<string, string>(
          Object.entries(
            Utility._applicationConfig
          )
        ).get(utilityName) ?? "";
      if (utilityRootBookmarkName === "")
        throw new ReferenceError(
          `Utility class named '${utilityName}' is not configured in the application config. Each utility class should have a corresponding entry in the application config with [key: utility class name]: value: file root bookmark name.`
        );
      else {
        return new Utility.Bookmark(utilityRootBookmarkName);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError))
        e = new Error(
          `Utility: _utilityRootBookmark: Caught unhandled exception while getting utility root bookmark name for the Utility class named '${utilityName}'. See unhandled exception: ${e}`
        );
      console.error(
        `Utility: _utilityRootBookmark: Error while getting Utility root bookmark for the Utility class named '${utilityName}': ${e}`
      );
      throw e;
    }
  }

  private static get _applicationConfig(): ApplicationConfigProto {
    try {
      return JSON.parse(
        new Utility.ReadOnlyFile(
          new Utility.Bookmark(
            Utility._APPLICATION_CONFIG_BOOKMARK
          )
        )
          .data
      );
    } catch (e) {
      console.error(
        `Utility: applicationConfig: Caught unhandled exception while parsing application config into JSON object: ${e}`
      );
      throw e;
    }
  }

  get exists(): boolean {
    return this._file.exists;
  }

  get path(): typeof Utility.prototype._file.path {
    return this._file.path;
  }

  get subpath(): typeof Utility.prototype._file.subpath {
    return this._file.subpath;
  }

  get filename(): typeof Utility.prototype._file.leaf {
    return this._file.leaf;
  }

  get data(): typeof Utility.prototype._file.data {
    try {
      return this._file.data;
    } catch (e) {
      console.error(
        `Utility: data: Error getting data: ${e}`
      );
      throw e;
    }
  }

  read(): ReturnType<typeof Utility.prototype._file.read> {
    try {
      return this._file.read();
    } catch (e) {
      console.error(
        `Utility: read: Error reading file: ${e}`
      );
      throw e;
    }
  }

  toString(): typeof Utility.prototype.data {
    return this.data;
  }

  static get Files(): typeof Files {
    try {
      return importModule(
        "./system/application/files/Files"
      );
    } catch (e) {
      console.error(
        `Utility: Files: Error importing Files module: ${e}`
      );
      throw e;
    }
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return Utility.Files.ReadOnlyFile;
  }

  static get File(): typeof File {
    return Utility.Files.File;
  }

  static get Bookmark(): typeof Bookmark {
    return Utility.Files.Bookmark;
  }

}

module.exports = Utility;
