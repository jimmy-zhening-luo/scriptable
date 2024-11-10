import File from "./file";
import error from "./error";
import url from "./objects/url";

type Storage = File<"Storage", true>;

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
    return this.config ??= ((config: unknown): Schema => {
      if (typeof config !== "object" || config === null)
        throw new TypeError("Setting file is not JSON");

      return config satisfies object as Schema;
    })(JSON.parse(new File<"Setting", false>("Setting", false, { name: `${this.app}.json` as stringful }).readful()) ?? null);
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

  protected subsetting<Subschema>(subpath: string): Subschema extends Subschema ? Subschema : never {
    return ((config: unknown): Subschema => {
      if (typeof config !== "object" || config === null)
        throw new TypeError("Setting file is not JSON");

      return config satisfies object as Subschema;
    })(JSON.parse(new File<"Setting", false>("Setting", false, { name: `${this.app}/${App.stringful(subpath, "subsetting")}.json` as stringful }).readful()) ?? null);
  }

  protected read(...[file]: Parameters<App<Input, Output, Schema>["storage"]>) {
    return this.storage(file).read();
  }

  protected readful(...[file]: Parameters<App<Input, Output, Schema>["storage"]>) {
    return this.storage(file).readful();
  }

  protected write(...[
    data,
    overwrite,
    file,
  ]: [...Parameters<Storage["write"]>, ...Parameters<App<Input, Output, Schema>["storage"]>]) {
    this.storage(file).write(data, overwrite);
  }

  private storage(file:
    | string
    | {
      name?: string;
      ext?: string;
    } = {}) {
    const {
      name: basename = this.app,
      ext = "txt",
    } = typeof file === "object"
      ? file
      : { name: file };

    if (basename === "" || ext === "")
      throw new TypeError("Empty filename");

    const name = `${basename}.${ext}`;

    return this.cache[name] ??= new File("Storage", true, { name, folder: this.app });
  }

  protected abstract getInput(): undefined | Input;
  protected abstract runtime(): Output;
  protected abstract output(runtime: Output): Output;
  private config?: Schema;
}

export default App;
