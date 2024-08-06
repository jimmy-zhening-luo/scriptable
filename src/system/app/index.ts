import type { Key } from "./filetypes/Key";
import type { Setting } from "./filetypes/Setting";
import type { Storage } from "./filetypes/Storage";
import type { error } from "./error/index";

abstract class App<
  AT extends string,
  Input,
  Output,
  Schema,
> {
  private readonly _storage: Record<string, Storage<AT>> = {};
  private readonly _keys: Record<string, Key<AT>> = {};

  protected abstract apptype: literalful<AT>;

  private static get Setting() {
    return importModule<typeof Setting>("./filetypes/Setting");
  }

  private static get Storage() {
    return importModule<typeof Storage>("./filetypes/Storage");
  }

  private static get Key() {
    return importModule<typeof Key>("./filetypes/Key");
  }

  private static get error() {
    return importModule<error>("error/index");
  }

  protected get timestamp() {
    const d = new DateFormatter;

    d.dateFormat = "yyyyMMddhhmmssZ";

    return d.string(new Date);
  }

  protected get dateprint() {
    const d = new DateFormatter;

    d.dateFormat = "EEEE, MMMM d, y";
    d.locale = "en";

    return d.string(new Date);
  }

  protected get name() {
    if (typeof this._name === "undefined")
      this._name = this.stringful(this.constructor.name, "App instance has no name");

    return this._name;
  }

  protected get setting() {
    return this._setting.parse;
  }

  protected get input() {
    if (typeof this._input === "undefined")
      this._input = this.getInput;

    return this._input;
  }

  protected get inputful() {
    try {
      if (typeof this._inputful === "undefined") {
        const { input } = this;

        if (this.truthy(input))
          this._inputful = input;
        else
          throw new TypeError("Null input", { cause: { input, type: typeof input } });
      }

      return this._inputful;
    }
    catch (e) { throw new TypeError(`App: inputful`, { cause: e }); }
  }

  protected get inputString() {
    try {
      if (typeof this._inputString === "undefined") {
        const { input } = this,
        truthy = this.truthy(input) ? input : "";

        if (typeof truthy === "string" || typeof truthy === "number")
          this._inputString = String(truthy);
        else
          throw new TypeError("Non-stringable input", { cause: { input, type: Array.isArray(input) ? "array" : typeof input } });
      }

      return this._inputString;
    }
    catch (e) { throw new TypeError(`App: inputString`, { cause: e }); }
  }

  protected get inputStringful() {
    if (typeof this._inputStringful === "undefined")
      this._inputStringful = this.stringful(this.inputString, "App: inputStringful");

    return this._inputStringful;
  }

  private get _setting() {
    if (typeof this.__setting === "undefined")
      this.__setting = new App.Setting<AT, Schema>(this.apptype, this.name);

    return this.__setting;
  }

  protected abstract get getInput(): Input;

  private static falsy(value: unknown): value is Null<undefined> {
    const v = value ?? false,
    bv = Boolean(v);

    return !bv || (typeof v === "string" ? Number(v) === 0 : Array.isArray(v) ? v.join("").length < 1 : false);
  }

  public run() {
    try {
      return this.output(this.runtime());
    }
    catch (e) { throw App.error(new Error(`${this.name}: run`, { cause: e })); }
  }

  protected read(
    fileE?: boolean | Null<string>,
    extE?: boolean | Null<string>,
    E?: boolean,
  ) {
    const [file, ext, stringfully] = typeof fileE === "boolean"
      ? [null, null, fileE] as const
      : typeof extE === "boolean"
        ? [fileE, null, extE] as const
        : [fileE, extE, E] as const;

    return this.storage(file, ext).read(stringfully);
  }

  protected readful(file?: string, ext?: string) {
    return this.storage(file, ext).readful();
  }

  protected data<Data>(
    fileE?: boolean | Null<string>,
    extE?: boolean | Null<string>,
    E?: boolean,
  ): Null<Data> {
    const [file, ext, stringfully] = typeof fileE === "boolean"
      ? [null, null, fileE] as const
      : typeof extE === "boolean"
        ? [fileE, null, extE] as const
        : [fileE, extE, E] as const;

    return this.storage(file, ext).data<Data>(stringfully);
  }

  protected write(
    data: unknown,
    file?: Null<string>,
    ext?: Null<string>,
    overwrite?:
      | "line"
      | "append"
      | boolean,
  ) {
    this.storage(file, ext).write(data, overwrite);
  }

  protected load(handle: string) {
    return this.key(handle).load();
  }

  protected roll(handle: string) {
    this.key(handle).roll();
  }

  protected storage(file?: Null<string>, ext?: Null<string>) {
    const cacheId = [file ?? "", ext ?? ""]
      .join(":"),
    cache = this._storage[cacheId] ?? null;

    if (cache !== null)
      return cache;
    else {
      const { apptype, name } = this,
      app = name,
      newStorage = new App.Storage<AT>(
        apptype,
        app,
        file,
        ext,
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

  protected stringful(
    string: string,
    error = "",
  ) {
    if (string.length > 0)
      return string as stringful;
    else
      throw new TypeError("Not stringful", { cause: error });
  }

  protected stringfuls(array: string[], error = "") {
    if (array.every((i): i is stringful => i.length > 0))
      return array;
    else
      throw new TypeError("Not stringful array", { cause: { array, error } });
  }

  protected guid64() {
    const buffer: Octad<hex[]> = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ],
    CTOH = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
    } as const,
    hexes = [...UUID.string().replace("-", "")].map(c => typeof CTOH[c as keyof typeof CTOH] === "undefined" ? Number(c) as decimal : CTOH[c as Exclude<hexchar, digit>]) satisfies hex[] as unknown as Tuple<hex, 32>;

    hexes.forEach((h, i) => {
      buffer[Math.floor(i / 4) as octal].push(h);
    });

    return String.fromCharCode(...(buffer satisfies Octad<hex[]> as unknown as Octad<Quad<hex>>)
      .map(q => q.reduce((q: number, qi) => q + qi, 0))
      .map(c => c + 43)
      .map(c => c > 43 ? c + 3 : c)
      .map(c => c > 57 ? c + 7 : c)
      .map(c => c > 90 ? c + 6 : c));
  }

  protected url(string: string) {
    const matcher = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/u,
    _parts = matcher.exec(string) ?? [],
    parts = (_parts[2] ?? null) !== null ? _parts : matcher.exec(`https://${string}`) ?? [];

    return {
      scheme: parts[2] ?? "",
      host: parts[4] ?? "",
      path: parts[5] ?? "",
      query: parts[7] ?? "",
      fragment: parts[9] ?? "",
    };
  }

  private truthy(value: Input): value is NonNullable<Input> {
    return !App.falsy(value);
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
export type { App };
