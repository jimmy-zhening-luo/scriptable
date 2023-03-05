const app_Utilities: typeof Utilities = importModule("utilities/Utilities");

abstract class Application extends app_Utilities {
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

  static get Common(): typeof Common {
    try {
      return importModule("./src/common/Common");
    } catch (e) {
      throw new ReferenceError(
        `Application: Common: Error importing Common module: ${e}`,
      );
    }
  }

  static get Utilities(): typeof Utilities {
    try {
      return importModule("utilities/Utilities");
    } catch (e) {
      throw new ReferenceError(
        `Application: Utilities: Error importing Utilities module: ${e}`,
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
}

module.exports = Application;
