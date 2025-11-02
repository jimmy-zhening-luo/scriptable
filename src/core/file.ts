const enum State {
  None,
  File,
  Folder,
}

export default class File<
  Mutable extends boolean,
  Type extends string,
  Subpath extends string,
> {
  private static readonly manager = FileManager.local();
  private readonly path;
  private readonly parent;
  private state: State = State.None;

  constructor(
    type: Literalful<Type>,
    file: Subpath,
    folder: Subpath extends stringful ? string : stringful,
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
      .join("/") as stringful;
    this.path = leaf === undefined
      ? this.parent
      : this.parent + "/" + leaf as stringful;

    if (File.manager.fileExists(this.path))
      this.state = File.manager.isDirectory(this.path)
        ? State.Folder
        : State.File;
  }

  public read() {
    if (this.state === State.File)
      return File.manager.readString(this.path);

    return undefined;
  }

  public readString() {
    return this.read() ?? "";
  }

  public write(
    content: True<Mutable> extends never
      ? never
      : (
        | primitive
        | Table
        | Array<primitive | object>
        ),
    overwrite: True<Mutable> extends never
      ? never
      : (
        | boolean
        | "append"
        | "push"
        ),
  ) {
    const state = this.state;

    if (
      state === State.File
      && overwrite !== false
      || state === State.None
    ) {
      if (
        state === State.None
        && !File.manager.isDirectory(this.parent)
      )
        File.manager.createDirectory(
          this.parent,
          true,
        );

      if (Array.isArray(content)) {
        const rows = content.map(
          line => typeof line === "object"
            ? JSON.stringify(line)
            : String(line),
        );

        if (
          typeof overwrite === "string"
          && state === State.File
        )
          if (overwrite === "push")
            rows[rows.length] = this.read()!;
          else {
            const existing = this.read()!;

            if (existing !== "")
              void rows.unshift(existing);
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
              || state === State.None
              ? String(content)
              : overwrite === "push"
                ? String(content) + "\n" + this.read()!
                : this.read()! + String(content),
        );

      this.state = State.File;
    }
  }

  public delete(process: True<Mutable> | false) {
    if (this.state !== State.None && process) {
      File.manager.remove(this.path);
      this.state = State.None;
    }
  }
}
