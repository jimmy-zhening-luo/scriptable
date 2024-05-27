abstract class Filetype<
  T extends string,
  C extends string,
  File extends IFile = ReadOnlyFile,
> {
  protected readonly file: File;

  constructor(
    filetype: literalful<
      T
    >,
    category: literalful<
      C
    >,
    FileCtor: new(...args: ConstructorParameters<typeof IFile>)=> IFile & File,
    ext: string,
    subpath: string,
    filename?: string,
  ) {
    try {
      this
        .file = new FileCtor(
          this
            .root(
              filetype,
            ),
          category,
          ...typeof filename === "undefined"
            ? [
                [
                  subpath,
                  ext,
                ]
                  .join(
                    ".",
                  ),
              ]
            : [
                subpath,
                [
                  filename,
                  ext,
                ]
                  .join(
                    ".",
                  ),
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

  protected static get ReadOnlyFile() {
    try {
      return importModule(
        "files/ReadOnlyFile",
      ) as typeof ReadOnlyFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import ReadOnlyFile`,
        { cause: e },
      );
    }
  }

  protected static get WriteFile() {
    try {
      return importModule(
        "files/WriteFile",
      ) as typeof WriteFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import WriteFile`,
        { cause: e },
      );
    }
  }

  public get subpath() {
    try {
      return this
        .file
        .subpath;
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
        "files/file/bookmark/Bookmark",
      ) as typeof Bookmark;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetype: import Bookmark`,
        { cause: e },
      );
    }
  }

  public read(
    ...error: Parameters<File["read"]>
  ) {
    try {
      return this
        .file
        .read(
          ...error,
        );
    }
    catch (e) {
      throw new EvalError(
        `Filetype: read`,
        { cause: e },
      );
    }
  }

  public readful(): stringful {
    try {
      return this
        .file
        .readful(
          this
            .subpath,
        );
    }
    catch (e) {
      throw new EvalError(
        `Filetype: readful`,
        { cause: e },
      );
    }
  }

  public data<D>(
    ...error: Parameters<File["read"]>
  ): Null<D> {
    try {
      const string = this
        .file
        .read(
          ...error,
        )
        .trim();

      return string.length > 0
        ? JSON
          .parse(
            string,
          ) as D
        : null;
    }
    catch (e) {
      throw new EvalError(
        `Filetype: data`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return this
        .file
        .toString();
    }
    catch (e) {
      throw new EvalError(
        `Filetype: toString`,
        { cause: e },
      );
    }
  }

  private root(
    subtype: literalful<T>,
  ) {
    try {
      if (subtype.length === 0)
        throw new SyntaxError(
          `Filetype subclass has no name`,
          { cause: { subtype } },
        );
      else
        return new this
          .Bookmark(
            `#${
              subtype
            }`,
          );
    }
    catch (e) {
      throw new EvalError(
        `Filetype: root`,
        { cause: e },
      );
    }
  }

  public abstract write(...args: Parameters<File["write"]>): ReturnType<File["write"]>;

  public abstract delete(...args: Parameters<File["delete"]>): ReturnType<File["delete"]>;
}

module.exports = Filetype;
