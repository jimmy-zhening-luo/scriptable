abstract class App<
  T extends string,
  I = null,
  O = null,
  C extends Config = Record<string, never>,
> {
  constructor(
    protected readonly _type: T,
  ) {}

  protected static get Setting(): typeof Setting {
    try {
      return importModule("filetypes/Setting") as typeof Setting;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Setting: \n${e as string}`,
      );
    }
  }

  protected static get Storage(): typeof Storage {
    try {
      return importModule("filetypes/Storage") as typeof Storage;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Storage: \n${e as string}`,
      );
    }
  }

  public get setting(): Setting<C> {
    try {
      if (this._cachedSetting === undefined)
        this._cachedSetting = new App.Setting(
          this._type,
          this.constructor.name,
        );

      return this._cachedSetting;
    }
    catch (e) {
      throw new EvalError(
        `App: setting: \n${e as string}`,
      );
    }
  }

  public get app(): Setting<C>["app"] {
    try {
      return this.setting.app;
    }
    catch (e) {
      throw new EvalError(
        `App: setting.app: \n${e as string}`,
      );
    }
  }

  public get user(): Setting<C>["user"] {
    try {
      return this.setting.user;
    }
    catch (e) {
      throw new EvalError(
        `App: setting.user: \n${e as string}`,
      );
    }
  }

  public abstract get input(): null | string | I;

  public run(): null | O {
    try {
      return this.setOutput(
        this.runtime(),
      );
    }
    catch (e) {
      const stack: string[] = `${e as string}`
        .split(
          "\n",
        );
      const nTitle: string = stack.pop() ?? "";
      const nBody: string = stack
        .reverse()
        .join(
          "\n",
        );

      console.error(nTitle);
      console.error(nBody);

      const n: Notification = new Notification();

      n.title = nTitle;
      n.body = nBody;
      n.sound = "failure";
      n.schedule()
        .catch(
          err => { throw err; },
        );

      throw new Error(
        `END EXECUTION`,
      );
    }
  }

  public read(
    subpath?: string,
  ): ReturnType<Storage["read"]> {
    try {
      return this
        .storage(subpath)
        .read();
    }
    catch (e) {
      throw new EvalError(
        `App: storage.read: \n${e as string}`,
      );
    }
  }

  public write(
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
      throw new EvalError(
        `App: storage.write: \n${e as string}`,
      );
    }
  }

  protected storage(
    subpath?: string,
  ): Storage {
    try {
      return new App.Storage(
        this._type,
        this.constructor.name,
        subpath,
      );
    }
    catch (e) {
      throw new EvalError(
        `App: storage: \n${e as string}`,
      );
    }
  }

  public abstract runtime(): null | O;

  protected abstract setOutput(runtimeOutput: null | O): null | O;

  private _cachedSetting?: Setting<C>;
}

module.exports = App;
