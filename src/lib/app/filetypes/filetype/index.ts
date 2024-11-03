import File from "./file";

abstract class Filetype<
  FT extends string,
  Mutable extends boolean = false,
> {
  protected readonly file: File<Mutable>;

  constructor(
    mutable: Mutable,
    filetype: literalful<FT>,
    folder: Null<string>,
    name: string,
    ext: string,
  ) {
    if (name === "")
      throw new TypeError("Empty filename");

    this.file = new File(
      mutable,
      filetype,
      ...[
        ...folder === null ? [] : [folder],
        ext.length < 1 ? name : `${name}.${ext}`,
      ],
    );
  }

  public get name() {
    return this.file.name;
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

  protected write(...content: Parameters<File<Mutable>["write"]>): Mutable extends true ? ReturnType<File<Mutable>["write"]> : never {
    throw new ReferenceError("Write forbidden", { cause: content });
  }

  protected delete(): Mutable extends true ? ReturnType<File<Mutable>["delete"]> : never {
    throw new ReferenceError("Delete forbidden");
  }
}

export default Filetype;
