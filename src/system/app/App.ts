abstract class App<
  C extends string,
  I,
  O,
  S extends ISetting,
> {
  protected readonly __proto: literalful<
    "App"
  > = "App";
  private readonly t0: number = Date
    .now();
  private readonly _storage: Record<
    string
    ,
    Storage<
      C
    >
  > = {};
  private readonly _keys: Record<
    string
    ,
    Key<
      C
    >
  > = {};

  constructor(
    private readonly _class: literalful<
      C
    >,
    protected debug = false,
  ) {}

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
      if (
        typeof this
          ._name === "undefined"
      )
        this
          ._name = this
            .stringful(
              this
                .constructor
                .name,
              `nameless app instance`,
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
        `App: setting (setting.parsed)`,
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
        `App: app (setting.app)`,
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
        `App: user (setting.user)`,
        { cause: e },
      );
    }
  }

  protected get input() {
    try {
      if (
        typeof this
          ._input === "undefined"
      )
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
      if (
        typeof this
          ._inputful === "undefined"
      ) {
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
                input,
                type: typeof input,
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
      if (
        typeof this
          ._inputString === "undefined"
      ) {
        const { input } = this;
        const truthyInput = this
          .truthy(
            input,
          )
          ? input
          : "";

        if (
          typeof truthyInput === "string"
        )
          this
            ._inputString = truthyInput;
        else
          throw new TypeError(
            `non-string input`,
            {
              cause: {
                input,
                truthyInput,
                type: typeof input,
                isArray: Array.isArray(input),
              },
            },
          );
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
      if (
        typeof this
          ._inputStringful === "undefined"
      )
        this
          ._inputStringful = this
            .stringful(
              this
                .inputString,
              `input string empty`,
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
      if (
        typeof this
          .__setting === "undefined"
      )
        this
          .__setting = new this
            .Setting<C, S>(
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
        `App: _setting`,
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

  protected static falsy(
    value: unknown,
  ): value is
  | undefined
  | null {
    try {
      const v = value
        ?? false;
      const bv = Boolean(
        v,
      );

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
                .join(
                  "",
                )
                .length < 1
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

  public run() {
    try {
      try {
        const output = this
          .runtime();

        if (
          this
            .debug
        ) {
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
              "md",
              [
                "_runtime",
                this
                  .name,
              ]
                .join(
                  "-",
                ),
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

  protected truthy(
    value: I,
  ): value is NonNullable<
    I
  > {
    try {
      return !App
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

  protected stringful(
    string: string,
    errorLabel: string = "",
  ) {
    try {
      if (
        string
          .length > 0
      )
        return string as stringful;
      else
        throw new TypeError(
          `empty string`,
          { cause: { errorLabel } },
        );
    }
    catch (e) {
      throw new ReferenceError(
        `App: stringful`,
        { cause: e },
      );
    }
  }

  protected stringfulArray(
    array: string[],
  ) {
    try {
      if (
        array
          .every(
            (node): node is stringful =>
              node
                .length > 0,
          )
      )
        return array;
      else
        throw new TypeError(
          `string array has empty string`,
          {
            cause: {
              array,
              length: array.length,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `App: stringfulArray`,
        { cause: e },
      );
    }
  }

  protected synthetic<A, O>(
    app: A extends App<
      infer C
      ,
      infer I
      ,
      O
      ,
      infer S
    >
      ? App<
        C,
        I,
        O,
        S
      >
      : never,
    input: A extends App<
      infer C
      ,
      infer I
      ,
      O
      ,
      infer S
    >
      ? App<
        C,
        I,
        O,
        S
      >[
        "input"
      ]
      : never
    ,
  ): O {
    try {
      if (
        app instanceof App
      ) {
        const appShallowCopy = app;

        appShallowCopy
          ._input = input;

        return appShallowCopy
          .run();
      }
      else
        throw new TypeError(
          `invalid app`,
          {
            cause: {
              input,
              appType: typeof app,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `App: synthetic`,
        { cause: e },
      );
    }
  }

  protected read(
    extE?:
      | boolean
      | string,
    filenameE?:
      | boolean
      | string,
    E?: boolean,
  ) {
    try {
      return typeof extE === "undefined"
        ? this
          .storage()
          .read()
        : typeof extE === "boolean"
          ? this
            .storage()
            .read(extE)
          : typeof filenameE === "boolean"
            ? this
              .storage(
                extE,
              )
              .read(filenameE)
            : this
              .storage(
                extE,
                filenameE,
              )
              .read(E);
    }
    catch (e) {
      throw new EvalError(
        `App: read`,
        { cause: e },
      );
    }
  }

  protected readful(
    ext?: string,
    filename?: string,
  ) {
    try {
      return this
        .storage(
          ext,
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
    extE?:
      | boolean
      | string,
    filenameE?:
      | boolean
      | string,
    E?: boolean,
  ): Null<D> {
    try {
      return typeof extE === "undefined"
        ? this
          .storage()
          .data<D>()
        : typeof extE === "boolean"
          ? this
            .storage()
            .data<D>(extE)
          : typeof filenameE === "boolean"
            ? this
              .storage(
                extE,
              )
              .data<D>(filenameE)
            : this
              .storage(
                extE,
                filenameE,
              )
              .data<D>(E);
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
    ext?: string,
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
          ext,
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
        `App: roll`,
        { cause: e },
      );
    }
  }

  protected storage(
    ext?: string,
    filename?: string,
  ) {
    try {
      const cacheId = [
        filename
        ?? "",
        ext
        ?? "",
      ]
        .join(
          ":",
        );
      const cached = this
        ._storage[
          cacheId
        ]
        ?? null;

      if (
        cached !== null
      )
        return cached;
      else {
        const newStorage: Storage<C> = new this
          .Storage(
            this
              ._class,
            this
              .name,
            ext,
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
        ]
        ?? null;

      if (
        cached !== null
      )
        return cached;
      else {
        const newKey: Key<C> = new this
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

  protected abstract runtime(): O;
  protected abstract setOutput(runtimeOutput: ReturnType<App<C, I, O, S>["runtime"]>): ReturnType<App<C, I, O, S>["runtime"]>;
  private _name?: stringful;
  private _input?: I;
  private _inputful?: NonNullable<I>;
  private _inputString?: string;
  private _inputStringful?: stringful;
  private __setting?: Setting<C, S>;
}

module.exports = App;
