const stor_Filetype: typeof Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Storage extends stor_Filetype<
  "Storage",
  typeof IOFile
> {
  constructor(
    appType: string,
    appName: string,
    subpath: string = "default.txt",
  ) {
    try {
      super(
        "Storage",
        Storage.IOFile,
        appType,
        appName,
        subpath,
      );
    }
    catch (e) {
      throw new EvalError(
        `Storage: ctor: \n${e as string}`,
      );
    }
  }

  public write(
    text: string,
  ): this {
    try {
      this._file.write(
        text,
        true
      );

      return this;
    }
    catch (e) {
      throw new EvalError(
        `Storage: write: \n${e as string}`,
      );
    }
  }

  public async delete(): Promise<this> {
    try {
      await this._file.delete();

      return this;
    }
    catch (e) {
      throw new EvalError(
        `Storage: delete: \n${e as string}`,
      );
    }
  }
}

module.exports = Storage;
