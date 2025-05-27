import File from "./file";

export default abstract class IApp<
  Input,
  Output,
  Schema,
> {
  protected readonly app;
  private readonly cache: Record<string, File<"Storage">> = {};

  constructor() {
    try {
      this.app = this.stringful(
        this.constructor.name,
        "Anonymous app instance",
      );
    }
    catch (e) {
      throw new Error(
        "App construction failed",
        { cause: e },
      );
    }
  }

  protected get input() {
    try {
      return this.getInput()
        ?? this.synthetic
        ?? undefined;
    }
    catch (e) {
      throw new ReferenceError(
        "Failed to get app input",
        { cause: e },
      );
    }
  }

  protected get inputful() {
    const { input } = this;

    if (typeof input === "undefined")
      throw new RangeError("Undefined app input");

    return input;
  }

  protected get inputString() {
    const { input = "" } = this;

    if (typeof input !== "string" && typeof input !== "number")
      throw new TypeError(
        "Non-string app input",
        { cause: input },
      );

    return String(input);
  }

  protected get inputStringful() {
    return this.stringful(
      this.inputString,
      "Unstringful app input",
    );
  }

  protected get setting() {
    try {
      return this.config ??= JSON.parse(
        new File(
          "Setting",
          `${this.app}.json`,
        ).readful(),
      ) as Schema;
    }
    catch (e) {
      throw new ReferenceError(
        "Failed to get app settings",
        { cause: e },
      );
    }
  }

  private static error(
    app: stringful,
    error: unknown,
  ) {
    function cast(e: unknown) {
      return typeof e === "object"
        && e !== null
        && "message" in e
        ? e as Error
        : JSON.stringify(e);
    }

    const errors: Arrayful<string | Error> = [cast(error)];

    while (
      typeof errors[0] !== "string"
      && "cause" in errors[0]
    )
      errors.unshift(
        cast(errors[0].cause),
      );

    const {
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
    ),
    n = new Notification;

    n.title = message;
    n.body = cause;
    n.sound = "failure";
    n
      .schedule()
      .catch((error: unknown) => console.error(error));
    console.error(
      [
        message,
        cause,
      ].join("\n"),
    );

    return new Error(
      message,
      { cause },
    );
  }

  public run(synthetic?: Input) {
    try {
      typeof synthetic === "undefined" || (this.synthetic = synthetic);

      return this.output(
        this.runtime(),
      );
    }
    catch (error) {
      throw IApp.error(
        this.app,
        error,
      );
    }
    finally {
      Script.complete();
    }
  }

  protected char(
    string = "",
    cause = "",
  ) {
    if (string.length !== 1)
      throw new TypeError(
        "Non-char",
        { cause },
      );

    return string as char;
  }

  protected chars<A extends readonly string[]>(
    strings: A,
    cause = "",
  ) {
    if (strings.length === 0)
      throw new RangeError(
        "Array has no chars",
        { cause },
      );
    else if (!strings.every((string): string is char => string.length === 1))
      throw new TypeError(
        "Array contains non-char",
        {
          cause: {
            cause,
            strings,
          },
        },
      );

    return strings as unknown as (
      A extends readonly [string, ...string[]]
        ? { [K in keyof A]: NonNullable<typeof strings[number]>; }
        : Arrayful<NonNullable<typeof strings[number]>>
    );
  }

  protected stringful(
    string = "",
    cause = "",
  ) {
    if (string === "")
      throw new TypeError(
        "Unstringful",
        { cause },
      );

    return string as stringful;
  }

  protected stringfuls<A extends readonly string[]>(
    strings: A,
    cause = "",
  ) {
    if (strings.length === 0)
      throw new RangeError(
        "Array has no stringfuls",
        { cause },
      );
    else if (!strings.every((string): string is stringful => string !== ""))
      throw new TypeError(
        "Array contains unstringful",
        {
          cause: {
            cause,
            strings,
          },
        },
      );

    return strings as unknown as (
      A extends readonly [string, ...string[]]
        ? { [K in keyof A]: NonNullable<typeof strings[number]>; }
        : Arrayful<NonNullable<typeof strings[number]>>
    );
  }

  protected read(
    ...filename: Parameters<IApp<Input, Output, Schema>["storage"]>
  ) {
    return this
      .storage(...filename)
      .read();
  }

  protected readful(
    ...filename: Parameters<IApp<Input, Output, Schema>["storage"]>
  ) {
    return this
      .storage(...filename)
      .readful();
  }

  protected write(...[
    data,
    overwrite = true,
    ...filename
  ]: [
    ...Parameters<File<"Storage">["write"]>,
    ...Parameters<IApp<Input, Output, Schema>["storage"]>,
  ]) {
    this
      .storage(...filename)
      .write(
        data,
        overwrite,
      );
  }

  protected delete(
    ...filename: Parameters<IApp<Input, Output, Schema>["storage"]>
  ) {
    this
      .storage(...filename)
      .delete();
  }

  private storage(
    name = "",
    extension = "",
  ) {
    const filename = [
      name === ""
        ? this.app
        : name,
      extension === ""
        ? "txt"
        : extension,
    ].join(".");

    return this.cache[filename] ??= new File(
      "Storage",
      filename,
      this.app,
      true,
    );
  }

  protected abstract getInput(): Undef<Input>;
  protected abstract runtime(): Output;
  protected abstract output(runtime: Output): Output;
  private config?: Schema;
  private synthetic?: Input;
}
