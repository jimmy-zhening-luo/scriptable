abstract class App<
  Class extends string,
  Input,
  Output,
  Schema,
> {
  private readonly epoch0 = Date.now();
  private readonly _storage: Record<string, Storage<Class>> = {};
  private readonly _keys: Record<string, Key<Class>> = {};

  constructor(
    private readonly _class: literalful<Class>,
    protected debug = false,
  ) {}

  protected get base64guid() {
    try {
      return importModule(
        "./common/format/guid/Base64Guid",
      ) as typeof Base64Guid;
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
      return importModule(
        "./common/format/time/Timestamp",
      ) as typeof Timestamp;
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
      return importModule(
        "./common/format/time/Timeprint",
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
        this._name = this.stringful(
          this.constructor.name,
          `nameless app instance`,
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
    try {
      return this._setting.parse;
    }
    catch (e) {
      throw new EvalError(
        `App: setting (setting.parse)`,
        { cause: e },
      );
    }
  }

  protected get input() {
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

  protected get inputful() {
    try {
      if (typeof this._inputful === "undefined") {
        const { input } = this;

        if (this.truthy(input))
          this._inputful = input;
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

      return this._inputful;
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
        const { input } = this;
        const truthy = this.truthy(input)
          ? input
          : "";

        if (typeof truthy === "string" || typeof truthy === "number")
          this._inputString = String(truthy);
        else
          throw new TypeError(
            `non-string input`,
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
      throw new EvalError(
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
          `input string empty`,
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

  private get _setting() {
    try {
      if (typeof this.__setting === "undefined")
        this.__setting = new this.Setting<Class, Schema>(
          this._class,
          this.name,
        );

      return this.__setting;
    }
    catch (e) {
      throw new EvalError(
        `App: _setting`,
        { cause: e },
      );
    }
  }

  protected abstract get getInput(): Input;

  protected static falsy(value: unknown): value is Null<undefined> {
    try {
      const v = value ?? false;
      const bv = Boolean(v);

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
      throw new EvalError(
        `App: falsy`,
        { cause: e },
      );
    }
  }

  public run() {
    try {
      try {
        const output = this.runtime();

        if (this.debug) {
          const timestamp = new this.timestamp();
          const {
            datetime,
            epoch,
          } = timestamp;
          const { epoch0 } = this;
          const elapsed = epoch - epoch0;
          const log = `${datetime} :: ${elapsed} ms : ${epoch}`;
          const extension = "md";
          const filename = `_log${this.name}`;

          this.write(
            log,
            extension,
            filename,
            "line",
          );
        }

        return this.setOutput(output);
      }
      catch (e) {
        throw new Error(
          `${this.name}: runtime`,
          { cause: e },
        );
      }
    }
    catch (e) {
      const Handler = importModule(
        "error/ErrorHandler",
      ) as typeof ErrorHandler;

      throw new Error(
        new Handler()
          .handle(
            new Error(
              `run\n`,
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
          `Empty string`,
          { cause: error },
        );
    }
    catch (e) {
      throw new ReferenceError(
        `App: stringful`,
        { cause: e },
      );
    }
  }

  protected stringfuls(array: string[]) {
    try {
      if (
        array.every(
          (node): node is stringful =>
            node.length > 0,
        )
      )
        return array;
      else
        throw new TypeError(
          `Array has empty strings`,
          { cause: array },
        );
    }
    catch (e) {
      throw new EvalError(
        `App: stringfulArray`,
        { cause: e },
      );
    }
  }

  protected read(
    extensionE?:
      | boolean
      | string,
    filenameE?:
      | boolean
      | string,
    E?: boolean,
  ) {
    try {
      return typeof extensionE === "undefined"
        ? this
          .storage()
          .read()
        : typeof extensionE === "boolean"
          ? this
            .storage()
            .read(extensionE)
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
      throw new EvalError(
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
      throw new EvalError(
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
        ? this
          .storage()
          .data<Data>()
        : typeof extensionE === "boolean"
          ? this
            .storage()
            .data<Data>(extensionE)
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
      throw new EvalError(
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
      throw new EvalError(
        `App: write`,
        { cause: e },
      );
    }
  }

  protected load(handle: string) {
    try {
      return this
        .key(handle)
        .load();
    }
    catch (e) {
      throw new EvalError(
        `App: load`,
        { cause: e },
      );
    }
  }

  protected roll(handle: string) {
    try {
      this
        .key(handle)
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
    extension?: string,
    filename?: string,
  ) {
    try {
      const cacheId = [
        filename ?? "",
        extension ?? "",
      ].join(":");
      const cache = this._storage[cacheId] ?? null;

      if (cache !== null)
        return cache;
      else {
        const newStorage = new this.Storage<Class>(
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
      throw new EvalError(
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
        const newKey = new this.Key<Class>(
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

  protected truthy(value: Input): value is NonNullable<Input> {
    try {
      return !App.falsy(value);
    }
    catch (e) {
      throw new EvalError(
        `App: truthy`,
        { cause: e },
      );
    }
  }

  protected url(string: string) {
    try {
      const matcher = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/u;
      const _parts = matcher.exec(string) ?? [];
      const parts = (_parts[2] ?? null) !== null
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
      throw new EvalError(
        `App: url`,
        { cause: e },
      );
    }
  }

  protected abstract runtime(): Output;
  protected abstract setOutput(runtime: ReturnType<App<Class, Input, Output, Schema>["runtime"]>): ReturnType<App<Class, Input, Output, Schema>["runtime"]>;
  private _name?: stringful;
  private _input?: Input;
  private _inputful?: NonNullable<Input>;
  private _inputString?: string;
  private _inputStringful?: stringful;
  private __setting?: Setting<Class, Schema>;
}

module.exports = App;
