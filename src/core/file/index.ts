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
    file: string,
    folder = "",
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
        ? File.manager[
            `${
              temporary
                ? "cache"
                : "library"
            }Directory`
          ]()
        : File.manager.bookmarkedPath("root")
    )
      .concat(
        "/",
        Class,
      ),
    subpath = folder
      .split("/")
      .concat(
        file.split("/"),
      )
      .filter(
        node => node !== "",
      );

    this.path = [root]
      .concat(subpath)
      .join("/");
    this.parent = [root]
      .concat(subpath.slice(0, -1))
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

    if (this.state === "Folder")
      throw this.error(
        "read",
        "Target is folder",
      );
    else
      if (fail)
        throw this.error(
          "read",
          ReferenceError("File does not exist"),
        );

    return undefined;
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
          ReferenceError("File exists, but overwrite mode false"),
        );
    }
    else if (this.state === "Folder")
      throw this.error(
        "write",
        "Target is folder",
      );
    else
      if (!File.manager.isDirectory(this.parent))
        File.manager.createDirectory(
          this.parent,
          true,
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
    message: string | Error,
  ) {
    return Error(
      `Failed to ${verb} file`,
      {
        cause: Error(
          this.path,
          {
            cause: typeof message === "string"
              ? TypeError(message)
              : message,
          },
        ),
      },
    );
  }
}
