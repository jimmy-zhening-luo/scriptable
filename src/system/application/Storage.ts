class Storage {

  private readonly _APPLICATION_CONFIG_BOOKMARK: string = "@_APPLICATION_CONFIG";

  readonly file: File;

  constructor(
    storageSubpath: string,
    programName: string,
    subpath: string = "default.txt"
  ) {
    this.file = new Storage.File(
      this.storageDirFile,
      this.File.join(
        this.File.join(
          storageSubpath,
          programName
        ),
        subpath
      )
    );
  }

  protected get storageDirFile(): File {
    return new Storage.File(
      new Storage.File.Bookmark(
        this.storageBookmark
      )
    );
  }

  protected get storageBookmark(): string {
    return this.applicationConfig.Storage;
  }

  private get applicationConfigBookmark(): string {
    try {
      if (!FileManager.iCloud().bookmarkExists(this._APPLICATION_CONFIG_BOOKMARK))
        throw new ReferenceError(`Storage.js: Application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}' does not exist in Scriptable. Check your application bookmark name and make sure that bookmark is created in Scriptable.`);
      else if (!FileManager.iCloud().fileExists(FileManager.iCloud().bookmarkedPath(this._APPLICATION_CONFIG_BOOKMARK)))
        throw new ReferenceError(`Storage.js: Application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}' is an existing bookmark in Scriptable. However, the bookmark maps to a filepath that does not exist. Check your bookmark configuration in Scriptable to make sure that the bookmark maps to a valid filepath. It must map to the .json config file itself, not to a directory.`);
      return this._APPLICATION_CONFIG_BOOKMARK;
    } catch (e) {
      console.error(`Storage.js: Error getting preconfigured application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}': ${e}`);
      throw e;
    }
  }

  private get applicationConfig(): ApplicationConfigProto {
    try {
      return JSON.parse(
        FileManager.iCloud().readString(
          FileManager.iCloud().bookmarkedPath(
            this.applicationConfigBookmark
          )
        )
      );
    } catch (e) {
      console.error(`Storage.js: Error getting application config: ${e}`);
      throw e;
    }
  }

  get path(): typeof Storage.prototype.file.path {
    return this.file.path;
  }

  get data(): typeof Storage.prototype.file.data {
    try {
      if (!this.file.exists)
        throw new ReferenceError(`Storage.js: File '${this.file.path}' does not exist.`);
      return this.file.data;
    } catch (e) {
      console.error(`Storage.js: Error getting file data: ${e}`);
      throw e;
    }
  }

  read(): typeof Storage.prototype.file.data {
    return this.data;
  }

  write(
    text: string
  ): this {
    const overwrite: boolean = true;
    this.file.write(
      text,
      overwrite
    );
    return this;
  }

  toString(): typeof Storage.prototype.file.data {
    return this.data;
  }

  get File(): typeof File {
    return Storage.File;
  }

  static get File(): typeof File {
    return importModule("files/file/File");
  }

}

module.exports = Storage;
