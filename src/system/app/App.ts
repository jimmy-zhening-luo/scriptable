abstract class App<
  AT extends string,
  Input,
  Output,
  Schema,
> {
  private readonly _storage: Record<string, Storage<AT>> = {};
  private readonly _keys: Record<string, Key<AT>> = {};

  constructor(private readonly apptype: literalful<AT>) {}

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

  private static get errorcatch() {
    try {
      return importModule<typeof errorcatch>(
        "error/errorcatch",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import errorcatch`,
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
        `App: import guid64`,
        { cause: e },
      );
    }
  }

  protected get timestamp() {
    try {
      return importModule<typeof timestamp>(
        "./common/format/time/timestamp",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import timestamp`,
        { cause: e },
      );
    }
  }

  protected get timeprint() {
    try {
      return importModule<typeof timeprint>(
        "./common/format/time/timeprint",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `App: import timeprint`,
        { cause: e },
      );
    }
  }

  protected get name() {
    if (typeof this._name === "undefined")
      this._name = this.stringful(
        this.constructor.name,
        "App instance has no name",
      );

    return this._name;
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
            "Null input",
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
            "Non-stringable input",
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
    if (typeof this._inputStringful === "undefined")
      this._inputStringful = this.stringful(
        this.inputString,
        "App: inputStringful",
      );

    return this._inputStringful;
  }

  private get _setting() {
    if (typeof this.__setting === "undefined")
      this.__setting = new App.Setting<AT, Schema>(
        this.apptype,
        this.name,
      );

    return this.__setting;
  }

  protected abstract get getInput(): Input;

  protected static falsy(value: unknown): value is Null<undefined> {
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

  public run() {
    try {
      return this.output(this.runtime());
    }
    catch (e) {
      throw new Error(App.errorcatch(new Error(
        `${this.name}: runtime`,
        { cause: e },
      )));
    }
  }

  protected stringful(
    string: string,
    error = "",
  ) {
    if (string.length > 0)
      return string as stringful;
    else
      throw new TypeError(
        "Not stringful",
        { cause: error },
      );
  }

  protected stringfuls(
    array: string[],
    error = "",
  ) {
    if (array.every((i): i is stringful => i.length > 0))
      return array;
    else
      throw new TypeError(
        "Not stringful array",
        { cause: { array, error } },
      );
  }

  protected read(
    extE?: boolean | string,
    filenameE?: boolean | string,
    E?: boolean,
  ) {
    return typeof extE === "undefined"
      ? this.storage().read()
      : typeof extE === "boolean"
        ? this.storage().read(extE)
        : typeof filenameE === "boolean"
          ? this
            .storage(extE)
            .read(filenameE)
          : this
            .storage(
              extE,
              filenameE,
            )
            .read(E);
  }

  protected readful(ext?: string, filename?: string) {
    return this
      .storage(
        ext,
        filename,
      )
      .readful();
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

  protected write(
    data: unknown,
    extension?: string,
    filename?: string,
    overwrite?:
      | "line"
      | "append"
      | boolean,
  ) {
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

  protected load(handle: string) {
    return this.key(handle).load();
  }

  protected roll(handle: string) {
    this.key(handle).roll();
  }

  protected storage(ext?: string, filename?: string) {
    const cacheId = [filename ?? "", ext ?? ""]
      .join(":"),
    cache = this._storage[cacheId] ?? null;

    if (cache !== null)
      return cache;
    else {
      const { apptype, name } = this,
      newStorage = new App.Storage<AT>(
        apptype,
        name,
        ext,
        filename,
      );

      this._storage[cacheId] = newStorage;

      return newStorage;
    }
  }

  protected key(handle: string) {
    const cache = this._keys[handle] ?? null;

    if (cache !== null)
      return cache;
    else {
      const { apptype, name } = this,
      newKey = new App.Key<AT>(
        apptype,
        name,
        this.stringful(handle),
      );

      this._keys[handle] = newKey;

      return newKey;
    }
  }

  protected truthy(value: Input): value is NonNullable<Input> {
    return !App.falsy(value);
  }

  protected url(string: string) {
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

  protected abstract runtime(): Output;
  protected abstract output(runtime: ReturnType<App<AT, Input, Output, Schema>["runtime"]>): ReturnType<App<AT, Input, Output, Schema>["runtime"]>;
  private _name?: stringful;
  private _input?: Input;
  private _inputful?: NonNullable<Input>;
  private _inputString?: string;
  private _inputStringful?: stringful;
  private __setting?: Setting<AT, Schema>;
}

module.exports = App;
