abstract class Application {
  abstract get input(): unknown;
  abstract runtime(): unknown;
  abstract handleOutput(
    output: ReturnType<typeof Application.prototype.runtime>,
  ): unknown;

  run(): ReturnType<typeof Application.prototype.handleOutput> {
    try {
      return this.handleOutput(this.runtime());
    } catch (e) {
      throw new Error(
        `Application: run: Caught unhandled exception during application runtime: ${e}`,
      );
    }
  }

  protected get configSubpath(): string {
    try {
      return "";
    } catch (e) {
      throw new Error(
        `Application: configSubpath: Error getting application config subpath: ${e}`,
      );
    }
  }

  protected get storageSubpath(): typeof Application.prototype.configSubpath {
    try {
      return this.configSubpath;
    } catch (e) {
      throw new Error(
        `Application: storageSubpath: Error getting application storage subpath: ${e}`,
      );
    }
  }

  get config(): Config {
    try {
      return new this.Config(this.configSubpath, this.constructor.name);
    } catch (e) {
      throw new Error(
        `Application: config: Error getting application Config object: ${e}`,
      );
    }
  }

  protected storage(subpath?: string): Storage {
    try {
      return new this.Storage(
        this.storageSubpath,
        this.constructor.name,
        subpath,
      );
    } catch (e) {
      throw new Error(
        `Application: storage: Error getting application Storage object: ${e}`,
      );
    }
  }

  readStorage(subpath?: string): ReturnType<typeof Storage.prototype.read> {
    try {
      return this.storage(subpath).read();
    } catch (e) {
      throw new Error(
        `Application: readStorage: Error reading application storage file at '${
          this.storage(subpath).path
        }': ${e}`,
      );
    }
  }

  writeStorage(data: string, subpath?: string): this {
    try {
      this.storage(subpath).write(data);
      return this;
    } catch (e) {
      throw new Error(
        `Application: writeStorage: Error writing to application storage file at '${
          this.storage(subpath).path
        }': ${e}`,
      );
    }
  }

  get Config(): typeof Config {
    try {
      return Application.Config;
    } catch (e) {
      throw new ReferenceError(
        `Application: Config: Error importing Config module: ${e}`,
      );
    }
  }

  get Storage(): typeof Storage {
    try {
      return Application.Storage;
    } catch (e) {
      throw new ReferenceError(
        `Application: Storage: Error importing Storage module: ${e}`,
      );
    }
  }

  static get Common(): typeof Common {
    try {
      return importModule("common/Common");
    } catch (e) {
      throw new ReferenceError(
        `Application: Common: Error importing Common module: ${e}`,
      );
    }
  }

  static get Files(): typeof Files {
    try {
      return importModule("files/Files");
    } catch (e) {
      throw new ReferenceError(
        `Application: Files: Error importing Files module: ${e}`,
      );
    }
  }

  static get Browser(): typeof Browser {
    try {
      return importModule("browser/Browser");
    } catch (e) {
      throw new ReferenceError(
        `Application: Browser: Error importing Browser module: ${e}`,
      );
    }
  }

  static get Config(): typeof Config {
    try {
      return importModule("Config");
    } catch (e) {
      throw new ReferenceError(
        `Application: Config: Error importing Config module: ${e}`,
      );
    }
  }

  static get Storage(): typeof Storage {
    try {
      return importModule("Storage");
    } catch (e) {
      throw new ReferenceError(
        `Application: Storage: Error importing Storage module: ${e}`,
      );
    }
  }

  static get Secret(): typeof Secret {
    try {
      return importModule("Secret");
    } catch (e) {
      throw new ReferenceError(
        `Application: Secret: Error importing Secret module: ${e}`,
      );
    }
  }

  static get Types(): typeof Types {
    try {
      return Application.Common.Types;
    } catch (e) {
      throw new ReferenceError(
        `Application: Types: Error importing Types module: ${e}`,
      );
    }
  }

  static get Strings(): typeof Strings {
    try {
      return Application.Types.Strings;
    } catch (e) {
      throw new ReferenceError(
        `Application: Strings: Error importing Strings module: ${e}`,
      );
    }
  }

  static get Numbers(): typeof Numbers {
    try {
      return Application.Types.Numbers;
    } catch (e) {
      throw new ReferenceError(
        `Application: Numbers: Error importing Numbers module: ${e}`,
      );
    }
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    try {
      return Application.Files.ReadOnlyFile;
    } catch (e) {
      throw new ReferenceError(
        `Application: ReadOnlyFile: Error importing ReadOnlyFile module: ${e}`,
      );
    }
  }

  static get File(): typeof File {
    try {
      return Application.Files.File;
    } catch (e) {
      throw new ReferenceError(
        `Application: File: Error importing File module: ${e}`,
      );
    }
  }

  static get Bookmark(): typeof Bookmark {
    try {
      return Application.File.Bookmark;
    } catch (e) {
      throw new ReferenceError(
        `Application: Bookmark: Error importing Bookmark module: ${e}`,
      );
    }
  }

  static get Filepath(): typeof FilepathString {
    try {
      return Application.File.FilepathString;
    } catch (e) {
      throw new ReferenceError(
        `Application: Filepath: Error importing Filepath module: ${e}`,
      );
    }
  }

  static get Url(): typeof Url {
    try {
      return Application.Browser.Url;
    } catch (e) {
      throw new ReferenceError(
        `Application: Url: Error importing Url module: ${e}`,
      );
    }
  }

  static get Api(): typeof Api {
    try {
      return Application.Browser.Api;
    } catch (e) {
      throw new ReferenceError(
        `Application: Api: Error importing Api module: ${e}`,
      );
    }
  }

  static get Callback(): typeof Callback {
    try {
      return Application.Browser.Callback;
    } catch (e) {
      throw new ReferenceError(
        `Application: Callback: Error importing Callback module: ${e}`,
      );
    }
  }

  static get Endpoint(): typeof Endpoint {
    try {
      return Application.Browser.Endpoint;
    } catch (e) {
      throw new ReferenceError(
        `Application: Endpoint: Error importing Endpoint module: ${e}`,
      );
    }
  }
}

module.exports = Application;
