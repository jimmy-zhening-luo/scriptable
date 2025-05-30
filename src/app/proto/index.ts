import File from "./file";

export default abstract class IApp<
  Input,
  Output,
  Schema,
> {
  protected readonly app;
  private readonly cache: Table<File<"Storage">> = {};
  protected readonly abstract contextual: boolean;

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

  protected get context() {
    try {
      return this.contextual
        ? "production" as const
        : config.runsInApp
          ? "local" as const
          : "unknown" as const;
    }
    catch (e) {
      throw new Error(
        "Failed to get app execution context",
        { cause: e },
      );
    }
  }

  protected get input() {
    try {
      return this.getInput()
        ?? this.sideload
        ?? undefined;
    }
    catch (e) {
      throw new ReferenceError(
        "Failed to get app input",
        { cause: e },
      );
    }
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

  private static Error(
    app: stringful,
    error: unknown,
  ) {
    function cast(error: unknown) {
      return typeof error === "object"
        && error !== null
        && "message" in error
        && typeof error.message === "string"
        ? error as Error
        : JSON.stringify(error);
    }

    const trace: Arrayful<string | Error> = [cast(error)];

    while (
      typeof trace[0] !== "string"
      && "cause" in trace[0]
    )
      trace.unshift(
        cast(
          trace[0]
            .cause,
        ),
      );

    const [failure = "", ...causes] = (
      typeof trace[0] === "string"
      && typeof trace[1] !== "undefined"
        ? [
            trace[1],
            trace[0],
            ...trace.slice(2),
          ] as const
        : [...trace] as const
    )
      .map(
        error => typeof error === "string"
          ? error
          : error.message,
      ),
    cause = causes.join("\n"),
    notification = new Notification;

    notification.title = app;
    notification.subtitle = failure;
    notification.body = cause;
    notification.sound = "failure";
    notification
      .schedule()
      .catch(
        (fatalError: unknown) => {
          console.error(fatalError);

          throw new EvalError(
            "Failed to schedule notification",
            { cause: { fatalError } },
          );
        },
      );
    console.error(
      [
        failure,
        cause,
      ].join("\n"),
    );

    return new Error(
      failure,
      { cause },
    );
  }

  public run(sideload?: Input) {
    try {
      if (typeof sideload !== "undefined")
        this.sideload = sideload;

      const output = this.output(
        this.runtime(),
      );

      if (this.context === "local")
        this.runLocal(output);

      return output;
    }
    catch (error) {
      throw IApp.Error(this.app, error);
    }
    finally {
      Script.complete();
    }
  }

  protected runLocal(runtime: Output) {
    try {
      console.log(runtime);
      this.local(runtime);
    }
    catch (e) {
      throw new EvalError(
        "Local run failure",
        { cause: e },
      );
    }
  }

  protected char(string = "", cause = "") {
    if (string.length !== 1)
      throw new TypeError(
        "Non-char",
        { cause },
      );

    return string as char;
  }

  protected chars<A extends readonly string[]>(strings: A, cause = "") {
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

  protected stringful(string = "", cause = "") {
    if (string === "")
      throw new TypeError(
        "Unstringful",
        { cause },
      );

    return string as stringful;
  }

  protected stringfuls<A extends readonly string[]>(strings: A, cause = "") {
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

  protected date(
    {
      date = new Date,
      format = "MMMM d, y h:mm:ss a",
    } = {},
  ) {
    this.dateFormatter ??= new DateFormatter;
    this.dateFormatter.dateFormat = format;

    return this.dateFormatter.string(date);
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

  protected write(
    ...[
      data,
      overwrite = true,
      ...filename
    ]: [
      ...Parameters<File<"Storage">["write"]>,
      ...Parameters<IApp<Input, Output, Schema>["storage"]>,
    ]
  ) {
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

  private storage(name = "", extension = "") {
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
  protected abstract local(runtime: Output): void;
  private config?: Schema;
  private sideload?: Input;
  private dateFormatter?: DateFormatter;
}
