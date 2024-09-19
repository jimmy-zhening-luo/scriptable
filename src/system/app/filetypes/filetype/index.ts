import type { File } from "./file/index";

abstract class Filetype<
  T extends string,
  AT extends string,
  M extends boolean = false,
> {
  protected readonly file: File<M>;

  constructor(
    filetype: literalful<T>,
    apptype: literalful<AT>,
    mutable: M,
    file: string,
    ext?: Null<string>,
    folder: Null<string> = null,
  ) {
    try {
      const EXT = "txt",
      alias = filetype,
      container = apptype,
      subpaths = [
        container,
        ...folder === null ? [] : [folder],
        [file, ext ?? EXT].join("."),
      ];

      this.file = new this.File(
        mutable,
        alias,
        ...subpaths,
      );
    }
    catch (e) {
      throw new Error(`Filetype (${filetype}/${apptype}: ${folder ?? ""}/${file})`, { cause: e });
    }
  }

  protected get name() {
    return this.file.name;
  }

  protected get subpath() {
    return this.file.subpath;
  }

  private get File() {
    return importModule<typeof File<M>>("./file/index");
  }

  public read(stringfully = false) {
    return this.file.read(stringfully);
  }

  public readful() {
    const { file, subpath } = this,
    error = subpath;

    return file.readful(error);
  }

  public data<Data>(stringfully = false): Null<Data> {
    const { file } = this,
    string = file.read(stringfully).trim(),
    { length } = string;

    return length > 0 ? JSON.parse(string) as Data : null;
  }

  protected abstract write(...args: M extends true ? Parameters<File<M>["write"]> : never): M extends true ? ReturnType<File<M>["write"]> : never;
  protected abstract delete(...args: M extends true ? Parameters<File<M>["delete"]> : never): M extends true ? ReturnType<File<M>["delete"]> : never;
}

module.exports = Filetype;
export type { Filetype };
