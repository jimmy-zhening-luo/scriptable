class Secret {

  private readonly _APPLICATION_CONFIG_BOOKMARK: string = "@_APPLICATION_CONFIG";

  private readonly file: ReadOnlyFile;

  constructor(
    subpath: string
  ) {
    this.file = new Secret.ReadOnlyFile(
      new Secret.ReadOnlyFile.Bookmark(
        this.secretBookmarkName
      ),
      subpath
    );
  }

  private get secretBookmarkName(): string {
    return this.applicationConfig.Secret;
  }

  private get applicationConfigBookmark(): string {
    try {
      if (!FileManager.iCloud().bookmarkExists(this._APPLICATION_CONFIG_BOOKMARK))
        throw new ReferenceError(`Secret.js: Application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}' does not exist in Scriptable. Check your application bookmark name and make sure that bookmark is created in Scriptable.`);
      else if (!FileManager.iCloud().fileExists(FileManager.iCloud().bookmarkedPath(this._APPLICATION_CONFIG_BOOKMARK)))
        throw new ReferenceError(`Secret.js: Application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}' is an existing bookmark in Scriptable. However, the bookmark maps to a filepath that does not exist. Check your bookmark configuration in Scriptable to make sure that the bookmark maps to a valid filepath. It must map to the .json config file itself, not to a directory.`);
      return this._APPLICATION_CONFIG_BOOKMARK;
    } catch (e) {
      console.error(`Secret.js: Error getting preconfigured application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}': ${e}`);
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
      console.error(`Secret.js: Error getting application config: ${e}`);
      throw e;
    }
  }

  get exists(): boolean {
    return this.file.exists;
  }

  get path(): typeof Secret.prototype.file.path {
    return this.file.path;
  }

  get subpath(): typeof Secret.prototype.file.subpath {
    return this.file.subpath;
  }

  get filename(): typeof Secret.prototype.file.leaf {
    return this.file.leaf;
  }

  get secret(): typeof Secret.prototype.file.data {
    try {
      if (!this.exists)
        throw new ReferenceError(`Secret.js: Secret file '${this.path}' does not exist.`);
      return this.file.data;
    } catch (e) {
      console.error(`Secret.js: Error getting secret: ${e}`);
      throw e;
    }
  }

  get key(): typeof Secret.prototype.secret {
    return this.secret;
  }

  get data(): typeof Secret.prototype.secret {
    return this.secret;
  }

  read(): typeof Secret.prototype.secret {
    return this.secret;
  }

  toString(): typeof Secret.prototype.secret {
    return this.secret;
  }

  get ReadOnlyFile(): typeof ReadOnlyFile {
    return Secret.ReadOnlyFile;
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return importModule("files/ReadOnlyFile");
  }

}

module.exports = Secret;
