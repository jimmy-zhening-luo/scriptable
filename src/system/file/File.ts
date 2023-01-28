class _Bookmark {
  readonly bookmark: string;
  readonly path: string;
  constructor(
    bookmark: string = String()
  ) {
    this.bookmark = bookmark.trim();
    this.path = this.bookmark === String() ?
      String()
      : FileManager.iCloud()
        .bookmarkedPath(bookmark);
  }

  toString(): string {
    return this.path;
  }
}

class _File {
  #subpath: string = String();
  readonly bookmark: _Bookmark;
  constructor();
  constructor(
    subpath: string
  );
  constructor(
    bookmark: _Bookmark,
    subpath?: string
  );
  constructor(
    file: _File,
    relativePath?: string
  );
  constructor(
    base: _Bookmark
      | _File
      | string = new _Bookmark(),
    subpath: string = String()
  ) {
    if (base instanceof _Bookmark) {
      this.bookmark = base;
      this.subpath = subpath;
    }
    else if (base instanceof _File) {
      this.bookmark = base.bookmark;
      this.subpath = _File.walkPath(
        base.subpath,
        subpath
      );
    }
    else {
      this.bookmark = new _Bookmark();
      this.subpath = base;
    }
  }

  get bookmarkedPath(): string {
    return this.bookmark.path;
  }

  get data(): string {
    return this.isReadable ?
      _File.m.readString(this.path)
      : String();
  }

  get descendants(): _File[] {
    return this.isFile ?
      [this]
      : this.isBottom ?
        []
        : !this.isDirectory ?
          []
          : this.ls.map(
            (leaf: string): string => (
              _File.joinPaths(
                this.subpath,
                _File.trimPath(leaf)
              )
            )
          ).map(
            (subpath: string): _File => (
              new _File(subpath)
            )
          ).filter(
            (file: _File) => (
              !this.path
                .startsWith(
                  file.path
                )
            )
          ).map(
            (file: _File):
              Array<_File> => (
              file.descendants
            )
          ).flat(1);
  }

  get exists(): boolean {
    return this.parentExists
      && _File.m
        .fileExists(this.path);
  }

  get isBottom(): boolean {
    return this.isFile
      || (
        Array.isArray(this.ls)
        && this.ls.length === 0
      );
  }

  get isDirectory(): boolean {
    return _File.m
      .isDirectory(this.path);
  }

  get isEnumerable(): boolean {
    return this.isDirectory;
  }

  get isFile(): boolean {
    return this.exists
      && !this.isDirectory;
  }

  get isReadable(): boolean {
    return this.isFile;
  }

  get isTop(): boolean {
    return this
      .subpath === this
        .parentSubpath;
  }

  get leaf(): string {
    return _File.trimPath(
      this.path
        .split("/")
        .slice(-1)
        .shift()
      ?? String()
    );
  }

  get ls(): Array<string> {
    return this.isDirectory ?
      _File
        .m.listContents(
          this.path
        )
      : [];
  }

  get parent(): _File {
    return new _File(
      this.bookmark,
      this.parentSubpath
    );
  }

  get parentExists(): boolean {
    return this.parent
      .isDirectory;
  }

  get parentIsSelf(): boolean {
    return this.isTop;
  }

  get parentPath(): string {
    return this.parent
      .path;
  }

  get parentSubpath(): string {
    return _File.trimPath(
      this.subpath
        .split("/")
        .slice(0, -1)
        .join("/")
    );
  }

  get path(): string {
    return _File
      .joinPaths(
        this.root,
        this.subpath
      );
  }

  get pathTree(): Array<string> {
    return _File
      .pathToTree(this.path);
  }

  get root(): string {
    return this.bookmarkedPath;
  }

  get subpath(): string {
    return this.#subpath;
  }

  set subpath (
    path: string
  ) {
    this.#subpath = _File
      .trimPath(path);
  }

  get subpathTree(): Array<string> {
    return _File
      .pathToTree(this.subpath);
  }

  cd (
    relativePath: string
  ): void {
    this.subpath = _File.trimPath(
      this.subpathRelativeTo(
        _File.trimPath(relativePath)
      )
    );
  }

  delete (
    force: boolean = false
  ): void {
    if (this.exists) {
      if (force)
        _File.m.remove(
          this.path
        );
      else {
        const confirm: Alert = new Alert();
        confirm.message = String(
          "Are you sure you want to delete this file or folder (including all descendants)? Path: "
          + this.path
        );
        confirm.addDestructiveAction(
          "Yes, DELETE this file"
        );
        confirm.addCancelAction(
          "Cancel"
        );
        confirm.present().then(
          (userChoice: number) => (
            (userChoice === 0)?
            _File.m.remove(
              this.path
            )
            :console.log(
              "User canceled file deletion."
            )
          )
        );
      }
    }
  }

  pathRelativeTo (
    relativePath: string
  ): string {
    return _File.trimPath(
      _File.walkPath(
        this.path,
        _File.trimPath(relativePath)
      )
    );
  }

  read(): string {
    return this.data;
  }

  subpathRelativeTo(
    relativePath: string
  ): string {
    return _File.trimPath(
      _File.walkPath(
        this.subpath,
        _File.trimPath(relativePath)
      )
    );
  }

  toString(): string {
    return this.path;
  }

  write (
    data: string,
    overwrite: boolean = false
  ): void {
    if (this.isDirectory)
      throw new ReferenceError(
        "File:write: File path points to a folder. Cannot write data to a folder."
      );
    else if (
      this.exists
      && !overwrite
    )
      throw new ReferenceError(
        "File:write: File already exists. To overwrite existing data, write must be called with overwrite === true."
      );
    else {
      if (!this.parentExists)
        _File.m.createDirectory(
          this.parentPath,
          true
        );
      _File.m.writeString(
        this.path,
        data
      );
    }
  }

  protected static get m(): FileManager {
    return FileManager.iCloud();
  }

  static joinPaths (
    left: string,
    right: string = String()
  ): string {
    return _File.trimPath(
      _File.m.joinPath(
        _File.trimPath(left),
        _File.trimPath(right)
      )
    );
  }

  static pathToTree (
    path: string
  ): Array<string> {
    return _File
      .trimPath(path)
      .split("/")
      .map(
        (node: string): string => (
          _File.trimPath(node)
        )
      )
      .filter(
        (node: string) => (
          node.trim() !== String()
        )
      );
  }

  static treeToPath (
    tree: Array<string>
  ): string {
    return _File.trimPath(tree
      .map(
        (node: string): string => (
          _File.trimPath(node)
        )
      )
      .filter(
        (node: string) => (
          node.trim() !== String()
        )
      )
      .join("/")
      .trim()
    );
  }

  static trimPath (
    path: string
  ): string {
    path = path.trim();
    while (path.startsWith("/"))
      path = path.slice(1);
    while (path.endsWith("/"))
      path = path.slice(0, -1);
    return path.trim();
  }

  static walkPath (
    path: string,
    relativePath: string = String()
  ): string {
    const pathTree: Array<string> = _File
      .pathToTree(
        _File.trimPath(path)
      );
    const relPathTree = _File
      .pathToTree(
        _File.trimPath(relativePath)
      );

    relPathTree.forEach(
      (node: string) => {
        if (node.trim() === "..")
          pathTree.pop();
        else if (node.trim() !== String())
          pathTree.push(node);
      }
    );

    return _File.trimPath(
      _File.treeToPath(pathTree)
    );
  }
}

class _ReadOnlyFile extends _File {
  override delete() {
    throw new ReferenceError("File::ReadOnlyFile:delete(): Cannot delete a read-only file or folder.");
  }

  override write() {
    throw new ReferenceError("File::ReadOnlyFile:write(): Cannot write to or overwrite a read-only file.");
  }
}

module.exports = _File;
module.exports.File = _File;
module.exports.ReadOnlyFile = _ReadOnlyFile;
module.exports.Bookmark = _Bookmark;
