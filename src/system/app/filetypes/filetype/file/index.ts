import type { vstring } from "../../../../../common/valid/string/index";

class File<M extends boolean> {
  public readonly name: string;
  public readonly path: string;
  public readonly subpath: string;
  private readonly parent: string;
  private readonly manager = FileManager.local();

  constructor(
    public readonly mutable: M,
    alias: string,
    ...subpaths: string[]
  ) {
    try {
      const bookmark = File.bookmark(alias),
      subpath = subpaths
        .flatMap(
          subpath => subpath
            .split("/")
            .map(node => node.trim())
            .filter((node): node is stringful => node.length > 0)
            .map(node => File.node(node)),
        ),
      parent = subpath.slice(0, -1);

      this.name = File.append(alias, subpath);
      this.path = File.append(bookmark, subpath);
      this.parent = File.append(bookmark, parent);
      this.subpath = subpath.join("/");
    }
    catch (e) {
      throw new Error(`File`, { cause: e });
    }
  }

  private static get vstring() {
    return importModule<typeof vstring>("../../../../../common/valid/string/index");
  }

  public get isDirectory() {
    return this.manager.isDirectory(this.path);
  }

  public get isFile() {
    return this.manager.fileExists(this.path);
  }

  private static bookmark(bookmark: string) {
    try {
      const alias = bookmark.trim(),
      manager = FileManager.iCloud();

      if (alias.length < 1)
        throw new TypeError(`Empty bookmark alias`);
      else if (!manager.bookmarkExists(alias))
        throw new ReferenceError(`Bookmark does not exist`);
      else
        return manager.bookmarkedPath(alias);
    }
    catch (e) {
      throw new ReferenceError(`File: bookmark (${bookmark})`, { cause: e });
    }
  }

  private static node(node: stringful) {
    return File.vstring<"filenode">(
      node,
      [":", "/"] as char[],
      { max: 255 as Positive<int> },
    );
  }

  private static append(bookmark: string, subpath: readonly vstring<"filenode">[]) {
    return [bookmark, ...subpath].join("/");
  }

  public read(fail = false) {
    try {
      const { path, isFile } = this;

      if (!isFile)
        if (fail)
          throw new ReferenceError(`File does not exist`);
        else
          return "";
      else
        return this.manager.readString(path);
    }
    catch (e) {
      throw new Error(`File: read (${this.name})`, { cause: e });
    }
  }

  public readful(error = this.name) {
    try {
      const read = this.read(true);

      if (read.length > 0)
        return read as stringful;
      else
        throw new TypeError(`Empty file is not stringful`, { cause: error });
    }
    catch (e) {
      throw new Error(`File: readful`, { cause: e });
    }
  }

  public write(
    string: string,
    overwrite:
      | "line"
      | "append"
      | boolean = false,
  ) {
    try {
      const {
        mutable,
        isDirectory,
        isFile,
        path,
        manager,
      } = this;

      if (!mutable)
        throw new TypeError("Readonly file");
      else
        if (isDirectory)
          throw new ReferenceError("Write path is folder");
        else
          if (isFile)
            if (overwrite === false)
              throw new ReferenceError("Existing file, overwrite false");
            else
              manager.writeString(path, overwrite === "append" ? [this.read(), string].join("") : overwrite === "line" ? [string, this.read()].join("\n") : string);
          else {
            this.mkdir();
            manager.writeString(path, string);
          }
    }
    catch (e) {
      throw new Error(`File: write (${this.name})`, { cause: e });
    }
  }

  public delete() {
    try {
      this.manager.remove(this.path);
    }
    catch (e) {
      throw new Error(`File: delete (${this.name})`, { cause: e });
    }
  }

  private mkdir() {
    const { parent, manager } = this;

    if (!manager.isDirectory(parent))
      manager.createDirectory(parent, true);
  }
}

module.exports = File;
export type { File };
