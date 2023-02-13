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
    const _Config: typeof Config = importModule("Config");
    return new _Config(
      this.configSubpath,
      this.constructor.name
    );
  }

  protected storage(
    subpath?: string | undefined
  ): Storage {
    const _Storage: typeof Storage = importModule("Storage");
    return new _Storage(
      this.storageSubpath,
      this.constructor.name,
      subpath
    );
  }

  readStorage(
    subpath?: string | undefined
  ): string {
    return this
      .storage(subpath)
      .read();
  }

  writeStorage(
    text: string,
    subpath?: string | undefined
  ): void {
    this
      .storage(subpath)
      .write(text);
  }
  
}

module.exports = Application;
