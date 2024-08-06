import type { vstring } from "../../../../../common/valid/string/index";

class File<Writable extends boolean> {
  public readonly name: string;
  public readonly path: string;
  public readonly subpath: string;
  private readonly parent: string;
  private readonly manager = FileManager.local();

  constructor(
    public readonly writable: Writable,
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
    catch (e) { throw new Error(`File`, { cause: e }); }
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
        throw new TypeError(`Bookmark alias is empty`);
      else if (!manager.bookmarkExists(alias))
        throw new ReferenceError(`Bookmark not found`);
      else
        return manager.bookmarkedPath(alias);
    }
    catch (e) { throw new ReferenceError(`File: bookmark (${bookmark})`, { cause: e }); }
  }

  private static node(node: stringful) {
    return File.vstring<"filenode">(
      node,
      [":", "/"] as char[],
      { max: 255 as Positive<int> },
    );
  }

  private static append(bookmark: string, subpath: readonly vstring<"filenode">[]) {
    return [bookmark, ...subpath.length > 0 ? [...subpath] : []].join("/");
  }

  public read(stringfully = false) {
    try {
      const { path, isFile } = this;

      if (!isFile)
        if (stringfully)
          throw new ReferenceError(`Tried to read non-existent file`);
        else
          return "";
      else
        return this.manager.readString(path);
    }
    catch (e) { throw new Error(`File: read (${this.name})`, { cause: e }); }
  }

  public readful(error = "") {
    try {
      const read = this.read(true);

      if (read.length < 1)
        throw new TypeError(error);
      else
        return read as stringful;
    }
    catch (e) { throw new Error(`File: readful (${this.name})`, { cause: e }); }
  }

  public write(string: string, overwrite: "line" | "append" | boolean = false) {
    try {
      const {
        writable,
        isDirectory,
        isFile,
        path,
        manager,
      } = this;

      if (!writable)
        throw new TypeError("File is readonly");
      else
        if (isDirectory)
          throw new TypeError("Write destination is folder");
        else
          if (isFile)
            if (overwrite === false)
              throw new TypeError("Existing file, overwrite:false");
            else
              manager.writeString(path, overwrite === "append" ? [this.read(), string].join("") : overwrite === "line" ? [string, this.read()].join("\n") : string);
          else {
            this.createParent();
            manager.writeString(path, string);
          }
    }
    catch (e) { throw new Error(`File: write (${this.name})`, { cause: e }); }
  }

  private createParent() {
    const { parent, manager } = this;

    if (!manager.isDirectory(parent))
      manager.createDirectory(parent, true);
  }
}

module.exports = File;
export type { File };
