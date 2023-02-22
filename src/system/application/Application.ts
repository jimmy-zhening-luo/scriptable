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
      console.error(`Application: Error running application: ${e}`);
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
      console.error(`Application: Error getting application config: ${e}`);
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
      console.error(`Application: Error getting application storage File object: ${e}`);
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
      console.error(`Application: Error reading application storage file '${this.storage(subpath).path}': ${e}`);
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
      console.error(`Application: Error writing to application storage file '${this.storage(subpath).path}': ${e}`);
      throw e;
    }
  }

  get Config(): typeof Config {
    return Application.Config;
  }

  get Storage(): typeof Storage {
    return Application.Storage;
  }

  static get Config(): typeof Config {
    return importModule("Config");
  }

  static get Storage(): typeof Storage {
    return importModule("Storage");
  }

  static get Secret(): typeof Secret {
    return importModule("Secret");
  }

  static get Browser(): typeof Browser {
    return importModule("browser/Browser");
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

  static get Common(): typeof Common {
    return importModule("common/Common");
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

  static get Files(): typeof Files {
    return importModule("files/Files");
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

  static get Filepath(): typeof Filepath {
    return Application.File.Filepath;
  }

}

module.exports = Application;
