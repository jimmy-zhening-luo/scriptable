import type { File } from "./file";

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
    if (file.length < 1 || ext.length < 1)
      throw new TypeError("Empty filename or extension", { cause: `${filetype}/${type}/${folder ?? ""}/${file}.${ext}` });

    this.file = new this.File(
      mutable,
      filetype,
      type,
      folder ?? "",
      `${file}.${ext}`,
    );
  }

  protected get name() {
    return this.file.name;
  }

  private get File() {
    return importModule<typeof File<Mutable>>("./file");
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

  protected write(...args: Parameters<File<Mutable>["write"]>): Mutable extends true ? ReturnType<File<Mutable>["write"]> : never {
    throw new ReferenceError("Write forbidden", { cause: args });
  }

  protected delete(): Mutable extends true ? ReturnType<File<Mutable>["write"]> : never {
    throw new ReferenceError("Delete forbidden");
  }
}

module.exports = Filetype;
export type { Filetype };
