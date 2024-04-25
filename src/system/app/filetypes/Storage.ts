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
    subpath?: string,
  ) {
    try {
      const subpathful: stringful = subpath !== undefined && subpath.length !== 0
        ? subpath as stringful
        : "default.txt" as stringful;

      super(
        "Storage",
        Storage.IOFile,
        appType,
        appName,
        subpathful,
      );
    }
    catch (e) {
      throw new EvalError(
        `Storage: ctor`,
        { cause: e },
      );
    }
  }

  public write(
    text: string,
    overwrite: Parameters<IOFile["write"]>[1] = true,
  ): this {
    try {
      this._file.write(
        text,
        overwrite,
      );

      return this;
    }
    catch (e) {
      throw new EvalError(
        `Storage: write`,
        { cause: e },
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
        `Storage: delete`,
        { cause: e },
      );
    }
  }
}

module.exports = Storage;
