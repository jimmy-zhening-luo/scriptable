class File {
  readonly _nominalType: string = "File";
  private readonly _root: FilepathString = new File.FilepathString();
  private _subpath: FilepathString = new File.FilepathString();

  constructor(
    rootOrFile:
      | ConstructorParameters<typeof FilepathString>[0]
      | Bookmark
      | File = "",
    subpath?: ConstructorParameters<typeof FilepathString>[0],
    treatFilepathAsRoot: boolean = false,
  ) {
    try {
      if (rootOrFile instanceof File) {
        if (treatFilepathAsRoot) {
          this._root = new FilepathString(rootOrFile.path);
          this.subpath = subpath;
        } else {
          this._root = new File.FilepathString(rootOrFile.root);
          this.subpath = rootOrFile.subpath;
          if (subpath !== undefined) this.subpath = subpath;
        }
      } else if (rootOrFile instanceof File.Bookmark) {
        this._root = new File.FilepathString(rootOrFile.path);
        this.subpath = subpath;
      } else {
        this._root = new File.FilepathString(rootOrFile);
        this.subpath = subpath;
      }
    } catch (e) {
      throw new SyntaxError(
        `File: constructor: Error constructing File: \n${e}`,
      );
    }
  }

  get root(): ReturnType<typeof FilepathString.prototype.toString> {
    try {
      return this._root.toString();
    } catch (e) {
      throw new Error(`File: root: Error getting root: \n${e}`);
    }
  }

  get top(): typeof File.prototype.root {
    try {
      return this.root;
    } catch (e) {
      throw new Error(`File: top: Error getting top: \n${e}`);
    }
  }

  get subpath(): ReturnType<typeof FilepathString.prototype.toString> {
    try {
      return this._subpath.toString();
    } catch (e) {
      throw new Error(`File: subpath: Error getting subpath: \n${e}`);
    }
  }

  set subpath(subpath: ConstructorParameters<typeof FilepathString>[0]) {
    try {
      this._subpath = new File.FilepathString(subpath);
    } catch (e) {
      throw new Error(`File: subpath: Error setting subpath: \n${e}`);
    }
  }

  append(subpath: Parameters<typeof FilepathString.prototype.append>[0]): this {
    try {
      this.subpath = this._subpath.append(subpath);
      return this;
    } catch (e) {
      throw new Error(`File: append: Error appending subpath: \n${e}`);
    }
  }

  cd(relativePath: Parameters<typeof FilepathString.prototype.cd>[0]): this {
    try {
      this.subpath = this._subpath.cd(relativePath);
      return this;
    } catch (e) {
      throw new Error(`File: cd: Error changing directory: \n${e}`);
    }
  }

  private get _path(): FilepathString {
    try {
      return this._root.append(this.subpath);
    } catch (e) {
      throw new Error(`File: _path: Error getting path: \n${e}`);
    }
  }

  get path(): ReturnType<typeof FilepathString.prototype.toString> {
    try {
      return this._path.toString();
    } catch (e) {
      throw new Error(`File: path: Error getting path: \n${e}`);
    }
  }

  get tree(): ReturnType<typeof FilepathString.prototype.toTree> {
    try {
      return this._path.toTree();
    } catch (e) {
      throw new Error(`File: tree: Error getting tree: \n${e}`);
    }
  }

  toString(): typeof File.prototype.path {
    try {
      return this.path;
    } catch (e) {
      throw new Error(`File: toString: Error getting path: \n${e}`);
    }
  }

  toTree(): typeof File.prototype.tree {
    try {
      return this.tree;
    } catch (e) {
      throw new Error(`File: toTree: Error getting tree: \n${e}`);
    }
  }

  get leaf(): string {
    try {
      return this.subpath === "" ? this._root.leaf : this._subpath.leaf;
    } catch (e) {
      throw new Error(`File: leaf: Error getting leaf: \n${e}`);
    }
  }

  get isTop(): boolean {
    try {
      return this.subpath === "";
    } catch (e) {
      throw new Error(
        `File: isTop: Error checking whether file is top: \n${e}`,
      );
    }
  }

  get isDirectory(): boolean {
    try {
      return File.Manager.isDirectory(this.path);
    } catch (e) {
      throw new Error(
        `File: isDirectory: Error using Scriptable FileManager class to check whether path is directory: \n${e}`,
      );
    }
  }

  get isFile(): boolean {
    try {
      return !this.isDirectory && File.Manager.fileExists(this.path);
    } catch (e) {
      throw new Error(
        `File: isFile: Error using Scriptable FileManager class to check whether path is file: \n${e}`,
      );
    }
  }

  get exists(): boolean {
    try {
      return this.isFile || this.isDirectory;
    } catch (e) {
      throw new Error(
        `File: exists: Error checking whether file exists: \n${e}`,
      );
    }
  }

  get isEnumerable(): boolean {
    try {
      return this.isDirectory;
    } catch (e) {
      throw new Error(
        `File: isEnumerable: Error checking whether file is enumerable: \n${e}`,
      );
    }
  }

  get isReadable(): boolean {
    try {
      return this.isFile;
    } catch (e) {
      throw new Error(
        `File: isReadable: Error checking whether file is readable: \n${e}`,
      );
    }
  }

  get parentSubpath(): string {
    try {
      return this._subpath.parent;
    } catch (e) {
      throw new Error(
        `File: parentSubpath: Error getting parent subpath: \n${e}`,
      );
    }
  }

  get isOwnParent(): boolean {
    try {
      return this.subpath === this.parentSubpath;
    } catch (e) {
      throw new Error(
        `File: isOwnParent: Error checking whether file is own parent: \n${e}`,
      );
    }
  }

  get parent(): File {
    try {
      return new File(this.root, this.parentSubpath);
    } catch (e) {
      throw new Error(`File: parent: Error getting parent File object: \n${e}`);
    }
  }

  get parentPath(): string {
    try {
      return this.parent.path;
    } catch (e) {
      throw new Error(`File: parentPath: Error getting parent path: \n${e}`);
    }
  }

  get parentIsDirectory(): boolean {
    try {
      return this.parent.isDirectory;
    } catch (e) {
      throw new Error(
        `File: parentIsDirectory: Error checking whether parent is directory: \n${e}`,
      );
    }
  }

  get ls(): string[] {
    try {
      return this.isDirectory ? File.Manager.listContents(this.path) : [];
    } catch (e) {
      throw new Error(
        `File: ls: Error using Scriptable FileManager class to list contents of directory: \n${e}`,
      );
    }
  }

  get isBottom(): boolean {
    try {
      return (
        !this.exists ||
        this.isFile ||
        (this.isDirectory && this.ls.length === 0)
      );
    } catch (e) {
      throw new Error(
        `File: isBottom: Error checking whether file is bottom: \n${e}`,
      );
    }
  }

  get descendants(): File[] {
    try {
      return this.isFile
        ? [this]
        : this.isBottom
        ? []
        : this.ls
            .map(leaf => new File(this.root, this.subpath).append(leaf))
            .filter(child => !this.path.startsWith(child.path))
            .map(file => file.descendants)
            .flat(1);
    } catch (e) {
      throw new Error(`File: Error getting descendants: \n${e}`);
    }
  }

  get data(): string {
    try {
      if (!this.isReadable)
        throw new ReferenceError(
          `File is not readable. File must be a file and must exist.`,
        );
      return File.Manager.readString(this.path);
    } catch (e) {
      if (!(e instanceof ReferenceError))
        e = new Error(
          `Caught unhandled exception while using Scriptable FileManager class to read data. See unhandled exception: \n${e}`,
        );
      throw new Error(
        `File: data: Error reading file at "${this.path}": \n${e}`,
      );
    }
  }

  read(): typeof File.prototype.data {
    try {
      return this.data;
    } catch (e) {
      throw new Error(`File: read: Error reading file: \n${e}`);
    }
  }

  write(data: typeof File.prototype.data, overwrite: boolean = false): this {
    try {
      if (this.isDirectory)
        throw new ReferenceError(
          "File path points to a folder. Cannot write data to a folder.",
        );
      else if (this.isReadable && !overwrite)
        throw new ReferenceError(
          "Overwrite is set to false. To overwrite an existing file, write must be called with overwrite === true.",
        );
      else {
        if (!this.parentIsDirectory)
          try {
            File.Manager.createDirectory(this.parentPath, true);
          } catch (e) {
            throw new ReferenceError(
              `Could not create parent directory using Scriptable file manager.See previous error: \n${e}`,
            );
          }
        try {
          File.Manager.writeString(this.path, data);
        } catch (e) {
          throw new Error(
            `Caught unhandled exception trying to write data to file using Scriptable FileManager class. See unhandled exception: \n${e}`,
          );
        }
        return this;
      }
    } catch (e) {
      throw new Error(
        `File: write: Error writing data to file "${this.path}": \n${e}`,
      );
    }
  }

  delete(force: boolean = false): this {
    try {
      if (this.exists) {
        if (force) _deleteUsingFileManager(this.path);
        else {
          const confirm: Alert = new Alert();
          confirm.message = `Are you sure you want to delete this file or folder (including all descendants)? Path: ${this.path}`;
          confirm.addDestructiveAction("Yes, DELETE this file");
          confirm.addCancelAction("Cancel");
          confirm.present().then(userChoice => {
            userChoice === 0
              ? _deleteUsingFileManager(this.path)
              : console.warn(
                  `User canceled file deletion of file or folder at path: ${this.path}`,
                );
          });
        }
      }

      function _deleteUsingFileManager(path: string): void {
        try {
          File.Manager.remove(path);
          if (File.Manager.fileExists(path))
            throw new ReferenceError(
              `File still exists after attempting to delete it using Scriptable FileManager class.`,
            );
        } catch (e) {
          if (!(e instanceof ReferenceError))
            e = new Error(
              `Caught unhandled exception trying to delete file using Scriptable FileManager class. See unhandled exception: \n${e}`,
            );
          throw new Error(`_deleteUsingFileManager: \n${e}`);
        }
      }

      return this;
    } catch (e) {
      throw new Error(`File: delete: Error deleting file: \n${e}`);
    }
  }

  static join(
    ...paths: Parameters<typeof FilepathString.join>
  ): ReturnType<typeof FilepathString.join> {
    try {
      return File.FilepathString.join(...paths);
    } catch (e) {
      throw new Error(`File: join: Error joining paths: \n${e}`);
    }
  }

  static mutate(
    ...paths: Parameters<typeof FilepathString.mutate>
  ): ReturnType<typeof FilepathString.mutate> {
    try {
      return File.FilepathString.mutate(...paths);
    } catch (e) {
      throw new Error(`File: mutate: Error mutating paths: \n${e}`);
    }
  }

  static toString(
    ...paths: Parameters<typeof FilepathString.toString>
  ): ReturnType<typeof FilepathString.toString> {
    try {
      return File.FilepathString.toString(...paths);
    } catch (e) {
      throw new Error(
        `File: toString: Error converting paths to string: \n${e}`,
      );
    }
  }

  static toTree(
    ...paths: Parameters<typeof FilepathString.toTree>
  ): ReturnType<typeof FilepathString.toTree> {
    try {
      return File.FilepathString.toTree(...paths);
    } catch (e) {
      throw new Error(`File: toTree: Error converting paths to tree: \n${e}`);
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null &&
        instance !== undefined &&
        typeof instance === "object" &&
        "_nominalType" in instance &&
        (instance as File)._nominalType === "File"
      );
    } catch (e) {
      throw new Error(`File: Error checking if instance is File: \n${e}`);
    }
  }

  static get Bookmark(): typeof Bookmark {
    try {
      return importModule("bookmark/Bookmark");
    } catch (e) {
      throw new Error(`File: Error importing Bookmark class: \n${e}`);
    }
  }

  static get FilepathString(): typeof FilepathString {
    try {
      return importModule("filepathstring/FilepathString");
    } catch (e) {
      throw new Error(`File: Error importing FilepathString class: \n${e}`);
    }
  }

  static get Manager(): FileManager {
    try {
      return File.Bookmark.Manager;
    } catch (e) {
      throw new Error(`File: Error getting FileManager class: \n${e}`);
    }
  }
}

module.exports = File;
