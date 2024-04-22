abstract class App<
  Class extends string,
  I extends Nullable<Definite> = null,
  O extends Nullable<Definite> = null,
  C extends Config = Empty,
> {
  constructor(protected readonly _class: Class) {}

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
      if (this._setting === undefined)
        this._setting = new App.Setting(
          this._class,
          this.constructor.name,
        );

      return this._setting;
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

  public abstract get input(): string | Nullable<I>;

  public run(): Nullable<O> {
    try {
      return this.setOutput(
        this.runtime(),
      );
    }
    catch (e) {
      if (e !== null && typeof e === "object" && "message" in e) {
        this.handleError(e as Error);

        throw new Error(
          `TOP`,
          { cause: e },
        );
      }
      else
        throw new SyntaxError(
          `Unexpected: Caught unparseable error`,
          { cause: e },
        );
    }
  }

  public read(subpath?: string): ReturnType<Storage["read"]> {
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

  protected storage(subpath?: string): Storage {
    try {
      return new App.Storage(
        this._class,
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

  protected handleError(e: Error): void {
    try {
      const stack: string[] = [String(e)];

      for (let i: Error = e; "cause" in i && typeof i.cause === "object" && i.cause !== null && "message" in i.cause; i = i.cause as Error)
        stack.push(String(i.cause as Error));

      const messages: string[] = stack
        .reverse();

      console.error(
        messages
          .join("\n"),
      );

      const n: Notification = new Notification();

      n.title = messages.pop() ?? "";      n.body = messages.join("\n");      n.sound = "failure";      n
        .schedule()
        .catch(n_e => { throw n_e; });
    }
    catch (e) {
      throw new EvalError(
        `App: handleError`,
        { cause: e },
      );
    }
  }

  public abstract runtime(): Nullable<O>;

  protected abstract setOutput(runtimeOutput: Nullable<O>): Nullable<O>;

  private _setting?: Setting<C>;
}

module.exports = App;
