import File from "../../lib/file";

export default abstract class IApp<
  Input = never,
  Output = void,
  Setting = never,
> {
  protected readonly app;
  private readonly cache: Table<File<"Storage">> = {};

  constructor(
    protected readonly contextual: boolean,
  ) {
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
          [
            this.app,
            "json",
          ].join("."),
        ).readful(),
      ) as Setting;
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

    try {
      const trace: Arrayful<string | Error> = [cast(error)];

      while (
        typeof trace[0] !== "string"
        && "cause" in trace[0]
      )
        trace.unshift(
          cast(
            trace[0].cause,
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
          (systemError: unknown) => {
            console.error(systemError);

            throw new EvalError(
              "Failed to schedule notification",
              { cause: systemError },
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
    catch (crash) {
      console.error(crash);

      throw new EvalError(
        "Error handler crash",
        { cause: crash },
      );
    }
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

  protected read(
    ...filename: Parameters<IApp["storage"]>
  ) {
    return this
      .storage(...filename)
      .read();
  }

  protected readful(
    ...filename: Parameters<IApp["storage"]>
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
      ...Parameters<IApp["storage"]>,
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
    ...filename: Parameters<IApp["storage"]>
  ) {
    this
      .storage(...filename)
      .delete();
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
        "Empty, unstringful array",
        { cause },
      );
    else if (
      !strings.every(
        (string): string is stringful => string !== "",
      )
    )
      throw new TypeError(
        "Unstringful array",
        { cause },
      );

    return strings as unknown as (
      A extends readonly [string, ...string[]]
        ? {
            readonly [K in keyof A]: typeof strings[number];
          }
        : Arrayful<typeof strings[number], true>
    );
  }

  protected char(
    string = "",
    cause = "",
  ) {
    if (string.length !== 1)
      throw new TypeError(
        "Not a char",
        { cause },
      );

    return string as stringful;
  }

  protected chars<A extends readonly string[]>(
    strings: A,
    cause = "",
  ) {
    if (strings.length === 0)
      throw new RangeError(
        "Empty, char-less array",
        { cause },
      );
    else if (
      !strings.every(
        (string): string is char => string.length === 1,
      )
    )
      throw new TypeError(
        "Uncharful array",
        { cause },
      );

    return strings as unknown as (
      A extends readonly [string, ...string[]]
        ? {
            readonly [K in keyof A]: typeof strings[number];
          }
        : Arrayful<typeof strings[number], true>
    );
  }

  protected date(
    {
      date = new Date,
      format = "MMMM d, y h:mm:ss a",
    } = {},
  ) {
    (this.dateFormatter ??= new DateFormatter)
      .dateFormat = format;

    return this.dateFormatter.string(date);
  }

  private storage(
    {
      name = this.app,
      extension = "txt",
    } = {},
  ) {
    const file = extension === ""
      ? name
      : [name, extension].join(".");

    return this.cache[file] ??= new File(
      "Storage",
      file,
      this.app,
      true,
    );
  }

  protected abstract getInput(): Undef<Input>;
  protected abstract runtime(): Output;
  protected abstract output(runtime: Output): Output;
  protected abstract local(runtime: Output): void;
  private config?: Setting;
  private sideload?: Input;
  private dateFormatter?: DateFormatter;
}
