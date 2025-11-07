import File from "./file";
import type { app, Overwrite } from "./file";

type Drive<
  Type extends string,
  Mutable extends boolean = false,
> = Table<
  File<Mutable, Type, string, app>
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
    const app = this.constructor.name;

    this.app = app === ""
      ? "Scriptable" as app
      : app as app;

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
          this.app + ".json" as stringful,
          "",
        )
          .read()!,
      ) as Setting;
    }
    catch (e) {
      throw ReferenceError(
        "Failed to load app settings",
        { cause: e },
      );
    }
  }

  private static fail(app: string, error: unknown) {
    function cast(error: unknown) {
      return Error.isError(error)
        ? error
        : typeof error !== "object"
          || error === null
          ? String(error)
          : JSON.stringify(error);
    }

    const trace = [cast(error)];

    while (Error.isError(trace[0]))
      void trace.unshift(cast(trace[0].cause));

    const rootIndex = trace.findIndex(error => Error.isError(error));

    if (rootIndex > 0) {
      const [root] = trace.splice(rootIndex, 1) as [Error],
      source = root.stack?.split("\n")[1];

      if (source !== undefined)
        void trace.unshift(source);

      void trace.unshift(root);
    }

    function print(error: Error | string) {
      return Error.isError(error)
        ? error.name === "Error"
          ? error.message
          : String(error)
        : error;
    }

    const failure = trace.shift()!,
    stack = trace
      .map(print)
      .reduce(
        (stack, error) => stack += "\n" + error,
      ),
    notification = new Notification;

    notification.title = app;
    notification.subtitle = print(failure);
    notification.body = stack;
    notification.sound = "failure";
    void notification.schedule();
    console.error(stack);

    if (Error.isError(failure)) {
      failure.cause = stack;

      throw failure;
    }

    throw Error(failure, { cause: stack });
  }

  public async run(sideload?: Input) {
    try {
      if (
        sideload !== undefined
        && this.input === undefined
      )
        this._input = sideload;

      const output = await this.runtime();

      if (this.context.development) {
        console.log(output);

        if (this.development !== undefined)
          this.development(output);
      }

      this.output(output);
    }
    catch (error) {
      IApp.fail(this.app, error);
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
      .write(
        value,
        Overwrite.Yes,
      );
  }

  protected unset(key?: string) {
    this
      .cache(key)
      .delete(true);
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

  protected write(
    data: Parameters<typeof this.drive[string]["write"]>[0],
    overwrite: Parameters<typeof this.drive[string]["write"]>[1] = Overwrite.Yes,
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
      .delete(true);
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

  private cache(key = "cache") {
    return this.temp[key] ??= new File(
      "Cache",
      key,
      this.app,
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
      : file + "." + extension;

    return this.drive[record] ??= new File(
      "Storage",
      record,
      this.app,
      true,
    );
  }

  private feed(
    file: string,
    extension = "txt",
  ) {
    const feed = extension === ""
      ? file
      : file + "." + extension;

    return this.external[feed] ??= new File(
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
