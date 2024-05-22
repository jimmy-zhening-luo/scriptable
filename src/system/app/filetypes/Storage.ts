const st_Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Storage<
  Class extends string,
> extends st_Filetype<
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
      | "line" = true
    ,
  ) {
    try {
      if (
        typeof data === "undefined"
        || data === null
      )
        throw new TypeError(
          `write data is null or undefined`,
        );
      else
        this
          ._file
          .write(
            JSON
              .stringify(
                data,
              ),
            overwrite,
          );
    }
    catch (e) {
      throw new EvalError(
        `Storage: write`,
        { cause: e },
      );
    }
  }

  public async delete() {
    try {
      await this
        ._file
        .delete();
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
