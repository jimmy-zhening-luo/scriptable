import type { File } from "./file/index";

abstract class Filetype<
  FT extends string,
  T extends string,
  Mutable extends boolean = false,
> {
  protected readonly file: File<Mutable>;

  constructor(
    mutable: Mutable,
    filetype: literalful<FT>,
    type: literalful<T>,
    folder: Null<string>,
    file: string,
    ext = "txt",
  ) {
    try {
      if (file.length > 0 && ext.length > 0)
        this.file = new this.File(
          mutable,
          filetype,
          type,
          folder ?? "",
          `${file}.${ext}`,
        );
      else
        throw new TypeError("Empty filename or extension");
    }
    catch (e) {
      throw new Error(`Filetype (${filetype}/${type}/${folder ?? ""}/${file}.${ext})`, { cause: e });
    }
  }

  protected get name() {
    return this.file.name;
  }

  private get File() {
    return importModule<typeof File<Mutable>>("./file/index");
  }

  public read() {
    return this.file.read();
  }

  public readful() {
    return this.file.readful();
  }

  public data<Data>(): Null<Data> {
    const string = this.read().trim();

    return string.length > 0 ? JSON.parse(string) as Data : null;
  }

  protected abstract write(...args: Mutable extends true ? Parameters<File<Mutable>["write"]> : never): Mutable extends true ? ReturnType<File<Mutable>["write"]> : never;
  protected abstract delete(...args: Mutable extends true ? Parameters<File<Mutable>["delete"]> : never): Mutable extends true ? ReturnType<File<Mutable>["delete"]> : never;
}

module.exports = Filetype;
export type { Filetype };
