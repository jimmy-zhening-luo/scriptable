abstract class Application {
  public static get Filetypes(): typeof Filetypes {
    try {
      return importModule("filetypes/Filetypes") as typeof Filetypes;
    }
    catch (e) {
      throw new ReferenceError(
        `Application: Filetypes: Error importing Filetypes module: \n${e as string}`,
      );
    }
  }

  public static get Calendar(): typeof IOCalendar {
    try {
      return importModule("system/calendar/IOCalendar") as typeof IOCalendar;
    }
    catch (e) {
      throw new ReferenceError(
        `Application: Calendar: Error importing IOCalendar module: \n${e as string}`,
      );
    }
  }

  public get setting(): Setting {
    try {
      if (this._cachedSetting === undefined)
        this._cachedSetting = new Application.Filetypes.Setting(
          this.settingSubpathRoot,
          this.constructor.name,
        );

      return this._cachedSetting;
    }
    catch (e) {
      throw new ReferenceError(
        `Application: setting: Error getting application Setting object: \n${e as string}`,
      );
    }
  }

  protected get settingSubpathRoot(): string {
    try {
      return "";
    }
    catch (e) {
      throw new ReferenceError(
        `Application: settingSubpathRoot: Error getting application setting subpath: \n${e as string}`,
      );
    }
  }

  protected get storageSubpathRoot(): typeof Application
    .prototype
    .settingSubpathRoot {
    try {
      return this.settingSubpathRoot;
    }
    catch (e) {
      throw new ReferenceError(
        `Application: storageSubpath: Error getting application storage subpath: \n${e as string}`,
      );
    }
  }

  public abstract get input(): unknown;

  public run(): ReturnType<typeof Application.prototype.handleOutput> {
    try {
      return this.handleOutput(this.runtime());
    }
    catch (e) {
      throw new EvalError(
        `Application: run: Caught unhandled exception during application runtime: \n${e as string}`,
      );
    }
  }

  public readStorage(
    subpath?: string,
  ): ReturnType<typeof Storage.prototype.read> {
    try {
      return this.storage(subpath)
        .read();
    }
    catch (e) {
      throw new ReferenceError(
        `Application: readStorage: Error reading application storage file at '${
          this.storage(subpath).path
        }': \n${e as string}`,
      );
    }
  }

  public writeStorage(data: string, subpath?: string): this {
    try {
      this.storage(subpath)
        .write(data);

      return this;
    }
    catch (e) {
      throw new ReferenceError(
        `Application: writeStorage: Error writing to application storage file at '${
          this.storage(subpath).path
        }': \n${e as string}`,
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
    }
    catch (e) {
      throw new ReferenceError(
        `Application: storage: Error getting application Storage object: \n${e as string}`,
      );
    }
  }

  public abstract runtime(): unknown;
  public abstract handleOutput(
    output: ReturnType<typeof Application.prototype.runtime>,
  ): unknown;

  private _cachedSetting?: Setting;
}

module.exports = Application;
