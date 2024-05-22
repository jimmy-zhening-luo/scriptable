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
      | "line"
      | "append"
      | boolean = true
    ,
  ) {
    try {
      if (typeof data === "undefined")
        throw new TypeError(
          `undefined data`,
        );
      else if (typeof data !== object)
        this
          .file
          .write(
            String(
              data,
            ),
            overwrite,
          );
      else
        if (data === null)
          throw new TypeError(
            `null data`,
          );
        else if (Array.isArray(data))
          this
            .file
            .write(
              data
                .join(
                  "\n",
                )
                .reverse(),
              overwrite === false
                ? false
                : "line",
            );
        else
          this
            .file
            .write(
              JSON
                .stringify(
                  data,
                ),
              overwrite === false
                ? false
                : true,
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
        .file
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
