abstract class App<
  Class extends string,
  I extends Nullable<Definite> = null,
  O extends Nullable<Definite> = null,
  C extends ISetting = NullRecord,
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

  public get input(): Nullable<I> {
    try {
      if (typeof this._input === "undefined")
        this._input = this.setInput;

      return this._input;
    }
    catch (e) {
      throw new EvalError(
        `App: input`,
        { cause: e },
      );
    }
  }

  public get inputString(): Nullable<string> {
    try {
      if (typeof this._inputString === "undefined")
        this._inputString = this.falsy(
          this.input,
        )
          ? null
          : String(this.input);

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
        if (typeof this.input !== "string")
          throw new TypeError(
            `typeof input is non-string`,
            {
              cause: {
                input: this.input,
                type: typeof this.input,
              },
            },
          );
        else
          this._inputStringful = this.stringful(
            this.input,
            `App.input`,
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

  protected abstract get setInput(): Nullable<I>;

  public run(): Nullable<O> {
    try {
      const _d1: Date = new Date();
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

  private handleError(e: Error): string {
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

  private falsy(v: unknown): v is false {
    try {
      return !this.boolean(v);
    }
    catch (e) {
      throw new EvalError(
        `App: falsy`,
        { cause: e },
      );
    }
  }

  private boolean(v: unknown): v is true {
    try {
      return typeof v === "boolean"
        ? v
        : typeof v === "number" || typeof v === "bigint"
          ? Number(v) !== 0
          && Number.isFinite(
            Number(v),
          )
          : typeof v === "string"
            ? ![
                "false",
                "null",
                "undefined",
                "nan",
              ].includes(
                v
                  .trim()
                  .toLowerCase(),
              )
              && (
                Number.isNaN(
                  Number(v),
                )
                || this.boolean(
                  Number(v),
                )
              )
            : Array.isArray(v)
              ? v.length > 0
              && v
                .map(
                  (vi: unknown): vi is Truthy<unknown> =>
                    this.boolean(
                      vi,
                    ),
                )
                .includes(
                  true,
                )
              : typeof v === "object"
                ? v !== null
                && Object.keys(v).length > 0
                && Object.keys(v)
                  .map(
                    (vkey: string): vkey is Truthy<string> =>
                      this.boolean(
                        (v as Record<string, unknown>)[vkey],
                      ),
                  )
                  .includes(
                    true,
                  )
                : typeof v === "function"
                || typeof v === "symbol";
    }
    catch (e) {
      throw new EvalError(
        `App: boolean`,
        { cause: e },
      );
    }
  }

  public abstract runtime(): Nullable<O>;

  protected abstract setOutput(runtimeOutput: Nullable<O>): Nullable<O>;

  private _input?: Nullable<I>;
  private _inputString?: Nullable<string>;
  private _inputStringful?: stringful;
}

module.exports = App;
