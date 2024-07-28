abstract class Filetype<
  Type extends string,
  Class extends string,
  W extends boolean = false,
> {
  protected readonly file: File<W>;

  constructor(
    type: literalful<Type>,
    appClass: literalful<Class>,
    writable: W,
    ext: string,
    subpath: string,
    filename?: string,
  ) {
    try {
      this.file = new this.File(
        writable,
        { bookmark: type },
        appClass,
        ...typeof filename === "undefined"
          ? [[subpath, ext].join(".")]
          : [
              subpath,
              [filename, ext].join("."),
            ],
      );
    }
    catch (e) {
      throw new Error(
        `Filetype (${type}/${appClass})`,
        { cause: e },
      );
    }
  }

  public get subpath() {
    return this.file.subpath;
  }

  private get File() {
    try {
      return importModule<typeof File<W>>(
        "file/File",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import File`,
        { cause: e },
      );
    }
  }

  public read(...error: Parameters<File<W>["read"]>) {
    return this.file.read(...error);
  }

  public readful() {
    return this.file.readful(this.subpath);
  }

  public data<Data>(...error: Parameters<File<W>["read"]>): Null<Data> {
    try {
      const string = this
        .file
        .read(...error)
        .trim();

      return string.length > 0 ? JSON.parse(string) as Data : null;
    }
    catch (e) {
      throw new Error(
        `Filetype: data`,
        { cause: e },
      );
    }
  }

  public abstract write(...args: W extends true ? Parameters<File<W>["write"]> : never): W extends true ? ReturnType<File<W>["write"]> : never;
}

module.exports = Filetype;
