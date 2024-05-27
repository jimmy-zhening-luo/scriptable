const st_Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Storage<
  C extends string,
> extends st_Filetype<
    "Storage"
    ,
    C
    ,
    WriteFile
  > {
  constructor(
    category: literalful<
      C
    >,
    app: stringful,
    ext = "txt",
    filename?: string,
  ) {
    try {
      super(
        "Storage",
        category,
        Storage
          .WriteFile,
        ext,
        app,
        filename ?? app,
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
      else if (typeof data === "object")
        if (data === null)
          throw new TypeError(
            `null data`,
          );
        else if (Array.isArray(data))
          this
            .file
            .write(
              data
                .reverse()
                .join(
                  "\n",
                ),
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
              overwrite !== false,
            );
      else
        this
          .file
          .write(
            String(
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
