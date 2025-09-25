export default class File<Class extends string> {
  private static readonly manager = FileManager.local();
  private readonly path;
  private readonly parent;
  private readonly mutable;
  private state: Null<
    | "Folder"
    | "File"
  > = null;

  constructor(
    Class: Literalful<Class>,
    name: string,
    subfolder = "",
    {
      hidden = false,
      mutable = false,
      temporary = false,
    } = {},
  ) {
    if (hidden && !mutable)
      this.error(
        "construct",
        Class.concat(": Hidden file must be mutable"),
      );

    const root = (
      hidden
        ? File
            .manager[
              `${
                temporary
                  ? "cache"
                  : "library"
              }Directory`
            ]()
        : File
            .manager
            .bookmarkedPath("root")
    )
      .concat(
        "/",
        Class,
      ),
    subpath = [
      ...subfolder.split("/"),
      ...name.split("/"),
    ]
      .filter(node => node !== "");

    if (subpath.length === 0)
      this.error(
        "construct",
        Class.concat(": File has empty subpath"),
      );

    this.path = [root, ...subpath]
      .join("/");
    this.parent = [root, ...subpath.slice(0, -1)]
      .join("/");
    this.mutable = mutable;

    if (File.manager.fileExists(this.path))
      this.state = File.manager.isDirectory(this.path)
        ? "Folder"
        : "File";
  }

  public read(fail = false) {
    if (this.state === "File")
      return File.manager.readString(this.path);
    else if (this.state === null) {
      if (fail)
        throw this.error(
          "read",
          "File does not exist",
          "Reference",
        );

      return undefined;
    }
    else
      throw this.error(
        "read",
        "Target is folder",
      );
  }

  public readString(fail?: boolean) {
    return this.read(fail) ?? "";
  }

  public readStringful() {
    const content = this.readString(true);

    if (content === "")
      throw this.error(
        "readStringful",
        "File is empty",
      );

    return content as stringful;
  }

  public write(
    content:
      | string
      | number
      | boolean
      | Record<string, unknown> = "",
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    if (!this.mutable)
      throw this.error(
        "write",
        "Readonly",
      );

    if (this.state === "File") {
      if (overwrite === false)
        throw this.error(
          "write",
          "File exists, but overwrite mode false",
          "Reference",
        );
    }
    else if (this.state === null) {
      if (!File.manager.isDirectory(this.parent))
        File.manager.createDirectory(
          this.parent,
          true,
        );
    }
    else
      throw this.error(
        "write",
        "Target is folder",
      );

    File.manager.writeString(
      this.path,
      typeof content === "object"
        ? JSON.stringify(content)
        : typeof overwrite === "boolean" || this.state === null
          ? String(content)
          : overwrite === "line"
            ? String(content)
                .concat(
                  "\n",
                  this.readString(),
                )
            : this
                .readString()
                .concat(content as string),
    );
    this.state = "File";
  }

  public delete() {
    if (!this.mutable)
      throw this.error(
        "delete",
        "Readonly",
      );

    if (this.state !== null) {
      File.manager.remove(this.path);
      this.state = null;
    }
  }

  private error(
    verb: string,
    message: string,
    error:
      | "Reference"
      | "Type" = "Type",
  ) {
    return new Error(
      `Failed to ${verb} file`,
      {
        cause: new Error(
          this.path,
          {
            cause: error === "Type"
              ? new TypeError(message)
              : new ReferenceError(message),
          },
        ),
      },
    );
  }
}
