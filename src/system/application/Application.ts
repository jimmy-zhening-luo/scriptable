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
        `Application: run: Caught unhandled exception during application runtime: \n${e}`,
      );
    }
  }

  protected get configSubpath(): string {
    try {
      return "";
    } catch (e) {
      throw new Error(
        `Application: configSubpath: Error getting application config subpath: \n${e}`,
      );
    }
  }

  protected get storageSubpath(): typeof Application.prototype.configSubpath {
    try {
      return this.configSubpath;
    } catch (e) {
      throw new Error(
        `Application: storageSubpath: Error getting application storage subpath: \n${e}`,
      );
    }
  }

  get config(): Config {
    try {
      return new Application.Config(this.configSubpath, this.constructor.name);
    } catch (e) {
      throw new Error(
        `Application: config: Error getting application Config object: \n${e}`,
      );
    }
  }

  protected storage(subpath?: string): Storage {
    try {
      return new Application.Storage(
        this.storageSubpath,
        this.constructor.name,
        subpath,
      );
    } catch (e) {
      throw new ReferenceError(
        `Application: storage: Error getting application Storage object: \n${e}`,
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
        }': \n${e}`,
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
        }': \n${e}`,
      );
    }
  }

  static get Utilities(): typeof Utilities {
    try {
      return app_Utilities;
    } catch (e) {
      throw new ReferenceError(
        `Application: Utilities: Error importing Utilities module: \n${e}`,
      );
    }
  }
}

module.exports = Application;
