import type { app } from "./file";
import File from "./file";
import error from "./error";

const enum Filename {
  All = "",
  Ext = ".",
  Json = Ext + "json",
}

type Drive<
  Type extends string,
  Mutable extends boolean = false,
> = Table<File<Mutable, Type, string, app>>;

export default abstract class IApp<
  Setting = never,
  Output = void,
  Input = never,
> {
  protected readonly app;
  protected readonly interactive = config.runsInApp;
  protected input;
  private readonly temp: Drive<"Cache", true> = {};
  private readonly drive: Drive<"Storage", true> = {};
  private readonly external: Drive<"Feed"> = {};
  protected abstract readonly production: boolean;

  constructor(_input: Nullish<Input>) {
    this.app = this.constructor.name as app
      || "Scriptable" as app;
    this.input = _input ?? undefined;
  }

  protected get setting() {
    return this._setting ??= JSON.parse(
      new File(
        "Setting",
        this.app + Filename.Json,
        Filename.All,
      )
        .read()!,
    ) as Setting;
  }

  public async run(sideload?: Input) {
    try {
      if (sideload && this.input === undefined)
        this.input = sideload;

      const output = await this.runtime();

      if (this.interactive) {
        console.log(output);

        if (this.ui)
          this.ui(output);
      }

      this.output(output);
    }
    catch (e) {
      error(this.app, e);
    }
    finally {
      Script.complete();
    }
  }

  protected notify(
    message: unknown,
    subtitle?: unknown,
    title?: string,
  ) {
    const notification = new Notification;

    notification.title = title ?? this.app;

    const cast = (data: unknown) => data
      && typeof data === "object"
      ? JSON.stringify(data)
      : String(data);

    if (subtitle)
      notification.subtitle = cast(subtitle);

    notification.body = cast(message);

    void notification.schedule();
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
    const record = extension
      ? file + Filename.Ext + extension
      : file;

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
    const feed = extension
      ? file + Filename.Ext + extension
      : file;

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
