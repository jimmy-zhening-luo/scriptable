import Setting from "./filetypes/setting";
import Storage from "./filetypes/storage";
import error from "./error";
import url from "./objects/url";

abstract class App<
  Input,
  Output,
  Schema,
> {
  protected readonly app: stringful;
  private readonly cache = new Map<string, Storage>;

  constructor(protected synthetic?: Input) {
    if (this.constructor.name.length < 1)
      throw new EvalError("App has no name");

    this.app = this.constructor.name as stringful;
  }

  protected get setting(): Schema extends Schema ? Schema : never {
    return this.memo("setting", new Setting<Schema>(this.app).parse);
  }

  protected get input() {
    return this.synthetic ?? this.getInput();
  }

  protected get inputful() {
    const { input } = this;

    if (typeof input === "undefined" || input === null)
      throw new TypeError("Null input");

    return input;
  }

  protected get inputString() {
    const { input } = this,
    string = input ?? "";

    if (typeof string !== "string" && typeof string !== "number")
      throw new TypeError("Non-string input", { cause: input });

    return String(string);
  }

  protected get inputStringful() {
    return App.stringful(this.inputString, "input");
  }

  protected static stringful(string = "", cause = "") {
    if (string.length < 1)
      throw new TypeError(`Unstringful: ${cause}`);

    return string as stringful;
  }

  protected static stringfuls<T extends readonly string[]>(array: T, cause = "") {
    if (array.length < 1 || !array.every((i): i is stringful => i.length > 0))
      throw new TypeError(`Unstringful array: ${cause}`);

    return array as unknown as (
      T extends readonly [string, ...string[]]
        ? { [K in keyof T]: stringful; }
        : Arrayful<stringful>
    );
  }

  protected static url(string: string) {
    return url(string);
  }

  protected static date(date?: Date) {
    return App.datetime("EEEE, MMMM d, y", date);
  }

  protected static time(date?: Date) {
    return App.datetime("yyMMddHHmmssZ", date);
  }

  protected static datetime(format: string, date = new Date) {
    const d = new DateFormatter;

    d.dateFormat = format;

    return d.string(date);
  }

  public run() {
    try {
      return this.output(this.runtime());
    }
    catch (e) {
      throw error(this.app, e);
    }
    finally {
      Script.complete();
    }
  }

  protected subsetting<Subschema>(subpath: string) {
    if (subpath.length < 1)
      throw new ReferenceError("Empty subsetting path");

    return new Setting<Subschema extends Subschema ? Subschema : never>(`${this.app}/${subpath}` as stringful).parse;
  }

  protected read(...file: Parameters<App<Input, Output, Schema>["storage"]>) {
    return this.storage(...file).read();
  }

  protected readful(...file: Parameters<App<Input, Output, Schema>["storage"]>) {
    return this.storage(...file).readful();
  }

  protected data<Data>(...file: Parameters<App<Input, Output, Schema>["storage"]>): Null<Data> {
    return this.storage(...file).data<Data>();
  }

  protected write(
    data: Parameters<Storage["write"]>[0],
    overwrite?: Parameters<Storage["write"]>[1],
    file?: Parameters<App<Input, Output, Schema>["storage"]>[0],
  ) {
    this.storage(file).write(data, overwrite);
  }

  private memo<T>(property: string, value: T) {
    Object.defineProperty(this, property, { value, enumerable: true });

    return value;
  }

  private storage(file: string | { ext: string; name?: string } = this.app) {
    const { name = this.app, ext = "txt" } = typeof file === "object"
      ? file
      : { name: file },
    id = `${name}:${ext}`;

    return (
      this.cache.has(id)
        ? this.cache
        : this.cache.set(
          id,
          new Storage(this.app, name, ext),
        )
    )
      .get(id) as Storage;
  }

  protected abstract getInput(): Input;
  protected abstract runtime(): Output;
  protected abstract output(runtime: ReturnType<App<Input, Output, Schema>["runtime"]>): ReturnType<App<Input, Output, Schema>["runtime"]>;
}

export default App;
