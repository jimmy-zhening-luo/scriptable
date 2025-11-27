import File from "./file";
import error from "./error";
import type { AppId } from "./file";

type Drive<
  Filetype extends string,
  Mutable extends boolean = false,
> = Table<
  File<Mutable, Filetype, string, AppId>
>;

const enum Filename {
  All = "",
  Ext = ".",
  ExtJson = Ext + "json",
}

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
    this.app = this.constructor.name as AppId
      || "Scriptable" as AppId;
    this.input = _input ?? undefined;
  }

  protected get setting() {
    return this._setting ??= JSON.parse(
      new File(
        "Setting",
        this.app + Filename.ExtJson as stringful,
        Filename.Parent,
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
      const { root, trace } = error(e),
      serialize = (frame: unknown) => Error.isError(frame)
        ? frame.name === "Error"
          ? frame.message
          : String(frame)
        : File.serialize(frame),
      header = serialize(root),
      stack = trace.map(serialize).join("\n");

      console.error(header);
      console.error(stack);
      this.notify(stack, header);

      throw e;
    }
    finally {
      Script.complete();
    }
  }

  protected notify(
    message: unknown,
    subtitle?: unknown,
    title: string = this.app,
  ) {
    const notification = new Notification;

    notification.title = title;
    notification.body = File.serialize(message);

    if (subtitle)
      notification.subtitle = File.serialize(subtitle);

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
    this.unset(Filename.Parent);
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
      Filename.Parent,
      Filename.Parent,
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
