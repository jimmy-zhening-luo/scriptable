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
      throw new EvalError(
        `Application: run: Caught unhandled exception during application runtime: \n${e}`,
      );
    }
  }

  protected get configSubpathRoot(): string {
    try {
      return "";
    } catch (e) {
      throw new ReferenceError(
        `Application: configSubpath: Error getting application config subpath: \n${e}`,
      );
    }
  }

  protected get storageSubpathRoot(): typeof Application.prototype.configSubpathRoot {
    try {
      return this.configSubpathRoot;
    } catch (e) {
      throw new ReferenceError(
        `Application: storageSubpath: Error getting application storage subpath: \n${e}`,
      );
    }
  }

  get config(): Config {
    try {
      return new Application.Filetypes.Config(
        this.configSubpathRoot,
        this.constructor.name,
      );
    } catch (e) {
      throw new ReferenceError(
        `Application: config: Error getting application Config object: \n${e}`,
      );
    }
  }

  protected storage(subpath?: string): Storage {
    try {
      return new Application.Filetypes.Storage(
        this.storageSubpathRoot,
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
      throw new ReferenceError(
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
      throw new ReferenceError(
        `Application: writeStorage: Error writing to application storage file at '${
          this.storage(subpath).path
        }': \n${e}`,
      );
    }
  }

  static get Filetypes(): typeof Filetypes {
    try {
      return importModule("filetypes/Filetypes") as typeof Filetypes;
    } catch (e) {
      throw new ReferenceError(
        `Application: Filetypes: Error importing Filetypes module: \n${e}`,
      );
    }
  }
}

module.exports = Application;
