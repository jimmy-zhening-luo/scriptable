const set_Filetype: typeof Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Setting<
  C extends Config = Record<string, never>,
> extends set_Filetype<
    "Setting"
  > {
  constructor(
    appType: string,
    appName: string,
  ) {
    try {
      super(
        "Setting",
        Setting.ReadOnlyIOFile,
        appType,
        appName + ".json",
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
        const parsedJson: unknown = JSON.parse(
          this.readful(),
        );

        if (parsedJson !== undefined)
          this._cachedSetting = parsedJson as C;
        else
          throw new TypeError(
            `Setting file parsed to valid JSON, but has invalid schema: ${this._file.path}`,
          );
      }

      return this._cachedSetting;
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
        throw new ReferenceError(
          `No app setting found`,
        );
      else
        return this.parsed.app;
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
        throw new ReferenceError(
          `No user setting found`,
        );
      else
        return this.parsed.user;
    }
    catch (e) {
      throw new EvalError(
        `Setting: user`,
        { cause: e },
      );
    }
  }

  private _cachedSetting?: C;
}

module.exports = Setting;
