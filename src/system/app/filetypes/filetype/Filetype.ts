abstract class Filetype<
  Type extends string,
  Class extends string,
  F extends File = ReadonlyFile,
> {
  protected readonly file: F;

  constructor(
    type: literalful<Type>,
    appClass: literalful<Class>,
    FileConstructor: new(...path: ConstructorParameters<typeof File>)=> F & File,
    ext: string,
    subpath: string,
    filename?: string,
  ) {
    try {
      this.file = new FileConstructor(
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

  protected static get File() {
    try {
      return importModule<typeof File>(
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

  protected static get ReadonlyFile() {
    try {
      return importModule<typeof ReadonlyFile>(
        "file/ReadonlyFile",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import ReadonlyFile`,
        { cause: e },
      );
    }
  }

  public get subpath() {
    return this.file.subpath;
  }

  public read(...error: Parameters<F["read"]>) {
    return this.file.read(...error);
  }

  public readful() {
    return this.file.readful(this.subpath);
  }

  public data<Data>(...error: Parameters<F["read"]>): Null<Data> {
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

  public abstract write(...args: Parameters<F["write"]>): ReturnType<F["write"]>;
}

module.exports = Filetype;
