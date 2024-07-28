const cFiletype = importModule<typeof Filetype>(
  "filetype/Filetype",
);

class Setting<AT extends string, Schema> extends cFiletype<"Setting", AT> {
  constructor(
    apptype: literalful<AT>,
    app: stringful,
  ) {
    const subpath = app;

    super(
      "Setting",
      apptype,
      false,
      "json",
      subpath,
    );
  }

  public get parse(): Schema {
    try {
      if (typeof this._cache === "undefined") {
        const setting: unknown = JSON.parse(this.readful());

        if (typeof setting === "object" && setting !== null)
          this._cache = setting as Schema;
        else
          throw new TypeError(
            "Setting file has wrong schema",
            { cause: this.read() },
          );
      }

      return this._cache;
    }
    catch (e) {
      throw new SyntaxError(
        `Setting: parse (${String(this)})`,
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
