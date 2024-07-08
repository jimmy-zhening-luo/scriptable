const se_Filetype = importModule(
  `filetype/Filetype`,
) as typeof Filetype;

class Setting<
  Class extends string,
  Schema,
> extends se_Filetype<
    "Setting"
    ,
    Class
  > {
  constructor(
    category: literalful<
      Class
    >,
    app: stringful,
  ) {
    try {
      super(
        "Setting",
        category,
        Setting
          .ReadonlyFile,
        "json",
        app,
      );
    }
    catch (e) {
      throw new EvalError(
        `Setting: ctor`,
        { cause: e },
      );
    }
  }

  public get parse(): Schema {
    try {
      if (
        typeof this
          ._cache === "undefined"
      ) {
        const setting: unknown = JSON
          .parse(
            this
              .readful(),
          );

        if (
          typeof setting === "object"
          && setting !== null
          && Object
            .keys(
              setting,
            )
            .length > 0
        )
          this
            ._cache = setting as Schema;
        else
          throw new TypeError(
            `Setting file does not match schema`,
            {
              cause: {
                file: this
                  .subpath,
                content: this
                  .read(),
              },
            },
          );
      }

      return this
        ._cache;
    }
    catch (e) {
      throw new EvalError(
        `Setting: parse`,
        { cause: e },
      );
    }
  }

  public write(): never {
    throw new ReferenceError(
      `Setting: write: Forbidden: Setting files are readonly`,
      { cause: { file: this.subpath } },
    );
  }

  private _cache?: Schema;
}

module.exports = Setting;
