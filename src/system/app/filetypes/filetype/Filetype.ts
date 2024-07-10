abstract class Filetype<
  Type extends string,
  Class extends string,
  F extends File = ReadonlyFile,
> {
  protected readonly file: F;

  constructor(
    filetype: literalful<Type>,
    category: literalful<Class>,
    FileCtor: new(...path: ConstructorParameters<typeof File>)=> F & File,
    ext: string,
    subpath: string,
    filename?: string,
  ) {
    try {
      this
        .file = new FileCtor(
          this.root(filetype),
          category,
          ...typeof filename === "undefined"
            ? [
                [
                  subpath,
                  ext,
                ].join("."),
              ]
            : [
                subpath,
                [
                  filename,
                  ext,
                ].join("."),
              ],
        );
    }
    catch (e) {
      throw new EvalError(
        `Filetype: ctor`,
        { cause: e },
      );
    }
  }

  protected static get ReadonlyFile() {
    try {
      return importModule(
        "file/ReadonlyFile",
      ) as typeof ReadonlyFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import ReadonlyFile`,
        { cause: e },
      );
    }
  }

  protected static get File() {
    try {
      return importModule(
        "file/File",
      ) as typeof File;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import File`,
        { cause: e },
      );
    }
  }

  public get subpath() {
    try {
      return this.file.subpath;
    }
    catch (e) {
      throw new EvalError(
        `Filetype: subpath`,
        { cause: e },
      );
    }
  }

  private get Bookmark() {
    try {
      return importModule(
        "bookmark/Bookmark",
      ) as typeof Bookmark;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import Bookmark`,
        { cause: e },
      );
    }
  }

  public read(...error: Parameters<F["read"]>) {
    try {
      return this.file.read(...error);
    }
    catch (e) {
      throw new EvalError(
        `Filetype: read`,
        { cause: e },
      );
    }
  }

  public readful() {
    try {
      return this.file.readful(this.subpath);
    }
    catch (e) {
      throw new EvalError(
        `Filetype: readful`,
        { cause: e },
      );
    }
  }

  public data<Data>(...error: Parameters<F["read"]>): Null<Data> {
    try {
      const string = this
        .file
        .read(...error)
        .trim();

      return string.length > 0
        ? JSON.parse(string) as Data
        : null;
    }
    catch (e) {
      throw new EvalError(
        `Filetype: data`,
        { cause: e },
      );
    }
  }

  private root(subtype: literalful<Type>) {
    try {
      return new this.Bookmark(subtype);
    }
    catch (e) {
      throw new EvalError(
        `Filetype: root`,
        { cause: e },
      );
    }
  }

  public abstract write(...args: Parameters<F["write"]>): ReturnType<F["write"]>;
}

module.exports = Filetype;
