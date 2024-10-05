import type { Key } from "./filetypes/Key";
import type { Setting } from "./filetypes/Setting";
import type { Storage } from "./filetypes/Storage";
import type { error } from "./error/index";

abstract class App<
  T extends string,
  Input,
  Output,
  Schema,
> {
  private readonly cache: {
    storage: Record<string, Storage<T>>;
    keys: Record<string, Key<T>>;
  } = { storage: {}, keys: {} };

  protected abstract type: literalful<T>;

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

  protected get name() {
    const name = this.stringful(this.constructor.name, "App instance has no name");

    Object.defineProperty(this, "name", { value: name, enumerable: true });

    return name;
  }

  protected get setting(): Schema extends Schema ? Schema : never {
    const { type, name } = this,
    setting = new App.Setting<T, Schema>(type, name).parse;

    Object.defineProperty(this, "setting", { value: setting, enumerable: true });

    return setting;
  }

  protected get input() {
    const input = this.getInput;

    Object.defineProperty(this, "input", { value: input, enumerable: true });

    return input;
  }

  protected get inputful() {
    try {
      const { input } = this;

      if (!this.truthy(input))
        throw new TypeError("Null input", { cause: { input, type: typeof input } });
      else {
        Object.defineProperty(this, "inputful", { value: input, enumerable: true });

        return input;
      }
    }
    catch (e) {
      throw new TypeError(`App: inputful`, { cause: e });
    }
  }

  protected get inputString() {
    try {
      const { input } = this,
      truthy = this.truthy(input) ? input : "";

      if (typeof truthy !== "string" && typeof truthy !== "number")
        throw new TypeError("Non-stringable input", { cause: { input, type: Array.isArray(input) ? "array" : typeof input } });
      else {
        const inputString = String(truthy);

        Object.defineProperty(this, "inputString", { value: inputString, enumerable: true });

        return inputString;
      }
    }
    catch (e) {
      throw new TypeError(`App: inputString`, { cause: e });
    }
  }

  protected get inputStringful() {
    const inputStringful = this.stringful(this.inputString, "App: inputStringful");

    Object.defineProperty(this, "inputStringful", { value: inputStringful, enumerable: true });

    return inputStringful;
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
    catch (e) {
      throw App.error(new Error(`${this.name}: run`, { cause: e }));
    }
  }

  protected subsetting<Subschema>(subpath: string): Subschema extends Subschema ? Subschema : never {
    const { type, name } = this;

    if (subpath.length > 0)
      return new App.Setting<T, Subschema>(type, `${name satisfies stringful}/${subpath as stringful}` as stringful).parse;
    else
      throw new TypeError("Empty subsetting subpath");
  }

  protected read(file?: Null<string>, ext?: string) {
    return this.storage(file, ext).read();
  }

  protected readful(file?: Null<string>, ext?: string) {
    return this.storage(file, ext).readful();
  }

  protected data<Data>(file?: Null<string>, ext?: string): Null<Data> {
    return this.storage(file, ext).data<Data>();
  }

  protected write(
    data: unknown,
    file?: Null<string>,
    ext?: string,
    overwrite?:
      | "line"
      | "append"
      | boolean,
  ) {
    this.storage(file, ext).write(data, overwrite);
  }

  protected load(handle: string, roll?: boolean) {
    return this.key(handle).load(roll);
  }

  protected purge(handle: string) {
    this.key(handle).purge();
  }

  protected stringful(string = "", cause = "") {
    if (string.length > 0)
      return string as stringful;
    else
      throw new TypeError("Unstringful", { cause });
  }

  protected stringfuls<T extends readonly string[]>(array: T, cause = "") {
    if (array.length > 0 && array.every((i): i is stringful => i.length > 0))
      return array as unknown as (
        T extends readonly [string, ...string[]]
          ? { [K in keyof T]: stringful; }
          : Arrayful<stringful>
      );
    else
      throw new TypeError("Unstringful array", { cause });
  }

  protected time(date?: Date) {
    return this.print("yyyyMMddhhmmssZ", date);
  }

  protected date(date?: Date) {
    return this.print("EEEE, MMMM d, y", date);
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
      buffer[(i % 8) as octal].push(h);
    });

    return String.fromCharCode(...(buffer satisfies Octad<hex[]> as unknown as Octad<Quad<hex>>)
      .map(q => q.reduce((q: number, qi) => q + qi, 0))
      .map(c => c + 43)
      .map(c => c > 43 ? c + 3 : c)
      .map(c => c > 57 ? c + 7 : c)
      .map(c => c > 90 ? c + 6 : c));
  }

  protected url(string: string) {
    function normalize(part = "", lower = false) {
      return lower ? part.toLowerCase() : part;
    }

    const attempt = this.parseURL(string),
    retry = attempt === null
      ? this.parseURL(string, true)
      : null;

    if (attempt === null && retry === null)
      throw new SyntaxError("Unparseable to URL", { cause: string });
    else {
      const parts = (attempt === null ? retry : attempt) as Field<
        | "scheme"
        | "host"
        | "path"
        | "query"
        | "fragment"
      >,
      {
        scheme,
        host,
        path,
        query,
        fragment,
      } = parts;

      return {
        scheme: normalize(scheme, true),
        host: normalize(host, true),
        path: normalize(path),
        query: normalize(query),
        fragment: normalize(fragment),
      };
    }
  }

  private storage(file?: Null<string>, ext?: string) {
    const cacheId = [file ?? "", ext ?? ""]
      .join(":"),
    cache = this.cache.storage[cacheId] ?? null;

    if (cache !== null)
      return cache;
    else {
      const { type, name } = this,
      app = name,
      newStorage = new App.Storage<T>(
        type,
        app,
        file,
        ext,
      );

      this.cache.storage[cacheId] = newStorage;

      return newStorage;
    }
  }

  private key(handle: string) {
    const cache = this.cache.keys[handle] ?? null;

    if (cache !== null)
      return cache;
    else {
      const { type, name } = this,
      newKey = new App.Key<T>(
        type,
        name,
        handle,
      );

      this.cache.keys[handle] = newKey;

      return newKey;
    }
  }

  private truthy(value: Input): value is NonNullable<Input> {
    return !App.falsy(value);
  }

  private print(
    format: string,
    date = new Date,
    locale = "en",
  ) {
    const d = new DateFormatter;

    d.dateFormat = format;
    d.locale = locale;

    return d.string(date);
  }

  private parseURL(string: string, tryHttp = false) {
    function ok(part: undefined | string): part is stringful {
      return typeof part !== "undefined" && part.length > 1;
    }

    const regex = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/u,
    match = regex.exec(`${tryHttp ? "https" : ""}${string}`),
    parts = match === null
      ? null
      : {
          scheme: match[2],
          host: match[4],
          path: match[5],
          query: match[7],
          fragment: match[9],
        } as const;

    return parts !== null && ok(parts.scheme) && (!tryHttp || ok(parts.host) || ok(parts.path))
      ? parts
      : null;
  }

  protected abstract runtime(): Output;
  protected abstract output(runtime: ReturnType<App<T, Input, Output, Schema>["runtime"]>): ReturnType<App<T, Input, Output, Schema>["runtime"]>;
}

module.exports = App;
export type { App };
