import type { File } from "./file/index";

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
      alias = filetype,
      container = apptype,
      subpaths = [
        container,
        ...folder === null ? [] : [folder],
        [file, ext ?? EXT].join("."),
      ];

      this.file = new this.File(
        writable,
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
    return importModule<typeof File<Writable>>("./file/index");
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

  protected abstract write(...args: Writable extends true ? Parameters<File<Writable>["write"]> : never): Writable extends true ? ReturnType<File<Writable>["write"]> : never;
}

module.exports = Filetype;
export type { Filetype };
