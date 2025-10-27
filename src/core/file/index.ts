const enum State {
  None,
  File,
  Folder,
}

export default class File<
  Type extends string,
  Mutable extends boolean,
> {
  private static readonly manager = FileManager.local();
  private readonly path;
  private readonly parent;
  private readonly mutable;
  private state: State = State.None;

  constructor(
    type: Literalful<Type>,
    file: string,
    folder: string,
    mutable: Mutable,
    hidden: True<Mutable> | false = false,
    temporary: True<Mutable> | false = false,
  ) {
    const root = hidden
      ? temporary
        ? File.manager.cacheDirectory()
        : File.manager.libraryDirectory()
      : File.manager.bookmarkedPath("root"),
    subpath = folder
      .split("/")
      .concat(file.split("/"))
      .filter(node => node !== ""),
    leaf = subpath.pop();

    this.parent = [root, type]
      .concat(subpath)
      .join("/");
    this.path = leaf === undefined
      ? this.parent
      : this.parent + "/" + leaf;
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
        "File does not exist",
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
      | primitive
      | Table<unknown>
      | Array<primitive | object> = "",
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
          "File exists, but overwrite mode false",
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

    if (Array.isArray(content)) {
      const rows = content.map(
        line => typeof line === "object"
          ? JSON.stringify(content)
          : String(content)
      );

      if (
        typeof overwrite === "string"
        && this.state === State.File
      )
        if (overwrite === "push")
          rows[rows.length] = this.read()!;
        else {
          const existing = this.read()!;

          if (existing !== "")
            rows.unshift(existing);
        }

      File.manager.writeString(
        this.path,
        rows.join("\n"),
      );
    }
    else
      File.manager.writeString(
        this.path,
        typeof content === "object"
          ? JSON.stringify(content)
          : overwrite === true
          || this.state === State.None
            ? String(content)
            : overwrite === "push"
              ? content + "\n" + this.read()!
              : this.read()! + content,
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
    cause: string | Error,
  ) {
    return Error(
      `Failed to ${verb} file`,
      {
        cause: ReferenceError(
          this.path,
          { cause },
        ),
      },
    );
  }
}
