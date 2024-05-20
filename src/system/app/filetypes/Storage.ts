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
        Storage.WriteFile,
        "Storage",
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
    data: unknown,
    overwrite: 
      | boolean
      | "overwrite"
      | "append"
      | "line" = true,
  ): this {
    try {
      if (typeof data === "undefined" || data === null)
        throw new TypeError(
          `input is null or undefined`,
        );
      else {
        this._file.write(
          typeof data === "string"
          || typeof data === "number"
          || typeof data === "boolean"
            ? String(
                data
              )
            : JSON.stringify(
                data
              ),
          overwrite,
        );

        return this;
      }
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
