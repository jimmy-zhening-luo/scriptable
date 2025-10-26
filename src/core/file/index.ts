const enum State {
  None,
  File,
  Folder,
}

export default class File<Class extends string> {
  private static readonly manager = FileManager.local();
  private readonly path;
  private readonly parent;
  private readonly mutable;
  private state: State = State.None;

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

    const root = hidden
      ? temporary
        ? File.manager.cacheDirectory()
        : File.manager.libraryDirectory()
      : File.manager.bookmarkedPath("root"),
    subpath = folder
      .split("/")
      .concat(
        file.split("/"),
      )
      .filter(
        node => node !== "",
      ),
    leaf = subpath.pop();

    this.parent = [
      root,
      Class,
    ]
      .concat(subpath)
      .join("/"),
    this.path = leaf === undefined
      ? this.parent
      : this.parent.concat(
          "/",
          leaf,
        );
    this.mutable = mutable;

    if (File.manager.fileExists(this.path))
      this.state = File.manager.isDirectory(this.path)
        ? State.Folder
        : State.File;
  }

  public read(fail = false) {
    if (this.state === State.File)
      return File.manager.readString(this.path);

    if (this.state === State.Folder)
      throw this.error(
        "read",
        "Target is folder",
      );

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
      | boolean
      | "append"
      | "push" = false,
  ) {
    if (!this.mutable)
      throw this.error(
        "write",
        "Readonly",
      );

    if (this.state === State.File) {
      if (overwrite === false)
        throw this.error(
          "write",
          ReferenceError("File exists, but overwrite mode false"),
        );
    }
    else if (this.state === State.Folder)
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
        : overwrite === true || this.state === State.None
          ? String(content)
          : overwrite === "push"
            ? String(content)
                .concat(
                  "\n",
                  this.readString(),
                )
            : this
                .readString()
                .concat(content as string);
    );
    this.state = State.File;
  }

  public delete() {
    if (!this.mutable)
      throw this.error(
        "delete",
        "Readonly",
      );

    if (this.state !== State.None) {
      File.manager.remove(this.path);
      this.state = State.None;
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
