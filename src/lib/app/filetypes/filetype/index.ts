import File from "./file";

abstract class Filetype<
  FT extends string,
  Mutable extends boolean = false,
> {
  protected readonly file: File<Mutable>;

  constructor(
    filetype: literalful<FT>,
    mutable: Mutable,
    folder: Null<string>,
    name: string,
    ext: string,
  ) {
    if (name.length < 1)
      throw new TypeError("No filename");

    this.file = new File(
      mutable,
      filetype,
      folder ?? "",
      `${name}${ext.length > 0 ? `.${ext}` : ""}`,
    );
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

  protected write(...content: Parameters<File<Mutable>["write"]>) {
    throw new ReferenceError("Write forbidden", { cause: content });
  }

  protected delete() {
    throw new ReferenceError("Delete forbidden");
  }
}

export default Filetype;
