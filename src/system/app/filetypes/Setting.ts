const se_Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Setting<
  Class extends string,
  C extends ISetting,
> extends se_Filetype<
    Class,
    "Setting"
  > {
  constructor(
    appClass: literalful<Class>,
    app: stringful,
  ) {
    try {
      super(
        Setting.ReadOnlyFile,
        "Setting",
        appClass,
        `${
          app
        }.json`,
      );
    }
    catch (e) {
      throw new EvalError(
        `Setting: ctor`,
        { cause: e },
      );
    }
  }

  public get parsed(): C {
    try {
      if (this._cachedSetting === undefined) {
        const parsedJson: unknown = JSON
          .parse(
            this
              .readful(),
          );

        if (parsedJson !== undefined)
          this
            ._cachedSetting = parsedJson as C;
        else
          throw new TypeError(
            `Setting file parsed to valid JSON, but has invalid schema`,
            {
              cause: {
                path: this._file.path,
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

  public get app(): C["app"] {
    try {
      if (this.parsed.app === undefined)
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

  public get user(): C["user"] {
    try {
      if (this.parsed.user === undefined)
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

  private _cachedSetting?: C;
}

module.exports = Setting;
