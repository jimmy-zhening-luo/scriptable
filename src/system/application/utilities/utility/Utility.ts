abstract class Utility {

  private static readonly _APPLICATION_CONFIG_BOOKMARK: string = "@_APPLICATION_CONFIG";

  protected readonly _file: File;

  constructor(
    filetype: typeof File,
    ...fileOrFilepath: ConstructorParameters<typeof File>
  ) {
    this._file = new filetype(...fileOrFilepath);
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
      console.error(`Utility: data: Error getting data: ${e}`);
      throw e;
    }
  }

  read(): ReturnType<typeof Utility.prototype._file.read> {
    try {
      return this._file.read();
    } catch (e) {
      console.error(`Utility: read: Error reading file: ${e}`);
      throw e;
    }
  }

  toString(): typeof Utility.prototype.data {
    return this.data;
  }

  protected static get applicationConfig(): ApplicationConfigProto {
    try {
      return JSON.parse(Utility._applicationConfigFile.data);
    } catch (e) {
      console.error(`Utility: applicationConfig: Caught unhandled exception while parsing application config into JSON object: ${e}`);
      throw e;
    }
  }

  private static get _applicationConfigFile(): ReadOnlyFile {
    try {
      return new Utility.ReadOnlyFile(
        new Utility.Bookmark(Utility._APPLICATION_CONFIG_BOOKMARK)
      );
    } catch (e) {
      console.error(`Utility: _applicationConfig: Error getting application config: ${e}`);
      throw e;
    }
  }

  static get Files(): typeof Files {
    try {
      return importModule("./system/application/files/Files");
    } catch (e) {
      console.error(`Utility: Files: Error importing Files module: ${e}`);
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
