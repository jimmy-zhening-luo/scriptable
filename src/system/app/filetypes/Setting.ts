const se_Filetype = importModule(
  `filetype/Filetype`,
) as typeof Filetype;

class Setting<
  Class extends string,
  Schema extends ISetting,
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
          .ReadOnlyFile,
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

  public get parsed(): Schema {
    try {
      if (
        this
          ._cachedSetting === undefined
      ) {
        const parsedJson: unknown = JSON
          .parse(
            this
              .readful(),
          );

        if (
          parsedJson !== undefined
        )
          this
            ._cachedSetting = parsedJson as Schema;
        else
          throw new TypeError(
            `Setting file parsed to valid JSON, but has invalid schema`,
            {
              cause: {
                path: this.file.path,
                raw: this.read(),
                parsedString: String(parsedJson),
                parsedJson,
              },
            },
          );
      }

      return this
        ._cachedSetting;
    }
    catch (e) {
      throw new EvalError(
        `Setting: parsed`,
        { cause: e },
      );
    }
  }

  public get app(): Schema["app"] {
    try {
      if (
        this
          .parsed
          .app === undefined
      )
        throw new TypeError(
          `No app setting found`,
          {
            cause: {
              subpath: this.subpath,
              parsed: this.parsed,
            },
          },
        );
      else
        return this
          .parsed
          .app;
    }
    catch (e) {
      throw new EvalError(
        `Setting: app`,
        { cause: e },
      );
    }
  }

  public get user(): Schema["user"] {
    try {
      if (
        this
          .parsed
          .user === undefined
      )
        throw new TypeError(
          `No user setting found`,
          {
            cause: {
              subpath: this.subpath,
              parsed: this.parsed,
            },
          },
        );
      else
        return this
          .parsed
          .user;
    }
    catch (e) {
      throw new EvalError(
        `Setting: user`,
        { cause: e },
      );
    }
  }

  public write(): never {
    throw new ReferenceError(
      `Setting: write: Forbidden: Setting files are readonly`,
      { cause: { subpath: this.subpath } },
    );
  }

  public delete(): never {
    throw new ReferenceError(
      `Setting: delete: Forbidden: Setting files are readonly`,
      { cause: { subpath: this.subpath } },
    );
  }

  private _cachedSetting?: Schema;
}

module.exports = Setting;
