import type { File } from "./file/index";

abstract class Filetype<
  T extends string,
  AT extends string,
  Mutable extends boolean = false,
> {
  protected readonly file: File<Mutable>;

  constructor(
    mutable: Mutable,
    filetype: literalful<T>,
    apptype: literalful<AT>,
    file: string,
    ext?: Null<string>,
    folder: Null<string> = null,
  ) {
    try {
      this.file = new this.File(
        mutable,
        filetype,
        ...[
          apptype,
          ...folder === null ? [] : [folder],
          [file, ext ?? "txt"].join("."),
        ],
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
    return importModule<typeof File<Mutable>>("./file/index");
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

  protected abstract write(...args: Mutable extends true ? Parameters<File<Mutable>["write"]> : never): Mutable extends true ? ReturnType<File<Mutable>["write"]> : never;
  protected abstract delete(...args: Mutable extends true ? Parameters<File<Mutable>["delete"]> : never): Mutable extends true ? ReturnType<File<Mutable>["delete"]> : never;
}

module.exports = Filetype;
export type { Filetype };
