abstract class Application<
  I = null,
  O = null,
  C extends Config = Record<string, never>,
> {
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

  public get setting(): Setting<C> {
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

  protected get storageSubpathRoot(): string {
    try {
      return this.settingSubpathRoot;
    }
    catch (e) {
      throw new ReferenceError(
        `Application: storageSubpath: Error getting application storage subpath: \n${e as string}`,
      );
    }
  }

  public abstract get input(): null | I;

  public run(): O {
    try {
      const output: O = this.runtime();

      if (this.setOut !== undefined)
        this.setOut(output);

      return output;
    }
    catch (e) {
      const finalError = `Application: run: Caught unhandled exception during application runtime: \n${e as string}`;

      console.error(finalError);
      throw new EvalError(finalError);
    }
  }

  public readStorage(
    subpath?: string,
  ): ReturnType<Storage["read"]> {
    try {
      return this
        .storage(subpath)
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

  public writeStorage(
    data: string,
    subpath?: string,
  ): this {
    try {
      this
        .storage(subpath)
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

  public abstract runtime(): O;

  private _cachedSetting?: Setting<C>;

  protected setOut?(runtimeOut: O): void;
}

module.exports = Application;
