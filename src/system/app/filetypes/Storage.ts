const stor_Filetype: typeof Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Storage<Class extends string> extends stor_Filetype<
  Class,
  "Storage",
  WriteFile
> {
  constructor(
    appClass: literalful<Class>,
    app: stringful,
    filename: string = "default.txt",
  ) {
    try {
      super(
        "Storage",
        Storage.WriteFile,
        appClass,
        app,
        filename,
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
    text: Parameters<WriteFile["write"]>[0],
    overwrite: Parameters<WriteFile["write"]>[1] = true,
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
