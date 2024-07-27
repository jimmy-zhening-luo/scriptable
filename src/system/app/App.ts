abstract class App<
  Class extends string,
  Input,
  Output,
  Schema,
> {
  private readonly _storage: Record<string, Storage<Class>> = {};
  private readonly _keys: Record<string, Key<Class>> = {};

  constructor(private readonly _class: literalful<Class>) {}

  private static get Setting() {
    try {
      return importModule<typeof Setting>(
        "filetypes/Setting",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Setting`,
        { cause: e },
      );
    }
  }

  private static get Storage() {
    try {
      return importModule<typeof Storage>(
        "filetypes/Storage",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Storage`,
        { cause: e },
      );
    }
  }

  private static get Key() {
    try {
      return importModule<typeof Key>(
        "filetypes/Key",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Key`,
        { cause: e },
      );
    }
  }

  private static get ErrorHandler() {
    try {
      return importModule<typeof ErrorHandler>(
        "error/ErrorHandler",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import ErrorHandler`,
        { cause: e },
      );
    }
  }

  protected get guid64() {
    try {
      return importModule<typeof guid64>(
        "./common/format/guid/guid64",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Base64Guid`,
        { cause: e },
      );
    }
  }

  protected get timestamp() {
    try {
      return importModule<typeof Timestamp>(
        "./common/format/time/Timestamp",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import Timestamp`,
        { cause: e },
      );
    }
  }

  protected get timeprint() {
    try {
      return importModule<typeof Timeprint>(
        "./common/format/time/Timeprint",
      );
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
        this._name = this.stringful(
          this.constructor.name,
          `App instance has no name`,
        );

      return this._name;
    }
    catch (e) {
      throw new EvalError(
        `App: name`,
        { cause: e },
      );
    }
  }

  protected get setting() {
    return this._setting.parse;
  }

  protected get input() {
    try {
      if (typeof this._input === "undefined")
        this._input = this.getInput;

      return this._input;
    }
    catch (e) {
      throw new TypeError(
        `App: input`,
        { cause: e },
      );
    }
  }

  protected get inputful() {
    try {
      if (typeof this._inputful === "undefined") {
        const { input } = this;

        if (this.truthy(input))
          this._inputful = input;
        else
          throw new TypeError(
            `Null input when expecting inputful`,
            { cause: { input, type: typeof input } },
          );
      }

      return this._inputful;
    }
    catch (e) {
      throw new TypeError(
        `App: inputful`,
        { cause: e },
      );
    }
  }

  protected get inputString() {
    try {
      if (typeof this._inputString === "undefined") {
        const { input } = this,
        truthy = this.truthy(input) ? input : "";

        if (typeof truthy === "string" || typeof truthy === "number")
          this._inputString = String(truthy);
        else
          throw new TypeError(
            `Non-stringable input when expecting stringable`,
            {
              cause: {
                input,
                truthy,
                type: typeof input,
                isArray: Array.isArray(input),
              },
            },
          );
      }

      return this._inputString;
    }
    catch (e) {
      throw new TypeError(
        `App: inputString`,
        { cause: e },
      );
    }
  }

  protected get inputStringful() {
    try {
      if (typeof this._inputStringful === "undefined")
        this._inputStringful = this.stringful(
          this.inputString,
          `String input empty when expecting stringful`,
        );

      return this._inputStringful;
    }
    catch (e) {
      throw new TypeError(
        `App: inputStringful`,
        { cause: e },
      );
    }
  }

  private get _setting() {
    try {
      if (typeof this.__setting === "undefined")
        this.__setting = new App.Setting<Class, Schema>(
          this._class,
          this.name,
        );

      return this.__setting;
    }
    catch (e) {
      throw new Error(
        `App: _setting`,
        { cause: e },
      );
    }
  }

  protected abstract get getInput(): Input;

  protected static falsy(value: unknown): value is Null<undefined> {
    try {
      const v = value ?? false,
      bv = Boolean(v);

      return !bv
        || (
          typeof v === "string"
            ? Number(v) === 0
            : Array.isArray(v)
              ? v.join("").length < 1
              : false
        );
    }
    catch (e) {
      throw new TypeError(
        `App: falsy`,
        { cause: e },
      );
    }
  }

  public run() {
    try {
      return this.output(this.runtime());
    }
    catch (e) {
      throw new Error(
        (new App.ErrorHandler)
          .handle(
            new Error(
              `${this.name}: runtime`,
              { cause: e },
            ),
          ),
      );
    }
  }

  protected stringful(
    string: string,
    error = "",
  ) {
    try {
      if (string.length > 0)
        return string as stringful;
      else
        throw new TypeError(
          `Not stringful`,
          { cause: error },
        );
    }
    catch (e) {
      throw new TypeError(
        `App: stringful`,
        { cause: e },
      );
    }
  }

  protected stringfuls(
    array: string[],
    error = "",
  ) {
    try {
      if (array.every((node): node is stringful => node.length > 0))
        return array;
      else
        throw new TypeError(
          `Not stringful array`,
          { cause: { array, error } },
        );
    }
    catch (e) {
      throw new TypeError(
        `App: stringfuls`,
        { cause: e },
      );
    }
  }

  protected read(
    extensionE?: boolean | string,
    filenameE?: boolean | string,
    E?: boolean,
  ) {
    try {
      return typeof extensionE === "undefined"
        ? this.storage().read()
        : typeof extensionE === "boolean"
          ? this.storage().read(extensionE)
          : typeof filenameE === "boolean"
            ? this
              .storage(extensionE)
              .read(filenameE)
            : this
              .storage(
                extensionE,
                filenameE,
              )
              .read(E);
    }
    catch (e) {
      throw new Error(
        `App: read`,
        { cause: e },
      );
    }
  }

  protected readful(
    extension?: string,
    filename?: string,
  ) {
    try {
      return this
        .storage(
          extension,
          filename,
        )
        .readful();
    }
    catch (e) {
      throw new Error(
        `App: readful`,
        { cause: e },
      );
    }
  }

  protected data<Data>(
    extensionE?:
      | boolean
      | string,
    filenameE?:
      | boolean
      | string,
    E?: boolean,
  ): Null<Data> {
    try {
      return typeof extensionE === "undefined"
        ? this.storage().data<Data>()
        : typeof extensionE === "boolean"
          ? this.storage().data<Data>(extensionE)
          : typeof filenameE === "boolean"
            ? this
              .storage(extensionE)
              .data<Data>(filenameE)
            : this
              .storage(
                extensionE,
                filenameE,
              )
              .data<Data>(E);
    }
    catch (e) {
      throw new Error(
        `App: data`,
        { cause: e },
      );
    }
  }

  protected write(
    data: unknown,
    extension?: string,
    filename?: string,
    overwrite?:
      | "line"
      | "append"
      | boolean,
  ) {
    try {
      this
        .storage(
          extension,
          filename,
        )
        .write(
          data,
          overwrite,
        );

      return this;
    }
    catch (e) {
      throw new Error(
        `App: write`,
        { cause: e },
      );
    }
  }

  protected load(handle: string) {
    try {
      return this.key(handle).load();
    }
    catch (e) {
      throw new Error(
        `App: load`,
        { cause: e },
      );
    }
  }

  protected roll(handle: string) {
    try {
      this.key(handle).roll();
    }
    catch (e) {
      throw new Error(
        `App: load`,
        { cause: e },
      );
    }
  }

  protected storage(
    extension?: string,
    filename?: string,
  ) {
    try {
      const cacheId = [filename ?? "", extension ?? ""]
        .join(":"),
      cache = this._storage[cacheId] ?? null;

      if (cache !== null)
        return cache;
      else {
        const newStorage = new App.Storage<Class>(
          this._class,
          this.name,
          extension,
          filename,
        );

        this._storage[cacheId] = newStorage;

        return newStorage;
      }
    }
    catch (e) {
      throw new Error(
        `App: storage`,
        { cause: e },
      );
    }
  }

  protected key(handle: string) {
    try {
      const cache = this._keys[handle] ?? null;

      if (cache !== null)
        return cache;
      else {
        const newKey = new App.Key<Class>(
          this._class,
          this.name,
          this.stringful(handle),
        );

        this._keys[handle] = newKey;

        return newKey;
      }
    }
    catch (e) {
      throw new Error(
        `App: key`,
        { cause: e },
      );
    }
  }

  protected truthy(value: Input): value is NonNullable<Input> {
    return !App.falsy(value);
  }

  protected url(string: string) {
    try {
      const matcher = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/u,
      _parts = matcher.exec(string) ?? [],
      parts = (_parts[2] ?? null) !== null
        ? _parts
        : matcher.exec(`https://${string}`) ?? [];

      return {
        scheme: parts[2] ?? "",
        host: parts[4] ?? "",
        path: parts[5] ?? "",
        query: parts[7] ?? "",
        fragment: parts[9] ?? "",
      };
    }
    catch (e) {
      throw new Error(
        `App: url`,
        { cause: e },
      );
    }
  }

  protected abstract runtime(): Output;
  protected abstract output(runtime: ReturnType<App<Class, Input, Output, Schema>["runtime"]>): ReturnType<App<Class, Input, Output, Schema>["runtime"]>;
  private _name?: stringful;
  private _input?: Input;
  private _inputful?: NonNullable<Input>;
  private _inputString?: string;
  private _inputStringful?: stringful;
  private __setting?: Setting<Class, Schema>;
}

module.exports = App;
