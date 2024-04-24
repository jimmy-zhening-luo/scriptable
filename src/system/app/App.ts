abstract class App<
  Class extends string,
  I extends Nullable<Definite> = null,
  O extends Nullable<Definite> = null,
  C extends Config = NullRecord,
> {
  protected debug: boolean = false;

  constructor(protected readonly _class: Class extends "" ? never : Class) {}

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
      const begin: Date = new Date();
      let _output: Nullable<O> = null;

      try {
        _output = this.runtime();
      }
      catch (e) {
        throw new Error(
          `${this.constructor.name}: runtime`,
          { cause: e },
        );
      }

      const output: Nullable<O> = _output;

      if (this.debug) {
        const end: Date = new Date();

        this.write(
          `${end.toISOString()}: ${end.getTime() - begin.getTime()} ms`,
          "_runtime.txt",
          "line",
        );
      }

      return this.setOutput(output);
    }
    catch (e) {
      this.handleError(
        new Error(
          `TOP: ${this.constructor.name}: run`,
          { cause: e },
        ),
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
    overwrite?: Parameters<Storage["write"]>[1],
  ): this {
    try {
      this
        .storage(subpath)
        .write(
          data,
          overwrite,
        );

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

      for (let ec: Error = e; "cause" in ec; ec = ec.cause as Error)
        stack.push(String(ec.cause));

      const messages: string[] = stack
        .reverse();

      console.error(
        messages
          .join("\n"),
      );

      const n: Notification = new Notification();

      n.title = messages.pop() ?? "";
      n.body = messages.join("\n");
      n.sound = "failure";
      n
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
