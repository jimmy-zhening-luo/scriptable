export default class File<Class extends string> {
  private static readonly manager = FileManager.iCloud();
  private readonly path;
  private readonly parent;
  private readonly exists;
  private readonly type;

  constructor(
    Class: Literalful<Class>,
    name: string,
    subfolder = "",
    private readonly mutable = false,
    ephemeral = false,
  ) {
    try {
      const root = File.manager.bookmarkExists(Class)
        ? File.manager.bookmarkedPath(Class)
        : mutable
          ? [
              File.manager[
                ephemeral
                  ? "cacheDirectory"
                  : "libraryDirectory"
              ](),
              Class,
            ].join("/")
          : null;

      if (root === null)
        throw new ReferenceError("No directory root provided");

      const subpath = [subfolder, name]
        .join("/")
        .split("/")
        .filter(segment => segment !== "");

      if (subpath.length === 0)
        throw new ReferenceError("No file subpath provided");

      this.path = [
        root,
        ...subpath,
      ].join("/");
      this.parent = [
        root,
        ...subpath
          .slice(0, -1),
      ].join("/");
      this.exists = File.manager.fileExists(
        this.path,
      );
      this.type = File.manager.isDirectory(
        this.path,
      )
        ? "Folder" as const
        : "File" as const;
    }
    catch (e) {
      throw new Error(
        "Failed to construct File handler",
        {
          cause: new Error(
            `<${Class}> ${subfolder}/${name}`,
            { cause: e },
          ),
        },
      );
    }
  }

  public read(fail = false) {
    try {
      if (this.exists)
        if (this.type === "Folder")
          throw new TypeError("Filesystem object is Folder");
      else {
        if (fail)
          throw new ReferenceError("File does not exist");

        return undefined;
      }

      return File.manager.readString(this.path);
    }
    catch (e) {
      throw this.error("read", e);
    }
  }

  public readString(fail?: boolean): string {
    return this.read(fail) ?? "";
  }

  public readStringful() {
    const content = this.readString(true);

    if (content === "")
      throw this.error(
        "readStringful",
        new TypeError("Empty file content"),
      );

    return content as stringful;
  }

  public write(
    content:
      | string
      | number
      | boolean
      | ReadonlyRecord<string, unknown>,
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    try {
      if (!this.mutable)
        throw new TypeError("Readonly File");
      else if (this.type === "Folder")
        throw new TypeError("Filesystem object is Folder");
      else if (this.exists) {
        if (overwrite === false)
          throw new ReferenceError("File already exists, but `overwrite:false`");
      }
      else if (
        !File.manager.isDirectory(
          this.parent,
        )
      )
        File.manager.createDirectory(
          this.parent,
          true,
        );

      File.manager.writeString(
        this.path,
        typeof content === "object"
          ? JSON.stringify(content)
          : typeof overwrite !== "string"
            ? String(content)
            : overwrite === "line"
              ? [
                  String(content),
                  this.readString(),
                ].join("\n")
              : this.readString()
                + String(content),
      );
    }
    catch (e) {
      throw this.error("write", e);
    }
  }

  public delete() {
    try {
      if (!this.mutable)
        throw new ReferenceError("Readonly File/Folder");

      if (this.exists)
        File.manager.remove(
          this.path,
        );
    }
    catch (e) {
      throw this.error("delete", e);
    }
  }

  private error(
    verb: string,
    error: unknown,
  ) {
    return new Error(
      `Failed to ${verb} file`,
      {
        cause: new Error(
          this.path,
          { cause: error },
        ),
      },
    );
  }
}
