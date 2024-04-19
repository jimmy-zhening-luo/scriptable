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
        `App: import Setting`,
        { cause: e },
      );
    }
  }

  protected static get Storage(): typeof Storage {
    try {
      return importModule("filetypes/Storage") as typeof Storage;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Storage`,
        { cause: e },
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
        `App: setting`,
        { cause: e },
      );
    }
  }

  public get app(): Setting<C>["app"] {
    try {
      return this.setting.app;
    }
    catch (e) {
      throw new EvalError(
        `App: setting.app`,
        { cause: e },
      );
    }
  }

  public get user(): Setting<C>["user"] {
    try {
      return this.setting.user;
    }
    catch (e) {
      throw new EvalError(
        `App: setting.user`,
        { cause: e },
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
      if (e instanceof Error) {
        this.handleError(e);
        throw new Error(
          `TOP OF STACK`,
          { cause: e },
        );
      }
      else
        throw new TypeError(
          `Caught unparseable error`,
          { cause: e },
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
        `App: storage.read`,
        { cause: e },
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
        `App: storage.write`,
        { cause: e },
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
        `App: storage`,
        { cause: e },
      );
    }
  }

  protected handleError(
    e: Error,
  ): void {
    try {
      const stack: Error[] = [e];

      for (let i: Error = e; i.cause instanceof Error; i = i.cause)
        stack.push(i.cause);

      const nStack: string[] = stack
        .map(
          i =>
            i.toString(),
        );

      while (stack.length > 1)
        console.error(
          stack.pop(),
        );

      const n: Notification = new Notification();

      n.title = (
        nStack
          .pop() ?? ""
      )
        .toString();
      n.body = nStack
        .join(
          "\n",
        );
      n.sound = "failure";
      n.schedule()
        .catch(
          n_e => { throw n_e; },
        );
    }
    catch (e) {
      throw new EvalError(
        `App: handleError`,
        { cause: e },
      );
    }
  }

  public abstract runtime(): null | O;

  protected abstract setOutput(runtimeOutput: null | O): null | O;

  private _cachedSetting?: Setting<C>;
}

module.exports = App;
