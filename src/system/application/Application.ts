abstract class Application {
  abstract get input(): any;
  abstract runtime(input: any): any;
  abstract handleOutput(output: any): any;

  run(): any {
    try {
      return this.handleOutput(
        this.runtime(
          this.input
        )
      );
    } catch (e) {
      console.error(`Application: run: Caught unhandled exception during application runtime: ${e}`);
      throw e;
    }
  }

  protected get configSubpath(): string {
    return "";
  }

  protected get storageSubpath(): typeof Application.prototype.configSubpath {
    return this.configSubpath;
  }

  get config(): Config {
    try {
      return new this.Config(
        this.configSubpath,
        this.constructor.name
      );
    } catch (e) {
      console.error(`Application: config: Error getting application Config object: ${e}`);
      throw e;
    }
  }

  protected storage(
    subpath?: string
  ): Storage {
    try {
      return new this.Storage(
        this.storageSubpath,
        this.constructor.name,
        subpath
      );
    } catch (e) {
      console.error(`Application: storage: Error getting application Storage object: ${e}`);
      throw e;
    }
  }

  readStorage(
    subpath?: string
  ): ReturnType<typeof Storage.prototype.read> {
    try {
      return this
        .storage(subpath)
        .read();
    } catch (e) {
      console.error(`Application: readStorage: Error reading application storage file at '${this.storage(subpath).path}': ${e}`);
      throw e;
    }
  }

  writeStorage(
    data: string,
    subpath?: string
  ): this {
    try {
      this
        .storage(subpath)
        .write(data);
      return this;
    } catch (e) {
      console.error(`Application: writeStorage: Error writing to application storage file at '${this.storage(subpath).path}': ${e}`);
      throw e;
    }
  }

  get Config(): typeof Config {
    return Application.Config;
  }

  get Storage(): typeof Storage {
    return Application.Storage;
  }

  static get Common(): typeof Common {
    try {
      return importModule("common/Common");
    } catch (e) {
      console.error(`Application: Common: Error importing Common module: ${e}`);
      throw e;
    }
  }

  static get Files(): typeof Files {
    try {
      return importModule("files/Files");
    } catch (e) {
      console.error(`Application: Files: Error importing Files module: ${e}`);
      throw e;
    }
  }

  static get Browser(): typeof Browser {
    try {
      return importModule("browser/Browser");
    } catch (e) {
      console.error(`Application: Browser: Error importing Browser module: ${e}`);
      throw e;
    }
  }

  static get Config(): typeof Config {
    try {
      return importModule("Config");
    } catch (e) {
      console.error(`Application: Config: Error importing Config module: ${e}`);
      throw e;
    }
  }

  static get Storage(): typeof Storage {
    try {
      return importModule("Storage");
    } catch (e) {
      console.error(`Application: Storage: Error importing Storage module: ${e}`);
      throw e;
    }
  }

  static get Secret(): typeof Secret {
    try {
      return importModule("Secret");
    } catch (e) {
      console.error(`Application: Secret: Error importing Secret module: ${e}`);
      throw e;
    }
  }

  static get Types(): typeof Types {
    return Application.Common.Types;
  }

  static get Strings(): typeof Strings {
    return Application.Types.Strings;
  }

  static get Numbers(): typeof Numbers {
    return Application.Types.Numbers;
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return Application.Files.ReadOnlyFile;
  }

  static get File(): typeof File {
    return Application.Files.File;
  }

  static get Bookmark(): typeof Bookmark {
    return Application.File.Bookmark;
  }

  static get Filepath(): typeof FilepathString {
    return Application.File.FilepathString;
  }

  static get Url(): typeof Url {
    return Application.Browser.Url;
  }

  static get Api(): typeof Api {
    return Application.Browser.Api;
  }

  static get Callback(): typeof Callback {
    return Application.Browser.Callback;
  }

  static get Endpoint(): typeof Endpoint {
    return Application.Browser.Endpoint;
  }


}

module.exports = Application;
