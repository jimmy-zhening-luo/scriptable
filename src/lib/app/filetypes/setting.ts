import Filetype from "./filetype";

class Setting<Schema> extends Filetype<"Setting"> {
  constructor(
    app: stringful,
  ) {
    super(
      "Setting",
      false,
      null,
      app,
      "json",
    );
  }

  public get parse(): Schema {
    try {
      const setting: unknown = JSON.parse(this.readful());

      if (typeof setting !== "object" || setting === null)
        throw new TypeError("Setting file is not JSON");

      Object.defineProperty(this, "parse", { value: setting, writable: false });

      return setting as Schema;
    }
    catch (e) {
      throw new SyntaxError(`Setting: parse (${this.name})`, { cause: e });
    }
  }
}

export default Setting;
