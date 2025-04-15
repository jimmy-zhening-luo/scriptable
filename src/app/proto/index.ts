import File from "./file";

export default abstract class App<
  Input,
  Output,
  Schema,
> {
  protected readonly app;
  private readonly cache: Record<string, File<"Storage">> = {};

  constructor() {
    try {
      const { name = "" } = this.constructor;

      if (name === "")
        throw new EvalError("Nameless app constructor");

      this.app = name as stringful;
    }
    catch (e) {
      throw new Error("Failed to instantiate app", { cause: e });
    }
  }

  protected get setting() {
    try {
      return this.config ??= ((config: unknown): Schema => {
        if (typeof config !== "object" || config === null)
          throw new SyntaxError("Non-JSON setting file");

        return config as typeof config & Schema;
      })(
        JSON.parse(new File<"Setting">(
          "Setting",
          {
            name: `${this.app}.json`,
          },
        ).readful()),
      );
    }
    catch (e) {
      throw new Error("Failed to read setting", { cause: e });
    }
  }

  protected get input() {
    try {
      return this.getInput() ?? this.synthetic ?? undefined;
    }
    catch (e) {
      throw new Error("Failed to get app input", { cause: e });
    }
  }

  protected get inputful() {
    const { input } = this;

    if (typeof input === "undefined")
      throw new TypeError("Empty app input");

    return input;
  }

  protected get inputString() {
    const { input = "" } = this;

    if (typeof input !== "string" && typeof input !== "number")
      throw new TypeError("Non-string app input", { cause: input });

    return String(input);
  }

  protected get inputStringful() {
    return this.stringful(this.inputString, "Unstringful input");
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
    {
      message,
      cause,
    } = (([top = "", ...stack]) => {
      return {
        message: `${app}: ${top}`,
        cause: stack.join("\n"),
      };
    })(
      errors.map(
        error => typeof error === "string"
          ? error
          : error.message,
      ),
    );

    n.title = message;
    n.body = cause;
    n.sound = "failure";
    n.schedule().catch((error: unknown) => console.error(error));
    console.error(`${message}\n${cause}`);

    return new Error(message, { cause });
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
      throw new TypeError("Non-char", { cause });

    return string as char;
  }

  protected chars<A extends readonly string[]>(strings: A, cause = "") {
    if (strings.length === 0)
      throw new RangeError("No chars", { cause });
    else if (!strings.every((string): string is char => string.length === 1))
      throw new TypeError("Array has non-chars", { cause: { cause, strings } });

    return strings as unknown as (
      A extends readonly [string, ...string[]]
        ? { [K in keyof A]: NonNullable<typeof strings[number]>; }
        : Arrayful<NonNullable<typeof strings[number]>>
    );
  }

  protected stringful(string = "", cause = "") {
    if (string === "")
      throw new TypeError("Unstringful", { cause });

    return string as stringful;
  }

  protected stringfuls<A extends readonly string[]>(strings: A, cause = "") {
    if (strings.length === 0)
      throw new RangeError("No stringfuls", { cause });
    else if (!strings.every((string): string is stringful => string !== ""))
      throw new TypeError("Array has unstringfuls", { cause: { cause, strings } });

    return strings as unknown as (
      A extends readonly [string, ...string[]]
        ? { [K in keyof A]: NonNullable<typeof strings[number]>; }
        : Arrayful<NonNullable<typeof strings[number]>>
    );
  }

  protected read(...[filename]: Parameters<App<Input, Output, Schema>["storage"]>) {
    return this.storage(filename).read();
  }

  protected readful(...[filename]: Parameters<App<Input, Output, Schema>["storage"]>) {
    return this.storage(filename).readful();
  }

  protected write(...[
    data,
    overwrite = true,
    file,
  ]: [...Parameters<File<"Storage">["write"]>, ...Parameters<App<Input, Output, Schema>["storage"]>]) {
    this.storage(file).write(data, overwrite);
  }

  protected delete(...[filename]: Parameters<App<Input, Output, Schema>["storage"]>) {
    this.storage(filename).delete();
  }

  private storage(filename: string | Field<never, "name" | "ext"> = {}) {
    const { app } = this,
    {
      name: base = app,
      ext = "txt",
    } = typeof filename === "object"
      ? filename
      : { name: filename };

    if (base === "")
      throw new SyntaxError("Empty storage filename");
    else if (ext === "")
      throw new SyntaxError("Empty storage file extension");

    const name = `${base}.${ext}`;

    return this.cache[name] ??= new File("Storage", { name, folder: app }, true);
  }

  protected abstract getInput(): Undef<Input>;
  protected abstract runtime(): Output;
  protected abstract output(runtime: Output): Output;
  private config?: Schema;
  private synthetic?: Input;
}
