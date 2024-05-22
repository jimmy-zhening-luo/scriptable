abstract class Filetype<
  Class extends string,
  Subtype extends string,
  F extends IFile = ReadOnlyFile,
> {
  protected readonly _file: F;

  constructor(
    File: new(...args: ConstructorParameters<typeof IFile>)=> IFile & F,
    filetype: literalful<Subtype>,
    appClass: literalful<Class>,
    ...subpaths: string[]
  ) {
    try {
      this._file = new File(
        this
          .root(
            filetype,
          ),
        appClass,
        ...subpaths,
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
        ._file
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
    ...error: Parameters<F["read"]>
  ) {
    try {
      return this
        ._file
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
        ._file
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

  public data<D extends Table>(
    ...error: Parameters<F["read"]>
  ):
  & D
  & Table {
    try {
      const string = this
        ._file
        .read(
          ...error,
        )
        .trim();

      return string.length > 0
        ? JSON
          .parse(
            string,
          ) as D
        : {};
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
        ._file
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
    subtype: literalful<Subtype>,
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

  public abstract write(...args: Parameters<F["write"]>): ReturnType<F["write"]>;

  public abstract delete(...args: Parameters<F["delete"]>): ReturnType<F["delete"]>;
}

module.exports = Filetype;
