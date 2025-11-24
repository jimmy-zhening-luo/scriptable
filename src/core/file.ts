declare const app: unique symbol;
export type app = stringful & { [app]: "class" };

const enum State {
  None,
  File,
  Folder,
}

const enum Overwrite {
  No,
  Yes,
  Append,
  Push,
}

const enum Break {
  Path = "/",
  Line = "\n",
}

export default class File<
  Mutable extends boolean,
  Type extends string,
  Subpath extends string,
  Folder extends (Subpath extends stringful ? string : app),
> {
  private readonly path;
  private readonly parent;
  private state: State = State.None;

  constructor(
    type: Literalful<Type>,
    file: Subpath,
    folder: Folder extends app
      ? app
      : Exclusion<Folder, Break.Path> extends ` ${string}`
        ? never
        : Exclusion<Folder, Break.Path>,
    hidden: True<Mutable> | false = false,
    temporary: True<Mutable> | false = false,
  ) {
    void (File.manager ??= FileManager.local());

    const drive = (
      hidden
        ? temporary
          ? File.manager.cacheDirectory()
          : File.manager.libraryDirectory()
        : File.manager.bookmarkedPath("root")
    )
    + Break.Path
    + type,
    directory = drive
      + Break.Path
      + folder,
    subpath = file
      .split(Break.Path)
      .filter(node => node);

    switch (subpath.length) {
    case 0:
      this.parent = drive;
      this.path = directory;
      break;
    case 1:
      this.parent = directory;
      this.path = directory
        + Break.Path
        + subpath[0]!;
      break;
    default: {
      const leaf = subpath.pop()!;

      this.parent = directory
        + Break.Path
        + subpath.join(Break.Path);
      this.path = this.parent
        + Break.Path
        + leaf;
    }
    }

    if (File.manager.fileExists(this.path))
      this.state = File.manager.isDirectory(this.path)
        ? State.Folder
        : State.File;
  }

  public static serialize(data: unknown) {
    switch (typeof data) {
    case "string":
      return data;
    case "object":
      return JSON.stringify(data);
    default:
      return String(data);
    }
  }

  public read() {
    return this.state === State.File
      ? File.manager!.readString(this.path)
      : undefined;
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
      ? Overwrite.No
      : Overwrite = Overwrite.No,
  ) {
    switch (this.state) {
    case State.File:
      if (!overwrite)
        return;

      break;
    case State.None:
      if (!File.manager!.isDirectory(this.parent))
        File.manager!.createDirectory(
          this.parent,
          true,
        );

      break;
    default:
      return;
    }

    if (Array.isArray(content)) {
      const rows = content.map(File.serialize);

      if (this.state)
        switch (overwrite as Overwrite.Append | Overwrite.Push) {
        case Overwrite.Append:
          void rows.unshift(this.read()!);

          break;
        case Overwrite.Push:
          rows[rows.length] = this.read()!;
        }

      File.manager!.writeString(
        this.path,
        rows.join(Break.Line),
      );
    }
    else
      File.manager!.writeString(
        this.path,
        overwrite === Overwrite.Yes
          || !this.state
          ? File.serialize(content)
          : overwrite === Overwrite.Append
            ? this.read()! + String(content)
            : File.serialize(content)
              + Break.Line
              + this.read()!
      );

    this.state = State.File;
  }

  public delete(process: True<Mutable> | false) {
    if (this.state && process) {
      File.manager!.remove(this.path);
      this.state = State.None;
    }
  }

  private static manager?: FileManager;
}
