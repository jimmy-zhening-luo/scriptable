abstract class App<
  Class extends string,
  I = never,
  O = never,
  C extends ISetting = never,
> {
  private readonly _d0: Date = new Date();
  private readonly _storage: Record<
    string,
    Storage<Class>
  > = {};
  private readonly _keys: Record<
    string,
    Key<Class>
  > = {};
  private _name: Nullable<stringful> = null;
  private _setting: Nullable<Setting<Class, C>> = null;

  constructor(
    protected readonly _class: literalful<Class>,
    protected debug: boolean = false,
  ) {}

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

  protected static get Key(): typeof Key {
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

        if (this.falsy(input))
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

  protected abstract get getInput(): App<Class, I>["input"];

  public run(): NotUndefined<O> {
    try {
      try {
        const _d1: Date = new Date();
        const _output: NotUndefined<O> = this.runtime();

        if (this.debug) {
          const _t2: number = new Date()
            .getTime();

          this.write(
            `${new Date()
              .toISOString()}:: ${_t2 - _d1.getTime()} ms : ${_t2 - this._d0.getTime()} ms`,
            `_${this.name}_runtime.txt`,
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

  protected key(
    handle: string,
  ): Key<Class> {
    try {
      const cached: Nullable<Key<Class>> = this._keys[handle] ?? null;

      if (cached !== null)
        return cached;
      else {
        const newKey: Key<Class> = new App.Key(
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

  protected falsy(value: I): value is Extract<I, null | undefined> {
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

  private handleError(e: Error): string {
    function print(eLike: ErrorLike): string {
      function quotelessStringify(v: unknown): string {
        return Array.isArray(v)
          ? `[${
            v.map(
              (vi: unknown): string =>
                quotelessStringify(
                  vi,
                ),
            )
              .join(
                ", ",
              )
          }]`
          : typeof v === "object" && v !== null
            ? Object
              .keys(
                v,
              )
              .map(
                (k: string): string =>
                  `${k}: ${
                    quotelessStringify(
                      (v as Record<string, unknown>)[k],
                    )
                  }`,
              )
              .join(", ")
            : String(v);
      }

      return typeof eLike === "object" && "message" in eLike
        ? eLike.message
        : quotelessStringify(eLike);
    }

    try {
      const stack: ErrorLike[] = [e];

      for (let ei: ErrorLike = e; "cause" in ei; ei = ei.cause as ErrorLike)
        stack.push(ei.cause as ErrorLike);

      const queue: ErrorLike[] = [...stack]
        .reverse();
      const e1: number = queue.findIndex(
        (e: ErrorLike): e is ErrorLike<true> =>
          typeof e === "object" && "message" in e,
      );
      const hoistedQueue: ErrorLike[] = e1 === -1
        ? [...queue]
        : [
            queue[e1] as ErrorLike<true>,
            ...queue.slice(
              0,
              e1,
            ),
            ...queue.slice(e1 + 1),
          ];
      const messages: string[] = hoistedQueue
        .map(
          (e: ErrorLike): string =>
            print(e),
        );

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
              `Unhandled: Scriptable notification delivery failed`,
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

  public abstract runtime(): ReturnType<App<Class, I, O>["run"]>;
  protected abstract setOutput(runtimeOutput: ReturnType<App<Class, I, O>["run"]>): ReturnType<App<Class, I, O>["run"]>;
  private _input?: App<Class, I>["input"];
  private _inputful?: App<Class, I>["inputful"];
  private _inputString?: App<Class, I>["inputString"];
  private _inputStringful?: App<Class, I>["inputStringful"];
}

module.exports = App;
