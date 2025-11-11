import File from "./file";
import type { app } from "./file";

const enum Filename {
  All = "",
  Ext = ".",
  Json = Ext + "json",
}

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
  protected readonly interactive = config.runsInApp;
  private readonly temp: Drive<"Cache", true> = {};
  private readonly drive: Drive<"Storage", true> = {};
  private readonly external: Drive<"Feed"> = {};
  protected abstract readonly production: boolean;

  constructor(private _input: Unnull<Input>) {
    const app = this.constructor.name;

    this.app = app === ""
      ? "Scriptable" as app
      : app as app;
  }

  protected get input() {
    return this._input ?? undefined;
  }

  protected get setting() {
    return this._setting ??= JSON.parse(
      new File(
        "Setting",
        this.app + Filename.Json as stringful,
        Filename.All,
      )
        .read()!,
    ) as Setting;
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
      .join("\n"),
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

      if (this.interactive) {
        console.log(output);

        if (this.ui !== undefined)
          this.ui(output);
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
      .write(value, 1);
  }

  protected unset(key?: string) {
    this
      .cache(key)
      .delete(true);
  }

  protected clear() {
    this.unset(Filename.All);
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
    overwrite: Parameters<typeof this.drive[string]["write"]>[1] = 1,
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
      Filename.All,
      Filename.All,
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
    const record = extension === Filename.All
      ? file
      : file + Filename.Ext + extension;

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
    const feed = extension === Filename.All
      ? file
      : file + Filename.Ext + extension;

    return this.external[feed] ??= new File(
      "Feed",
      feed,
      this.app,
    );
  }

  protected abstract runtime(): Output | Promise<Output>;
  protected abstract output(output: Output): void;
  protected ui?: (output: Output) => void;
  private _setting?: Setting;
}
