import Filetype from "./filetype";

class Storage extends Filetype<"Storage", true> {
  constructor(
    app: stringful,
    name: string,
    ext: string,
  ) {
    super(
      "Storage",
      true,
      app,
      name,
      ext,
    );
  }

  public override write(
    data:
      | undefined
      | null
      | string
      | number
      | boolean
      | (string | number | boolean)[]
      | Record<string, unknown>,
    overwrite: Parameters<Filetype<never>["write"]>[1] = true,
  ) {
    if (data === null || typeof data === "undefined")
      throw new TypeError("Write data is null", { cause: data });

    this.file.write(
      ...Array.isArray(data)
        ? [
            data.reverse().join("\n"),
            overwrite === false ? false : "line",
          ] as const
        : typeof data === "object"
          ? [
              JSON.stringify(data),
              overwrite !== false,
            ] as const
          : [
              String(data),
              overwrite,
            ] as const,
    );
  }

  public override delete(): void {
    this.file.delete();
  }
}

export default Storage;
