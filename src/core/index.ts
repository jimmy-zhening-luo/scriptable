import serialize from "./serializer";
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
  Parent = "",
  Ext = ".",
  ExtJson = Ext + "json",
}

/* eslint-disable ts/no-mixed-enums */
const enum History {
  Length = 10,
  Logs = "history/",
  IndexFile = Logs + "index",
}

export default abstract class IApp<
  Setting = never,
  Output = void,
  Input = never,
  History extends string | Table = never,
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

  protected get history() {
    if (this._history === undefined)
      this._history = this.readHistory() ?? null;

    return this._history ?? undefined;
  }

  protected get index() {
    if (this._index === undefined) {
      const indexString = this.read(History.IndexFile);

      if (!indexString)
        this.write(
          "0",
          History.IndexFile,
        );

      this._index = indexString
        ? Number(indexString)
        : 0;
    }

    return this._index;
  }

  protected set history(
    history: Undefined<History>,
  ) {
    if (history !== undefined) {
      const currentIndex = this.index,
      indexShift = currentIndex + 1,
      nextIndex = indexShift === History.Length
        ? 0
        : indexShift;

      this.write(
        history,
        History.Logs
        + String(nextIndex),
      );

      this.index = nextIndex;
      this._history = history;
    }
  }

  protected set index(index: number) {
    this.write(
      index,
      History.IndexFile,
    );

    this._index = index;
  }

  public async run(sideload?: Input) {
    try {
      if (
        sideload
        && this.input === undefined
      )
        this.input = sideload;

      const output = await this.runtime();

      if (this.interactive) {
        console.log(output);

        this.ui?.(output);
      }

      this.output(output);
    }
    catch (e) {
      const { header, stack } = error(e);

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
    notification.body = serialize(message);

    if (subtitle)
      notification.subtitle = serialize(subtitle);

    void notification.schedule();
  }

  protected get(key?: string) {
    return this
      .cache(key)
      .read();
  }

  protected getRecord<T>(key?: string) {
    return this.parse<T>(
      this.get(key),
    );
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

  protected readRecord<T>(
    file?: string,
    extension?: string,
  ) {
    return this.parse<T>(
      this.read(
        file,
        extension,
      ),
    );
  }

  protected readHistory(lookback = 0) {
    const currentIndex = this.index,
    indexShift = currentIndex - lookback,
    boundedIndexShift = indexShift % History.Length;

    return this.readRecord<History>(
      History.Logs
      + String(
        boundedIndexShift < 0
          ? boundedIndexShift + History.Length
          : boundedIndexShift,
      ),
    );
  }

  protected write(
    data: Parameters<typeof this.drive[string]["write"]>[0],
    file?: string,
    extension?: string,
    overwrite: Parameters<typeof this.drive[string]["write"]>[1] = 1,
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

  protected pull(
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

  protected pullRecord<T>(
    file: string,
    extension?: string,
  ) {
    return this.parse<T>(
      this.pull(
        file,
        extension,
      ),
    );
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

  private parse<T>(string?: string) {
    return string
      ? JSON.parse(string) as T
      : undefined;
  }

  protected abstract runtime(): Output | Promise<Output>;
  protected abstract output(output: Output): void;
  protected ui?: (output: Output) => void;
  private _setting?: Setting;
  private _history?: Null<History>;
  private _index?: number;
}
