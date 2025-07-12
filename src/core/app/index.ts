import File from "../../lib/file";

export default abstract class IApp<
  Input = never,
  Output = void,
  Setting = never,
> {
  protected readonly app;
  protected readonly context: Flag<
    never,
    (
      | "production"
      | "test"
    )
  >;
  private readonly cache: Table<
    File<"EphemeralState">
  > = {};
  private readonly store: Table<
    File<"Storage">
  > = {};
  private readonly streams: Table<
    File<"Feed">
  > = {};

  constructor(
    private _input: Undef<Input>,
    production: boolean,
  ) {
    try {
      this.app = this.stringful(
        this
          .constructor
          .name,
        "Anonymous app instance",
      );
      this.context = {
        production,
        test: !production
          && config.runsInApp,
      };
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
      return this._input
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
      return this.ini ??= JSON.parse(
        new File(
          "Setting",
          this.app + ".json",
        ).readStringful(),
      ) as Setting;
    }
    catch (e) {
      throw new ReferenceError(
        "Failed to load app settings",
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
        : error === null
          || error === undefined
          || typeof error === "string"
          || typeof error === "number"
          || typeof error === "boolean"
          ? String(error)
          : JSON.stringify(error);
    }

    try {
      const trace: Arrayful<string | Error> = [cast(error)];

      while (
        typeof trace[0] !== "string"
        && "cause" in trace[0]
      )
        trace
          .unshift(
            cast(
              trace[0].cause,
            ),
          );

      const [failure = "", ...causes] = (
        typeof trace[0] === "string"
        && trace[1] !== undefined
          ? [
              trace[1],
              trace[0],
              ...trace.slice(2),
            ] as const
          : [...trace] as const
      ).map(
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
          (errorSystemNotify: unknown) => {
            console.error(errorSystemNotify);

            throw new EvalError(
              "Unable to send iOS Notification",
              { cause: errorSystemNotify },
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
      if (
        sideload !== undefined
        && this.input === undefined
      )
        this._input = sideload;

      const output = this.runtime();

      try {
        this.output(output);
      }
      catch (errorSystemOutput) {
        throw new Error(
          "Unable to output to iOS",
          { cause: errorSystemOutput },
        );
      }

      if (this.context.test)
        try {
          console.log(output);

          if (this.test !== undefined)
            this.test(output);
        }
        catch (errorAppRuntime) {
          throw new EvalError(
            "In-app runtime failure",
            { cause: errorAppRuntime },
          );
        }

      return output;
    }
    catch (error) {
      throw IApp.Error(this.app, error);
    }
    finally {
      Script.complete();
    }
  }

  protected get(
    key: string,
  ) {
    return this
      .state(
        key,
      )
      .readString();
  }

  protected set(
    key: string,
    value: string,
  ) {
    this
      .state(
        key,
      )
      .write(
        value,
        true,
      );
  }

  protected unset(
    key: string,
  ) {
    this
      .state(
        key,
      )
      .delete();
  }

  protected invalidateCache() {
    new File(
      "EphemeralState",
      "",
      this.app,
      true,
      true,
    )
      .delete();
  }

  protected read(
    ...filename: Parameters<IApp["storage"]>
  ) {
    return this
      .storage(
        ...filename,
      )
      .read();
  }

  protected readString(
    ...filename: Parameters<IApp["storage"]>
  ) {
    return this
      .storage(
        ...filename,
      )
      .readString();
  }

  protected readStringful(
    ...filename: Parameters<IApp["storage"]>
  ) {
    return this
      .storage(
        ...filename,
      )
      .readStringful();
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
      .storage(
        ...filename,
      )
      .write(
        data,
        overwrite,
      );
  }

  protected delete(
    ...filename: Parameters<IApp["storage"]>
  ) {
    this
      .storage(
        ...filename,
      )
      .delete();
  }

  protected clearStorage() {
    new File(
      "Storage",
      "",
      this.app,
      true,
    )
      .delete();
  }

  protected feed(
    path: string,
  ) {
    return this
      .stream(
        path,
      )
      .readString();
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
      !strings
        .every(
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
      !strings
        .every(
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

  private state(
    key: string,
  ) {
    return this.cache[key] ??= new File(
      "EphemeralState",
      key,
      this.app,
      true,
      true,
    );
  }

  private storage(
    {
      name = this.app,
      extension = "txt",
    } = {},
  ) {
    const file = extension === ""
      ? name
      : [
          name,
          extension,
        ]
          .join(".");

    return this.store[file] ??= new File(
      "Storage",
      file,
      this.app,
      true,
    );
  }

  private stream(
    path: string,
  ) {
    return this.streams[path] ??= new File(
      "Feed",
      path,
      this.app,
    );
  }

  protected abstract runtime(): Output;
  protected abstract output(output: Output): void;
  protected test?: (output: Output) => void;
  private ini?: Setting;
}
