abstract class Application {
  abstract get input(): any;
  abstract runtime(input: any): any;
  abstract handleOutput(output: any): any;

  run(): any {
    return this.handleOutput(
      this.runtime(
        this.input
      )
    );
  }

  protected get configSubpath(): string {
    return String("");
  }

  protected get storageSubpath(): string {
    return this.configSubpath;
  }

  get config(): Config {
    return new this.Config(
      this.configSubpath,
      this.constructor.name
    );
  }

  protected storage(
    subpath?: string
  ): Storage {
    return new this.Storage(
      this.storageSubpath,
      this.constructor.name,
      subpath
    );
  }

  readStorage(
    subpath?: string
  ): string {
    return this
      .storage(subpath)
      .read();
  }

  writeStorage(
    text: string,
    subpath?: string
  ): void {
    this
      .storage(subpath)
      .write(text);
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
