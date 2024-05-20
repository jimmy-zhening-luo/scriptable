abstract class App<
  Class extends string,
  I,
  O = never,
  C extends ISetting = never,
> {
  private readonly t0: number = Date.now();
  private readonly _storage: Record<
    string,
    Storage<Class>
  > = {};
  private readonly _keys: Record<
    string,
    Key<Class>
  > = {};
  private _name: Null<stringful> = null;
  private _setting: Null<Setting<Class, C>> = null;

  constructor(
    protected readonly _class: literalful<Class>,
    protected debug: boolean = false,
  ) {}

  public get name(): stringful {
    try {
      if (this._name === null)
        this._name = this.stringful(this.constructor.name);

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
      if (this._setting === null)
        this._setting = new this.Setting(
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

  public get input(): I {
    try {
      if (typeof this._input === "undefined")
        this._input = this.getInput;

      return this._input;
    }
    catch (e) {
      throw new EvalError(
        `App: input`,
        { cause: e },
      );
    }
  }

  public get inputful(): NonNullable<I> {
    try {
      if (typeof this._inputful === "undefined") {
        const { input } = this;

        if (this.falsy(input) || input === null || typeof input === "undefined")
          throw new TypeError(
            `null input`,
            {
              cause: {
                input: this.input,
                type: typeof this.input,
                falsy: this.falsy(this.input),
              },
            },
          );
        else
          this._inputful = input;
      }

      return this._inputful;
    }
    catch (e) {
      throw new EvalError(
        `App: inputful`,
        { cause: e },
      );
    }
  }

  public get inputString(): string {
    try {
      if (typeof this._inputString === "undefined") {
        const input: string | App<Class, I>["input"] = this.input ?? "";

        if (typeof input !== "string")
          throw new TypeError(
            `non-string input`,
            {
              cause: {
                input,
                type: typeof input,
              },
            },
          );
        else
          this._inputString = input;
      }

      return this._inputString;
    }
    catch (e) {
      throw new EvalError(
        `App: inputString`,
        { cause: e },
      );
    }
  }

  public get inputStringful(): stringful {
    try {
      if (typeof this._inputStringful === "undefined")
        this._inputStringful = this.stringful(
          this.inputString,
          `App.inputStringful`,
        );

      return this._inputStringful;
    }
    catch (e) {
      throw new EvalError(
        `App: inputStringful`,
        { cause: e },
      );
    }
  }

  protected get stringful(): typeof Stringful {
    try {
      return importModule(
        "./common/types/safe/acceptors/string/Stringful",
      ) as typeof Stringful;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Stringful`,
        { cause: e },
      );
    }
  }

  protected get Timestamp(): typeof Timestamp {
    try {
      return importModule(
        "./common/formats/time/Timestamp",
      ) as typeof Timestamp;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Stringful`,
        { cause: e },
      );
    }
  }

  private get Setting(): typeof Setting {
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

  private get Storage(): typeof Storage {
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

  private get Key(): typeof Key {
    try {
      return importModule(
        "filetypes/Key",
      ) as typeof Key;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Key`,
        { cause: e },
      );
    }
  }

  private get ErrorHandler(): typeof ErrorHandler {
    try {
      return importModule(
        "error/ErrorHandler",
      ) as typeof ErrorHandler;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import ErrorHandler`,
        { cause: e },
      );
    }
  }

  protected abstract get getInput(): App<Class, I>["input"];

  public run(): NonUndefined<O> {
    try {
      try {
        const _output: NonUndefined<O> = this.runtime();

        if (this.debug) {
          const t1: number = Date.now();

          this.write(
            `${new this.Timestamp().full} :: ${t1 - this.t0} ms : ${t1}`,
            `_runtime-${this.name}.txt`,
            "line",
          );
        }

        return this.setOutput(_output);
      }
      catch (e) {
        throw new Error(
          `${this.name}: runtime`,
          { cause: e },
        );
      }
    }
    catch (e) {
      throw new Error(
        new this
          .ErrorHandler()
          .handle(
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
    errorNoFile?: boolean,
  ): ReturnType<Storage<Class>["read"]> {
    try {
      return typeof filename === "boolean"
        ? this.storage()
          .read(filename)
        : this.storage(filename)
          .read(errorNoFile);
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

  public data<D>(
    filename?: boolean | string,
    errorNoFile?: boolean,
  ): D & Record<string, string> {
    try {
      return typeof filename === "boolean"
        ? this.storage()
          .data<D>(filename)
        : this.storage(filename)
          .data<D>(errorNoFile);
    }
    catch (e) {
      throw new EvalError(
        `App: data`,
        { cause: e },
      );
    }
  }

  public write(
    data: unknown,
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

  public load(
    handle: string,
  ): ReturnType<Key<Class>["load"]> {
    try {
      return this
        .key(handle)
        .readful();
    }
    catch (e) {
      throw new EvalError(
        `App: load`,
        { cause: e },
      );
    }
  }

  public roll(
    handle: string,
  ): ReturnType<Key<Class>["roll"]> {
    try {
      return this
        .key(handle)
        .roll();
    }
    catch (e) {
      throw new EvalError(
        `App: load`,
        { cause: e },
      );
    }
  }

  protected storage(
    filename?: string,
  ): Storage<Class> {
    try {
      const cacheId: string = filename ?? "";
      const cached: Null<Storage<Class>> = this._storage[cacheId] ?? null;

      if (cached !== null)
        return cached;
      else {
        const newStorage: Storage<Class> = new this.Storage(
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

  protected key(
    handle: string,
  ): Key<Class> {
    try {
      const cached: Null<Key<Class>> = this._keys[handle] ?? null;

      if (cached !== null)
        return cached;
      else {
        const newKey: Key<Class> = new this.Key(
          this._class,
          this.name,
          this.stringful(handle),
        );

        this._keys[handle] = newKey;

        return newKey;
      }
    }
    catch (e) {
      throw new EvalError(
        `App: key`,
        { cause: e },
      );
    }
  }

  protected falsy(value: unknown): value is (undefined | null) & I {
    try {
      const v: {} = value ?? false;

      return v === false || (
        typeof v === "string"
          ? Number(v) === 0
          : typeof v === "object"
            ? Object.keys(v).length === 0
            : Array.isArray(v)
              ? v.flat(Infinity).length === 0
              : typeof v === "number"
                ? v === 0 || Number.isNaN(v)
                : typeof v === "bigint"
                  ? Number(v) === 0
                  : false
      );
    }
    catch (e) {
      throw new EvalError(
        `App: falsy`,
        { cause: e },
      );
    }
  }

  public abstract runtime(): ReturnType<App<Class, I, O>["run"]>;
  protected abstract setOutput(runtimeOutput: ReturnType<App<Class, I, O>["run"]>): ReturnType<App<Class, I, O>["run"]>;
  private _input?: App<Class, I>["input"];
  private _inputful?: App<Class, I>["inputful"];
  private _inputString?: App<Class, I>["inputString"];
  private _inputStringful?: App<Class, I>["inputStringful"];
}

module.exports = App;
