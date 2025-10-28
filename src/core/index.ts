import File from "./file";

type Drive<
  Type extends string,
  Mutable extends boolean = false,
> = Table<
  File<Type, Mutable>
>;

export default abstract class IApp<
  Setting = never,
  Output = void,
  Input = never,
> {
  protected readonly app;
  protected readonly context;
  private readonly temp: Drive<"Cache", true> = {};
  private readonly drive: Drive<"Storage", true> = {};
  private readonly external: Drive<"Feed"> = {};

  constructor(
    private _input: Unnull<Input>,
    production: boolean,
  ) {
    this.app = this.constructor.name as stringful;

    if (this.app === "")
      throw TypeError("Anonymous app class");

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
          "",
          false,
        )
          .readStringful(),
      ) as Setting;
    }
    catch (e) {
      throw ReferenceError(
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

    const trace: Arrayful<string | Error, true> = [cast(error)];

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
    console.error(cause);

    return Error(failure, { cause });
  }

  public async run(sideload?: Input) {
    try {
      if (
        sideload !== undefined
        && this.input === undefined
      )
        this._input = sideload;

      const output = await this.runtime();

      if (this.context.development)
        try {
          console.log(output);

          if (this.development !== undefined)
            this.development(output);
        }
        catch (developmentError) {
          throw EvalError(
            "Development runtime failure",
            { cause: developmentError },
          );
        }

      try {
        this.output(output);
      }
      catch (errorSystemOutput) {
        throw TypeError(
          "Unable to output to iOS",
          { cause: errorSystemOutput },
        );
      }
    }
    catch (error) {
      throw IApp.Error(this.app, error);
    }
    finally {
      Script.complete();
    }
  }

  protected get(key?: string) {
    return this
      .cache(key)
      .read();
  }

  protected set(
    value: Parameters<typeof this.temp[string]["write"]>[0],
    key?: string,
  ) {
    this
      .cache(key)
      .write(value, true);
  }

  protected unset(key?: string) {
    this
      .cache(key)
      .delete();
  }

  protected clear() {
    this.unset("");
  }

  protected read(
    file?: string,
    extension?: string,
  ) {
    return this
      .storage(
        file,
        extension,
      )
      .read();
  }

  protected readString(
    file?: string,
    extension?: string,
  ) {
    return this
      .storage(
        file,
        extension,
      )
      .readString();
  }

  protected readStringful(
    file?: string,
    extension?: string,
  ) {
    return this
      .storage(
        file,
        extension,
      )
      .readStringful();
  }

  protected write(
    data: Parameters<typeof this.drive[string]["write"]>[0],
    overwrite: Parameters<typeof this.drive[string]["write"]>[1] = true,
    file?: string,
    extension?: string,
  ) {
    this
      .storage(
        file,
        extension,
      )
      .write(
        data,
        overwrite,
      );
  }

  protected delete(
    file?: string,
    extension?: string,
  ) {
    this
      .storage(
        file,
        extension,
      )
      .delete();
  }

  protected deleteAll() {
    this.delete(
      "",
      "",
    );
    this.clear();
  }

  protected subscribe(
    file: string,
    extension?: string,
  ) {
    return this
      .feed(
        file,
        extension,
      )
      .read();
  }

  protected stringful(
    string = "",
    cause?: string,
  ) {
    if (string === "")
      throw TypeError(
        "Unstringful",
        { cause },
      );

    return string as stringful;
  }

  protected stringfuls<A extends ArrayN>(
    strings: A,
    cause?: string,
  ) {
    if (strings.length === 0)
      throw RangeError(
        "Empty stringful array",
        { cause },
      );
    else if (!strings.every((string): string is stringful => string !== ""))
      throw TypeError(
        "Stringful array contains unstringful",
        { cause },
      );

    return strings as unknown as (
      A extends Arrayful
        ? {
            readonly [I in keyof A]: Flat<typeof strings>;
          }
        : Arrayful<Flat<typeof strings>>
    );
  }

  protected char(
    string = "",
    cause?: string,
  ) {
    if (string.length !== 1)
      throw TypeError(
        "Non-char string",
        { cause },
      );

    return string as char;
  }

  protected chars<A extends ArrayN>(
    strings: A,
    cause?: string,
  ) {
    if (strings.length === 0)
      throw RangeError(
        "Empty char array",
        { cause },
      );
    else if (!strings.every((string): string is char => string.length === 1))
      throw TypeError(
        "Char array contains non-chars",
        { cause },
      );

    return strings as unknown as (
      A extends Arrayful
        ? {
            readonly [I in keyof A]: Flat<typeof strings>;
          }
        : Arrayful<Flat<typeof strings>>
    );
  }

  private cache(key = "cache") {
    return this.temp[key] ??= new File(
      "Cache",
      key,
      this.app,
      true,
      true,
      true,
    );
  }

  private storage(
    file: string = this.app,
    extension = "txt",
  ) {
    const record = extension === ""
      ? file
      : [file, extension].join(".");

    return this.drive[record] ??= new File(
      "Storage",
      record,
      this.app,
      true,
      true,
    );
  }

  private feed(
    file: string,
    extension = "txt",
  ) {
    const feed = extension === ""
      ? file
      : [file, extension].join(".");

    return this.external[feed] ??= new File(
      "Feed",
      feed,
      this.app,
      false,
    );
  }

  protected abstract runtime(): Output | Promise<Output>;
  protected abstract output(output: Output): void;
  protected development?: (output: Output) => void;
  private _setting?: Setting;
}
