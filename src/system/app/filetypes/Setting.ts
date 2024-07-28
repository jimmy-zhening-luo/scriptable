const cFiletype = importModule<typeof Filetype>(
  "filetype/Filetype",
);

class Setting<
  Class extends string,
  Schema,
> extends cFiletype<"Setting", Class> {
  constructor(
    category: literalful<Class>,
    app: stringful,
  ) {
    super(
      "Setting",
      category,
      false,
      `json`,
      app,
    );
  }

  public get parse(): Schema {
    try {
      if (typeof this._cache === "undefined") {
        const setting: unknown = JSON.parse(this.readful());

        if (
          typeof setting === "object"
          && setting !== null
          && Object.keys(setting).length > 0
        )
          this._cache = setting as Schema;
        else
          throw new TypeError(
            `Setting file does not match schema`,
            {
              cause: {
                file: this.subpath,
                content: this.read(),
              },
            },
          );
      }

      return this._cache;
    }
    catch (e) {
      throw new Error(
        `Setting: parse`,
        { cause: e },
      );
    }
  }

  public write(): never {
    throw new TypeError("Storage: write forbidden");
  }

  private _cache?: Schema;
}

module.exports = Setting;
