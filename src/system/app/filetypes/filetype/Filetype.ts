abstract class Filetype<
  T extends string,
  AT extends string,
  Writable extends boolean = false,
> {
  protected readonly file: File<Writable>;

  constructor(
    filetype: literalful<T>,
    apptype: literalful<AT>,
    writable: Writable,
    file: string,
    ext?: Null<string>,
    folder: Null<string> = null,
  ) {
    try {
      const EXT = "txt",
      bookmark = filetype,
      root = apptype,
      subpaths = [
        root,
        ...folder === null ? [] : [folder],
        [file, ext ?? EXT].join("."),
      ];

      this.file = new this.File(
        writable,
        bookmark,
        ...subpaths,
      );
    }
    catch (e) {
      throw new Error(
        `Filetype (${filetype}/${apptype}: ${folder ?? ""}/${file})`,
        { cause: e },
      );
    }
  }

  protected get subpath() {
    return this.file.subpath;
  }

  private get File() {
    try {
      return importModule<typeof File<Writable>>(
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

  public read(stringfully = false) {
    try {
      return this.file.read(stringfully);
    }
    catch (e) {
      throw new Error(
        `Filetype: read (${String(this)})`,
        { cause: e },
      );
    }
  }

  public readful() {
    try {
      const { file, subpath } = this,
      error = subpath;

      return file.readful(error);
    }
    catch (e) {
      throw new Error(
        `Filetype: readful (${String(this)})`,
        { cause: e },
      );
    }
  }

  public data<Data>(stringfully = false): Null<Data> {
    try {
      const { file } = this,
      string = file.read(stringfully).trim(),
      { length } = string;

      return length > 0 ? JSON.parse(string) as Data : null;
    }
    catch (e) {
      throw new Error(
        `Filetype: data (${String(this)})`,
        { cause: e },
      );
    }
  }

  public toString() {
    return this.subpath;
  }

  protected abstract write(...args: Writable extends true ? Parameters<File<Writable>["write"]> : never): Writable extends true ? ReturnType<File<Writable>["write"]> : never;
}

module.exports = Filetype;
