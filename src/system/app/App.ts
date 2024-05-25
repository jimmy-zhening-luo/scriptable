abstract class App<
  I,
  O,
  C extends ISetting,
  Class extends string,
> {
  public readonly __proto: literalful<"App"> = "App";
  private readonly t0: number = Date.now();
  private readonly _storage: Record<
    string,
    Storage<Class>
  > = {};
  private readonly _keys: Record<
    string,
    Key<Class>
  > = {};

  constructor(
    protected readonly _class: literalful<Class>,
    protected debug = false,
  ) {}

  public get name(): stringful {
    try {
      if (typeof this._name === "undefined")
        this
          ._name = this
            .stringful(
              this
                .constructor
                .name,
            );

      return this
        ._name;
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
      if (typeof this._setting === "undefined")
        this
          ._setting = new this
            .Setting(
              this
                ._class,
              this
                .name,
            );

      return this
        ._setting;
    }
    catch (e) {
      throw new EvalError(
        `App: setting`,
        { cause: e },
      );
    }
  }

  public get app() {
    try {
      return this
        .setting
        .app;
    }
    catch (e) {
      throw new EvalError(
        `App: setting.app`,
        { cause: e },
      );
    }
  }

  public get user() {
    try {
      return this
        .setting
        .user;
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
        this
          ._input = this
            .getInput;

      return this
        ._input;
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

        if (
          this
            .truthy(
              input,
            )
        )
          this
            ._inputful = input;
        else
          throw new TypeError(
            `null input`,
            {
              cause: {
                input: this.input,
                type: typeof this.input,
              },
            },
          );
      }

      return this
        ._inputful;
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
        const input = this
          .input ?? "";

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
          this
            ._inputString = input;
      }

      return this
        ._inputString;
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
        this
          ._inputStringful = this
            .stringful(
              this
                .inputString,
              `App.inputStringful`,
            );

      return this
        ._inputStringful;
    }
    catch (e) {
      throw new EvalError(
        `App: inputStringful`,
        { cause: e },
      );
    }
  }

  protected get stringful() {
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

  protected get base64guid() {
    try {
      return importModule(
        "./common/formats/guid/Base64Guid",
      ) as typeof Base64Guid;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Base64Guid`,
        { cause: e },
      );
    }
  }

  protected get Timestamp() {
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

  protected get Timeprint() {
    try {
      return importModule(
        "./common/formats/time/Timeprint",
      ) as typeof Timeprint;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Timeprint`,
        { cause: e },
      );
    }
  }

  private get Setting() {
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

  private get Storage() {
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

  private get Key() {
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

  private get ErrorHandler() {
    try {
      return importModule(
        "private/error/ErrorHandler",
      ) as typeof ErrorHandler;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import ErrorHandler`,
        { cause: e },
      );
    }
  }

  protected abstract get getInput(): App<I, O, C, Class>["input"];

  public static [Symbol.hasInstance](instance: unknown) {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && (instance as { __proto: string }).__proto === "App"
      );
    }
    catch (e) {
      throw new EvalError(
        `App: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  public run(): NonUndefined<O> {
    try {
      try {
        const output = this
          .runtime();

        if (this.debug) {
          const t1 = Date
            .now();

          this
            .write(
              `${
                new this
                  .Timestamp()
                  .full
              } :: ${
                t1 - this
                  .t0
              } ms : ${
                t1
              }`,
              `_runtime-${
                this
                  .name
              }.txt`,
              "line",
            );
        }

        return this
          .setOutput(
            output,
          );
      }
      catch (e) {
        throw new Error(
          `${
            this
              .name
          }: runtime`,
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

  public synthetic<A, O>(
    app: A extends App<
      infer I,
      O,
      infer C,
      infer Class
    >
      ? App<
        I,
        O,
        C,
        Class
      >
      : never,
    input: A extends App<
      infer I,
      O,
      infer C,
      infer Class
    >
      ? App<
        I,
        O,
        C,
        Class
      >[
        "input"
      ]
      : never
    ,
  ): NonUndefined<
      O
    > {
    if (app instanceof App) {
      const appCopy = app;

      appCopy._input = input;

      const output = appCopy.run();

      return output;
    }
    else
      throw new Error("foo");
  }

  public read(
    filenameOrError?:
      | boolean
      | string,
    errorNotFound?: boolean,
  ) {
    try {
      return typeof filenameOrError === "boolean"
        ? this
          .storage()
          .read(
            filenameOrError,
          )
        : this
          .storage(
            filenameOrError,
          )
          .read(
            errorNotFound,
          );
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
  ) {
    try {
      return this
        .storage(
          filename,
        )
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
    filenameOrError?:
      | boolean
      | string,
    errorNotFound?: boolean,
  ): Null<D> {
    try {
      return typeof filenameOrError === "boolean"
        ? this
          .storage()
          .data<D>(filenameOrError)
        : this
          .storage(
            filenameOrError,
          )
          .data<D>(errorNotFound);
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
    overwrite?:
      | "line"
      | "append"
      | boolean
    ,
  ) {
    try {
      this
        .storage(
          filename,
        )
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
  ) {
    try {
      return this
        .key(
          handle,
        )
        .load();
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
  ) {
    try {
      this
        .key(
          handle,
        )
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
  ) {
    try {
      const cacheId = filename ?? "";
      const cached = this
        ._storage[
          cacheId
        ] ?? null;

      if (cached !== null)
        return cached;
      else {
        const newStorage: Storage<Class> = new this
          .Storage(
            this
              ._class,
            this
              .name,
            filename,
          );

        this
          ._storage[
            cacheId
          ] = newStorage;

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
  ) {
    try {
      const cached = this
        ._keys[
          handle
        ] ?? null;

      if (cached !== null)
        return cached;
      else {
        const newKey: Key<Class> = new this
          .Key(
            this
              ._class,
            this
              .name,
            this
              .stringful(
                handle,
              ),
          );

        this
          ._keys[
            handle
          ] = newKey;

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

  protected truthy(
    value: I,
  ): value is NonNullable<I> {
    try {
      return !this
        .falsy(
          value,
        );
    }
    catch (e) {
      throw new EvalError(
        `App: truthy`,
        { cause: e },
      );
    }
  }

  protected falsy(
    value: unknown,
  ): value is
  | undefined
  | null {
    try {
      const v = value ?? false;
      const bv = Boolean(v);

      return !bv
        || (
          typeof v === "string"
            ? Number(
              v,
            ) === 0
            : Array.isArray(
              v,
            )
              ? v
                .flat(
                  Infinity,
                )
                .join(
                  "",
                )
                .length === 0
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

  public abstract runtime(): ReturnType<App<I, O, C, Class>["run"]>;
  protected abstract setOutput(runtimeOutput: ReturnType<App<I, O, C, Class>["run"]>): ReturnType<App<I, O, C, Class>["run"]>;
  private _name?: App<I, O, C, Class>["name"];
  private _setting?: App<I, O, C, Class>["setting"];
  private _input?: App<I, O, C, Class>["input"];
  private _inputful?: App<I, O, C, Class>["inputful"];
  private _inputString?: App<I, O, C, Class>["inputString"];
  private _inputStringful?: App<I, O, C, Class>["inputStringful"];
}

module.exports = App;
