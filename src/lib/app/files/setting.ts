import File from "./file";

class Setting<Schema> extends File<"Setting"> {
  constructor(filename: stringful) {
    super(
      "Setting",
      false,
      filename,
    );
  }

  public get parse(): Schema {
    const setting: unknown = JSON.parse(this.readful());

    if (typeof setting !== "object" || setting === null)
      throw new TypeError("Setting file is not JSON");

    Object.defineProperty(this, "parse", { value: setting, writable: false });

    return setting as Schema;
  }
}

export default Setting;
