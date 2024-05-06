abstract class App<
  Class extends string,
  I extends Nullable<Definite> = null,
  O extends Nullable<Definite> = null,
  C extends ISetting = NullRecord,
> {
  private readonly _t0: number = new Date()
    .getTime();
  private readonly _storage: Record<string, Storage<Class>> = {};

  constructor(
    protected readonly _class: literalful<Class>,
    protected debug: boolean = false,
  ) { }

  protected static get Setting(): typeof Setting {
    try {
      return importModule(
        "filetypes/Setting",
      ) as typeof Setting;
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
      return importModule(
        "filetypes/Storage",
      ) as typeof Storage;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Storage`,
        { cause: e },
      );
    }
  }

  protected get stringful(): typeof Stringful {
    try {
      return importModule(
        "./common/types/literals/string/Stringful",
      ) as typeof Stringful;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Stringful`,
        { cause: e },
      );
    }
  }

  public get name(): stringful {
    try {
      if (this._name === undefined)
        this._name = App.stringful(this.constructor.name);

      return this._name;
    }
    catch (e) {
      throw new EvalError(
        `App: name`,
        { cause: e },
      );
    }
  }

  public get setting(): Setting<Class, C> {
    try {
      if (this._setting === undefined)
        this._setting = new App.Setting(
          this._class,
          this.name,
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

  public get app(): Setting<Class, C>["app"] {
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

  public get user(): Setting<Class, C>["user"] {
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

  public abstract get input(): Nullable<I>;

  public run(): Nullable<O> {
    try {
      const _t1: number = new Date()
        .getTime();
      let _output: Nullable<O> = null;

      try {
        _output = this.runtime();
      }
      catch (e) {
        throw new Error(
          `${this.name}: runtime`,
          { cause: e },
        );
      }

      const output: Nullable<O> = _output;

      if (this.debug) {
        const _t2: number = new Date()
          .getTime();

        this.write(
          `${new Date()
            .toISOString()}:: ${_t2 - _t1} ms : ${_t2 - this._t0} ms`,
          `_${this.name}_runtime.txt`,
          "line",
        );
      }

      return this.setOutput(output);
    }
    catch (e) {
      throw new Error(
        this.handleError(
          new Error(
            `run\n`,
            { cause: e },
          ),
        ),
      );
    }
  }

  public read(
    filename?: boolean | string,
    error?: boolean,
  ): ReturnType<Storage<Class>["read"]> {
    try {
      return filename === undefined
        ? this.storage()
          .read()
        : typeof filename === "boolean"
          ? this.storage()
            .read(filename)
          : this.storage(filename)
            .read(error);
    }
    catch (e) {
      throw new EvalError(
        `App: read`,
        { cause: e },
      );
    }
  }

  public readful(
    filename?: string,
  ): ReturnType<Storage<Class>["readful"]> {
    try {
      return this
        .storage(filename)
        .readful();
    }
    catch (e) {
      throw new EvalError(
        `App: readful`,
        { cause: e },
      );
    }
  }

  public write(
    data: string,
    filename?: string,
    overwrite?: Parameters<Storage<Class>["write"]>[1],
  ): this {
    try {
      this
        .storage(filename)
        .write(
          data,
          overwrite,
        );

      return this;
    }
    catch (e) {
      throw new EvalError(
        `App: write`,
        { cause: e },
      );
    }
  }

  protected storage(
    filename?: string,
  ): Storage<Class> {
    try {
      const cacheId: string = filename ?? "";
      const cached: Nullable<Storage<Class>> = this._storage[cacheId] ?? null;

      if (cached !== null)
        return cached;
      else {
        const newStorage: Storage<Class> = new App.Storage(
          this._class,
          this.name,
          filename,
        );

        this._storage[cacheId] = newStorage;

        return newStorage;
      }
    }
    catch (e) {
      throw new EvalError(
        `App: storage`,
        { cause: e },
      );
    }
  }

  protected handleError(e: Error): string {
    try {
      const stack: string[] = [String(e)];

      for (let ec: Error = e; "cause" in ec; ec = ec.cause as Error)
        stack.push(String(ec.cause));

      const messages: string[] = stack
        .reverse();

      console.error(
        messages.join("\n"),
      );

      const root: string = messages.shift() ?? "";
      const n: Notification = new Notification();

      n.title = root;
      n.body = messages.join("\n");
      n.sound = "failure";
      n.schedule()
        .catch(
          (n_e: unknown): never => {
            throw new Error(
              `notification delivery failed, unknown error`,
              { cause: n_e },
            );
          },
        );

      return root;
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

  private _name?: stringful;
  private _setting?: Setting<Class, C>;
}

module.exports = App;
