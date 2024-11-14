import File from "./file";

abstract class App<
  Input,
  Output,
  Schema,
> {
  protected readonly app: stringful;
  private readonly cache: Record<string, File<"Storage", true>> = {};

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

  protected static date({
    date = "MMMM d, y",
    time = "h:mm:ss a",
    separator = " ",
    when = new Date,
  } = {}) {
    const d = new DateFormatter;

    d.dateFormat = `${date}${separator}${time}`;

    return d.string(when);
  }

  public run() {
    try {
      return this.output(this.runtime());
    }
    catch (error) {
      throw this.error(error);
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
    overwrite = true,
    file,
  ]: [...Parameters<File<"Storage", true>["write"]>, ...Parameters<App<Input, Output, Schema>["storage"]>]) {
    this.storage(file).write(data, overwrite);
  }

  protected delete(...[file]: Parameters<App<Input, Output, Schema>["storage"]>) {
    this.storage(file).delete();
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

  private error(error: unknown) {
    function cast(e: unknown) {
      return typeof e === "object" && e !== null && "message" in e
        ? e as Error
        : JSON.stringify(e);
    }

    const errors = [cast(error)] as Arrayful<string | Error>;

    while (typeof errors[0] !== "string" && "cause" in errors[0])
      errors.unshift(cast(errors[0].cause));

    const n = new Notification,
    [title, body] = (([head, ...rest]) => [`${this.app}: ${head}`, rest.join("\n")])(errors.map(e => typeof e === "string" ? e : e.message) as Arrayful);

    n.title = title;
    n.body = body;
    n.schedule().catch((e: unknown) => console.error(e));
    console.error(`${title}\n${body}`);

    return new Error(title, { cause: body });
  }

  protected abstract getInput(): undefined | Input;
  protected abstract runtime(): Output;
  protected abstract output(runtime: Output): Output;
  private config?: Schema;
}

export default App;
