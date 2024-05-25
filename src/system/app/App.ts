abstract class App<
  I,
  O,
  C extends ISetting,
  AppClass extends string,
> {
  public readonly __proto: literalful<
    "App"
  > = "App";
  private readonly t0: number = Date.now();
  private readonly _storage: Record<
    string,
    Storage<
      AppClass
    >
  > = {};
  private readonly _keys: Record<
    string,
    Key<
      AppClass
    >
  > = {};

  constructor(
    private readonly _class: literalful<
      AppClass
    >,
    protected debug = false,
  ) {}

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

  protected get name() {
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

  protected get setting() {
    try {
      return this
        ._setting
        .parsed;
    }
    catch (e) {
      throw new EvalError(
        `App: setting`,
        { cause: e },
      );
    }
  }

  protected get app() {
    try {
      return this
        ._setting
        .app;
    }
    catch (e) {
      throw new EvalError(
        `App: setting.app`,
        { cause: e },
      );
    }
  }

  protected get user() {
    try {
      return this
        ._setting
        .user;
    }
    catch (e) {
      throw new EvalError(
        `App: setting.user`,
        { cause: e },
      );
    }
  }

  protected get input() {
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

  protected get inputful() {
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

  protected get inputString() {
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

  protected get inputStringful() {
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

  private get _setting() {
    try {
      if (typeof this.__setting === "undefined")
        this
          .__setting = new this
            .Setting<AppClass, C>(
            this
              ._class,
            this
              .name,
          );

      return this
        .__setting;
    }
    catch (e) {
      throw new EvalError(
        `App: _settingCache`,
        { cause: e },
      );
    }
  }

  protected abstract get getInput(): I;

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

  public run() {
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

  protected flat(
    elements: Unflat<
      string
    >,
  ) {
    try {
      return [elements]
        .flat();
    }
    catch (e) {
      throw new EvalError(
        `App: flat`,
        { cause: e },
      );
    }
  }

  protected stringfulArray(
    ...args: string[]
  ) {
    try {
      if (
        args
          .every(
            (arg): arg is stringful =>
              arg
                .length > 0,
          )
      )
        return args;
      else
        throw new TypeError(
          `string array contains empty string`,
          { cause: args },
        );
    }
    catch (e) {
      throw new EvalError(
        `App: allStringful`,
        { cause: e },
      );
    }
  }

  protected synthetic<A, O>(
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

  protected read(
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

  protected readful(
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

  protected data<D>(
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

  protected write(
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

  protected load(
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

  protected roll(
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
        const newStorage: Storage<AppClass> = new this
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
        const newKey: Key<AppClass> = new this
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

  protected abstract runtime(): NonUndefined<O>;
  protected abstract setOutput(runtimeOutput: ReturnType<App<I, O, C, AppClass>["runtime"]>): ReturnType<App<I, O, C, AppClass>["runtime"]>;
  private _name?: stringful;
  private _input?: I;
  private _inputful?: NonNullable<I>;
  private _inputString?: string;
  private _inputStringful?: stringful;
  private __setting?: Setting<AppClass, C>;
}

module.exports = App;
