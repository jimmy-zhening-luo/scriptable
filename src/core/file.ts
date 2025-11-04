import type { app } from ".";

const enum State {
  None,
  File,
  Folder,
}

export default class File<
  Mutable extends boolean,
  Type extends string,
  Subpath extends string,
  Folder extends (Subpath extends stringful ? string : app),
> {
  private static readonly manager = FileManager.local();
  private readonly path;
  private readonly parent;
  private state: State = State.None;

  constructor(
    type: Literalful<Type>,
    file: Subpath,
    folder: Folder extends app ? app : Exclusion<Folder, "/" | " ">,
    hidden: True<Mutable> | false = false,
    temporary: True<Mutable> | false = false,
  ) {
    const drive = (
      hidden
        ? temporary
          ? File.manager.cacheDirectory()
          : File.manager.libraryDirectory()
        : File.manager.bookmarkedPath("root")
    ) + "/" + type as stringful,
    directory = drive + "/" + folder as stringful,
    subpath = file
      .split("/")
      .filter((node): node is stringful => node !== "");

    switch (subpath.length) {
    case 0:
      this.parent = drive;
      this.path = directory;
      break;
    case 1:
      this.parent = directory;
      this.path = directory + "/" + subpath[0]! as stringful;
      break;
    default: {
      const leaf = subpath.pop()!;

      this.parent = directory + "/" + subpath.join("/") as stringful;
      this.path = this.parent + "/" + leaf as stringful;
    }
    }

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

    switch (state) {
    case State.File:
      if (overwrite === false)
        return;

      break;
    case State.None:
      if (!File.manager.isDirectory(this.parent))
        File.manager.createDirectory(
          this.parent,
          true,
        );

      break;
    default:
      return;
    }

    if (Array.isArray(content)) {
      const rows = content.map(
        line => typeof line === "object"
          ? JSON.stringify(line)
          : String(line),
      );

      if (state === State.File)
        switch (overwrite) {
        case "append":
          void rows.unshift(this.read()!);

          break;
        case "push":
          rows[rows.length] = this.read()!;

          break;
        default:
          break;
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
              ? String(content) + "\n" + this.read()!
              : this.read()! + String(content),
      );

    this.state = State.File;
  }

  public delete(process: True<Mutable> | false) {
    if (this.state !== State.None && process) {
      File.manager.remove(this.path);
      this.state = State.None;
    }
  }
}
