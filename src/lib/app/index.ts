import File from "./file";

export default abstract class App<
  Input,
  Output,
  Schema,
> {
  protected readonly app: stringful;
  private readonly cache: Record<string, File<"Storage", true>> = {};

  constructor() {
    const { name = "" } = this.constructor;

    if (name === "")
      throw new TypeError("App constructor has no name");

    this.app = name as stringful;
  }

  protected get setting(): Schema extends Schema ? Schema : never {
    return this.config ??= ((config: unknown): Schema => {
      if (typeof config !== "object" || config === null)
        throw new TypeError("Setting file is not JSON");

      return config satisfies object as Schema;
    })(JSON.parse(new File<"Setting">("Setting", false, { name: `${this.app}.json` as stringful }).readful()) ?? null);
  }

  protected get input() {
    return this.getInput() ?? this.synthetic ?? undefined;
  }

  protected get inputful() {
    const { input = null } = this;

    if (input === null)
      throw new TypeError("Null app input");

    return input;
  }

  protected get inputString() {
    const { input = "" } = this;

    if (typeof input !== "string" && typeof input !== "number")
      throw new TypeError("Non-string app input", { cause: input });

    return String(input);
  }

  protected get inputStringful() {
    return this.stringful(this.inputString, "input");
  }

  private static error(app: stringful, error: unknown) {
    function cast(e: unknown) {
      return typeof e === "object" && e !== null && "message" in e
        ? e as Error
        : JSON.stringify(e);
    }

    const errors: Arrayful<string | Error> = [cast(error)];

    while (typeof errors[0] !== "string" && "cause" in errors[0])
      errors.unshift(cast(errors[0].cause));

    const n = new Notification,
    [title, body] = (([head, ...rest]) => [`${app}: ${head}`, rest.join("\n")])(errors.map(e => typeof e === "string" ? e : e.message) as Arrayful);

    n.title = title;
    n.body = body;
    n.sound = "failure";
    n.schedule().catch((e: unknown) => console.error(e));
    console.error(`${title}\n${body}`);

    return new Error(title, { cause: body });
  }

  public run(synthetic?: Input) {
    try {
      typeof synthetic === "undefined" || (this.synthetic = synthetic);

      return this.output(this.runtime());
    }
    catch (error) {
      throw App.error(this.app, error);
    }
    finally {
      Script.complete();
    }
  }

  protected char(string = "", cause = "") {
    if (string.length !== 1)
      throw new TypeError(`Non-char: ${cause}`);

    return string as char;
  }

  protected stringful(string = "", cause = "") {
    if (string === "")
      throw new TypeError(`Unstringful: ${cause}`);

    return string as stringful;
  }

  protected stringfuls<T extends readonly string[]>(array: T, cause = "") {
    if (array.length === 0 || !array.every((i): i is stringful => i !== ""))
      throw new TypeError(`Unstringful (or empty) array: ${cause}`);

    return array as unknown as (
      T extends readonly [string, ...string[]]
        ? { [K in keyof T]: stringful; }
        : Arrayful<stringful>
    );
  }

  protected subsetting<Subschema>(subpath: string): Subschema extends Subschema ? Subschema : never {
    return ((config: unknown): Subschema => {
      if (typeof config !== "object" || config === null)
        throw new TypeError("Setting file is not JSON");

      return config satisfies object as Subschema;
    })(JSON.parse(new File<"Setting">("Setting", false, { name: `${this.app}/${this.stringful(subpath, "subsetting")}.json` as stringful }).readful()) as unknown);
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

  private storage(file: string | Field<never, "name" | "ext"> = {}) {
    const { app } = this,
    {
      name: basename = app,
      ext = "txt",
    } = typeof file === "object"
      ? file
      : { name: file };

    if (basename === "" || ext === "")
      throw new TypeError("Empty storage filename");

    const name = `${basename}.${ext}`;

    return this.cache[name] ??= new File("Storage", true, { name, folder: app });
  }

  protected abstract getInput(): Undef<Input>;
  protected abstract runtime(): Output;
  protected abstract output(runtime: Output): Output;
  private config?: Schema;
  private synthetic?: Input;
}
