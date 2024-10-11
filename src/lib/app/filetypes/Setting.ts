import type { Filetype } from "./filetype";

const cFiletype = importModule<typeof Filetype>("./filetype");

class Setting<T extends string, Schema> extends cFiletype<"Setting", T> {
  constructor(
    type: literalful<T>,
    app: stringful,
  ) {
    super(
      false,
      "Setting",
      type,
      null,
      app,
      "json",
    );
  }

  public get parse(): Schema {
    try {
      const setting: unknown = JSON.parse(this.readful());

      if (typeof setting !== "object" || setting === null)
        throw new TypeError("Setting file has wrong schema", { cause: this.read() });

      Object.defineProperty(this, "parse", { value: setting, writable: false });

      return setting as Schema;
    }
    catch (e) {
      throw new SyntaxError(`Setting: parse (${this.name})`, { cause: e });
    }
  }
}

module.exports = Setting;
export type { Setting };
