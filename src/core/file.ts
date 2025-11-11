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
    ) + Break.Path + type,
    directory = drive
      + Break.Path
      + folder,
    subpath = file
      .split(Break.Path)
      .filter(node => node !== "");

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

  public read() {
    if (this.state === State.File)
      return File.manager!.readString(this.path);

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
      ? Overwrite.No
      : Overwrite = Overwrite.No,
  ) {
    const state = this.state;

    switch (state) {
    case State.File:
      if (overwrite === Overwrite.No)
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
      function stringify(data: unknown) {
        return typeof data === "object"
          ? JSON.stringify(data)
          : String(data);
      }

      const rows = content.map(stringify);

      if (state === State.File)
        switch (overwrite as Exclude<typeof overwrite, Overwrite.No | Overwrite.Yes>) {
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
        typeof content === "object"
          ? JSON.stringify(content)
          : overwrite === Overwrite.Yes
            || this.state === State.None
            ? String(content)
            : overwrite === Overwrite.Push
              ? String(content)
              + Break.Line
              + this.read()!
              : this.read()! + String(content),
      );

    this.state = State.File;
  }

  public delete(process: True<Mutable> | false) {
    if (this.state !== State.None && process) {
      File.manager!.remove(this.path);
      this.state = State.None;
    }
  }

  private static manager?: FileManager;
}
