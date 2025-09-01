import File from "../../lib/file";

export default abstract class IApp<
  Input = never,
  Output = void,
  Setting = never,
> {
  protected readonly app;
  protected readonly context: Flag<
    never,
    | "production"
    | "development"
  >;
  private readonly cache: Table<
    File<"EphemeralState">
  > = {};
  private readonly store: Table<
    File<"Storage">
  > = {};
  private readonly feeds: Table<
    File<"Feed">
  > = {};

  constructor(
    private _input: NullUndef<Input>,
    production: boolean,
  ) {
    this.app = this.stringful(
      this.constructor.name,
      "Anonymous app instance",
    );
    this.context = {
      production,
      development: !production
        && config.runsInApp,
    };
  }

  protected get input() {
    return this._input ?? undefined;
  }

  protected get setting() {
    try {
      return this._setting ??= JSON.parse(
        new File(
          "Setting",
          this.app + ".json",
        )
          .readStringful(),
      ) as Setting;
    }
    catch (e) {
      throw new ReferenceError(
        "Failed to load app settings",
        { cause: e },
      );
    }
  }

  private static Error(app: stringful, error: unknown) {
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

    const trace: Arrayful<string | Error> = [cast(error)];

    while (
      typeof trace[0] !== "string"
      && "cause" in trace[0]
    )
      void trace.unshift(cast(trace[0].cause));

    const [failure = "", ...causes] = (
      typeof trace[0] === "string"
      && trace[1] !== undefined
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
    void notification.schedule();
    console.error([failure, cause].join("\n"));

    return new Error(failure, { cause });
  }

  public async run(sideload?: Input) {
    try {
      if (
        sideload !== undefined
        && this.input === undefined
      )
        this._input = sideload;

      const output = await this.runtime();

      try {
        this.output(output);
      }
      catch (errorSystemOutput) {
        throw new Error(
          "Unable to output to iOS",
          { cause: errorSystemOutput },
        );
      }

      if (this.context.development)
        try {
          console.log(output);

          if (this.development !== undefined)
            this.development(output);
        }
        catch (developmentError) {
          throw new EvalError(
            "Development runtime failure",
            { cause: developmentError },
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

  protected get(key: string) {
    return this
      .state(key)
      .readString();
  }

  protected set(
    key: string,
    value: string,
  ) {
    this
      .state(key)
      .write(value, true);
  }

  protected unset(key: string) {
    this
      .state(key)
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
    name?: string,
    extension?: string,
  ) {
    return this
      .storage(name, extension)
      .read();
  }

  protected readString(
    name?: string,
    extension?: string,
  ) {
    return this
      .storage(name, extension)
      .readString();
  }

  protected readStringful(
    name?: string,
    extension?: string,
  ) {
    return this
      .storage(name, extension)
      .readStringful();
  }

  protected write(
    data: Parameters<File<"Storage">["write"]>[0],
    overwrite: Parameters<File<"Storage">["write"]>[1] = true,
    name?: string,
    extension?: string,
  ) {
    this
      .storage(name, extension)
      .write(data, overwrite);
  }

  protected delete(
    name?: string,
    extension?: string,
  ) {
    this
      .storage(name, extension)
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

  protected stream(
    name: string,
    extension?: string,
  ) {
    return this
      .feed(name, extension)
      .readString();
  }

  protected stringful(string = "", cause = "") {
    if (string === "")
      throw new TypeError("Empty string", { cause });

    return string as stringful;
  }

  protected stringfuls<ArrayLike extends readonly string[]>(strings: ArrayLike, cause = "") {
    if (strings.length === 0)
      throw new RangeError("Empty string array", { cause });
    else if (!strings.every((string): string is stringful => string !== ""))
      throw new TypeError("String array has empty strings", { cause });

    return strings as unknown as (
      ArrayLike extends readonly [string, ...string[]]
        ? { readonly [Index in keyof ArrayLike]: typeof strings[number]; }
        : Arrayful<typeof strings[number], true>
    );
  }

  protected char(string = "", cause = "") {
    if (string.length !== 1)
      throw new TypeError(
        string === ""
          ? "Empty char"
          : "Char is too long",
        { cause },
      );

    return string as stringful;
  }

  protected chars<ArrayLike extends readonly string[]>(strings: ArrayLike, cause = "") {
    if (strings.length === 0)
      throw new RangeError("Empty char array", { cause });
    else if (!strings.every((string): string is char => string.length === 1))
      throw new TypeError("Char array has non-chars", { cause });

    return strings as unknown as (
      ArrayLike extends readonly [string, ...string[]]
        ? { readonly [Index in keyof ArrayLike]: typeof strings[number]; }
        : Arrayful<typeof strings[number], true>
    );
  }

  private state(key: string) {
    return this.cache[key] ??= new File(
      "EphemeralState",
      key,
      this.app,
      true,
      true,
    );
  }

  private storage(
    name: string = this.app,
    extension = "txt",
  ) {
    const file = extension === ""
      ? name
      : [name, extension].join(".");

    return this.store[file] ??= new File(
      "Storage",
      file,
      this.app,
      true,
    );
  }

  private feed(
    name: string,
    extension = "txt",
  ) {
    const feed = extension === ""
      ? name
      : [name, extension].join(".");

    return this.feeds[feed] ??= new File(
      "Feed",
      feed,
      this.app,
    );
  }

  protected abstract runtime(): Output | Promise<Output>;
  protected abstract output(output: Output): void;
  protected development?: (output: Output) => void;
  private _setting?: Setting;
}
