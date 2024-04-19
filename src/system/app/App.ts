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
      if (typeof e === "object" && "message" in e) {
        this.handleError(e as Error);
        throw new Error(
          `TOP`,
          { cause: e },
        );
      }
      else
        throw new SyntaxError(
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
      const stack: string[] = [
        String(e),
      ];

      for (let i: Error = e; "cause" in i && typeof i.cause === "object" && "message" in i.cause; i = i.cause as Error);
        stack.push(
          String(
            i.cause as Error,
          ),
        );

      const messages: string[] = stack
        .reverse();

      console.error(
        messages
          .join(
            "\n",
          ),
      );

      const n: Notification = new Notification();

      n.title = (
        messages
          .pop() ?? ""
      );
      n.body = messages
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
