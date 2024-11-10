import Setting from "./files/setting";
import Storage from "./files/storage";
import error from "./error";
import url from "./objects/url";

abstract class App<
  Input,
  Output,
  Schema,
> {
  protected readonly app: stringful;
  private readonly cache: Record<string, Storage> = {};

  constructor(protected synthetic?: Input) {
    const { name } = this.constructor;

    if (name === "")
      throw new EvalError("App has no name");

    this.app = name as stringful;
  }

  protected get setting(): Schema extends Schema ? Schema : never {
    return this.config ??= new Setting<Schema>(`${this.app}.json` as stringful).parse;
  }

  protected get input() {
    return this.synthetic ?? this.getInput() ?? undefined;
  }

  protected get inputful() {
    const { input = null } = this;

    if (input === null)
      throw new TypeError("Null input");

    return input;
  }

  protected get inputString() {
    const { input = "" } = this;

    if (typeof input !== "string" && typeof input !== "number")
      throw new TypeError("Non-string input", { cause: input });

    return String(input);
  }

  protected get inputStringful() {
    return App.stringful(this.inputString, "input");
  }

  protected static stringful(string = "", cause = "") {
    if (string === "")
      throw new TypeError(`Unstringful: ${cause}`);

    return string as stringful;
  }

  protected static stringfuls<T extends readonly string[]>(array: T, cause = "") {
    if (array.length < 1 || !array.every((i): i is stringful => i !== ""))
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
    return new Setting<Subschema extends Subschema ? Subschema : never>(`${this.app}/${App.stringful(subpath, "subsetting")}.json` as stringful).parse;
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

  private storage(file: string | { name?: string; ext?: string } = {}) {
    const { app } = this,
    { name = app, ext = "txt" } = typeof file === "object"
      ? file
      : { name: file },
    filename = `${name}.${ext}`;

    return this.cache[filename] ??= new Storage(filename, app);
  }

  protected abstract getInput(): undefined | Input;
  protected abstract runtime(): Output;
  protected abstract output(runtime: ReturnType<App<Input, Output, Schema>["runtime"]>): ReturnType<App<Input, Output, Schema>["runtime"]>;
  private config?: Schema;
}

export default App;
