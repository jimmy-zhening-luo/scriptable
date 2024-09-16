import type { Filetype } from "./filetype/index";

const cFiletype = importModule<typeof Filetype>("./filetype/index");

class Setting<AT extends string, Schema> extends cFiletype<"Setting", AT> {
  constructor(
    apptype: literalful<AT>,
    app: stringful,
  ) {
    const file = app;

    super(
      "Setting",
      apptype,
      false,
      file,
      "json",
    );
  }

  public get parse(): Schema {
    try {
      const setting: unknown = JSON.parse(this.readful());

      if (typeof setting !== "object" || setting === null)
        throw new TypeError("Setting file has wrong schema", { cause: this.read() });
      else {
        Object.defineProperty(this, "parse", { value: setting, writable: false });

        return setting as Schema;
      }
    }
    catch (e) {
      throw new SyntaxError(`Setting: parse (${this.name})`, { cause: e });
    }
  }

  protected write(): never {
    throw new ReferenceError("Storage: write forbidden");
  }
}

module.exports = Setting;
export type { Setting };
