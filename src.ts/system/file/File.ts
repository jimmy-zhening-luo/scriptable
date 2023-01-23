class File {
  #subpath: string = String();
  readonly bookmark: typeof File.Bookmark = new File.Bookmark();
  constructor();
  constructor(
    subpath: string
  );
  constructor(
    bookmark: typeof File.Bookmark,
    subpath?: (string | undefined)
  );
  constructor(
    file: File,
    relativePath?: (string | undefined)
  );
  constructor(
    base?: (
      undefined
      | typeof File.Bookmark
      | File
      | string
    ),
    subpath?: (string | undefined)
  ) {
    if (base === undefined) {
      this.bookmark = new File.Bookmark();
      this.subpath = String();
    }
    else if (base instanceof Bookmark) {
      this.bookmark = base;
      if (subpath === undefined)
        this.subpath = String();
      else
        this.subpath = subpath;
    }
    else if (base instanceof File) {
      this.bookmark = base.bookmark;
      if (subpath === undefined)
        this.subpath = base.subpath;
      else
        this.subpath = File.walkPath(
          base.subpath,
          subpath
        );
    }
    else if (base.constructor===String) {
      this.bookmark = new File.Bookmark();
      this.subpath = base;
    }
  }
  
  
  static get Bookmark() {
    return importModule("Bookmark");
  }

  get bookmarkedPath(): string {
    return this.bookmark.path;
  }

  get data(): string {
    if (this.isReadable)
      return File.m.readString(
        this.path
      );
    else
      return String();
  }

  get descendants(): File[] {
    if (this.isFile)
      return [this];
    else if (this.isBottom)
      return (
        new Array<File>()
      );
    else if (this.isDirectory) {
      return this.ls.map(
        (leaf: string): string => (
          File.joinPaths(
            this.subpath,
            File.trimPath(
              leaf
            )
          )
        )
      ).map(
        (subpath: string): File => (
          new File(
            subpath
          )
        )
      ).filter(
        (file: File) => (
          !this.path.startsWith(
            file.path
          )
        )
      ).map(
        (file: File): (
          Array<File>
        ) => (
          file.descendants
        )
      ).flat(1);
    }
    else
      return (
        new Array<File>()
      );
  }

  get exists(): boolean {
    return (
      this.parentExists
      && File.m.fileExists(
        this.path
      )
    );
  }

  get isBottom(): boolean {
    return (
      this.isFile
      || (
        Array.isArray(this.ls)
        && this.ls.length === 0
      )
    );
  }

  get isDirectory(): boolean {
    return File.m.isDirectory(
      this.path
    );
  }

  get isEnumerable(): boolean {
    return this.isDirectory;
  }

  get isFile(): boolean {
    return (
      this.exists
      && !this.isDirectory
    );
  }

  get isReadable(): boolean {
    return this.isFile;
  }

  get isTop(): boolean {
    return (
      this.subpath === this.parentSubpath
    );
  }

  get leaf(): string {
    return File.trimPath(
      this.path.split("/").slice(-1).shift()
    );
  }

  get ls(): string[] {
    return this.isDirectory?
      File.m.listContents(
        this.path
      )
      :new Array<string>();
  }

  get parent(): File {
    return new File(
      this.bookmark,
      this.parentSubpath
    );
  }

  get parentExists(): boolean {
    return this.parent.isDirectory;
  }

  get parentIsSelf(): boolean {
    return this.isTop;
  }

  get parentPath(): string {
    return this.parent.path;
  }

  get parentSubpath(): string {
    return File.trimPath(
      this.subpath.split("/").slice(0, -1).join("/")
    );
  }

  get path(): string {
    return File.joinPaths(
      this.bookmarkedPath,
      this.subpath
    );
  }

  get pathTree(): string[] {
    return File.pathToTree(
      this.path
    );
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
    this.#subpath = File.trimPath(
        path
    );
  }

  get subpathTree(): string[] {
    return File.pathToTree(
      this.subpath
    );
  }

  cd (
    relativePath: string = String()
  ): void {
    this.subpath = File.trimPath(
        this.subpathRelativeTo(
          File.trimPath(
            relativePath
          )
        )
    );
  }

  delete (
    force: boolean = false
  ): void {
    if (this.exists) {
      if (force)
        File.m.remove(
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
            File.m.remove(
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
    relativePath: string = String()
  ): string {
    return File.trimPath(
      File.walkPath(
        this.path,
        File.trimPath(
          relativePath
        )
      )
    );
  }

  read(): string {
    return this.data;
  }

  subpathRelativeTo (
    relativePath: string = String()
  ): string {
    return File.trimPath(
      File.walkPath(
        this.subpath,
        File.trimPath(
          relativePath
        )
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
        File.m.createDirectory(
          this.parentPath,
          true
        );
      File.m.writeString(
        this.path,
        data
      );
    }
  }

  static get m(): FileManager {
    return FileManager.iCloud();
  }

  static joinPaths (
    left: string = String(),
    right: string = String()
  ): string {
    left = File.trimPath(left);
    right = File.trimPath(right);
    return File.trimPath(
      File.m.joinPath(
        left,
        right
      )
    );
  }

  static pathToTree (
    path: string = String()
  ): string[] {
    return File.trimPath(
      path
    )
    .split("/")
    .map(
      (node: string): string => (
        File.trimPath(
          node
        )
      )
    )
    .filter(
      (node: string) => (
        node.trim() !== String()
      )
    );
  }

  static treeToPath (
    tree: string[] = new Array<string>()
  ): string {
    return File.trimPath(
      tree.map(
        (node: string): string => (
          File.trimPath(
            node
          )
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
    path: string = String()
  ): string {
    path = path.trim();
    while (path.startsWith("/"))
      path = path.slice(1);
    while (path.endsWith("/"))
      path = path.slice(0, -1);
    path = path.trim();
    return path;
  }

  static walkPath (
    path: string = String(),
    relativePath: string = String()
  ): string {
    const pathTree: string[] = File.pathToTree(
        File.trimPath(
          path
        )
      );
    const relPathTree = File.pathToTree(
        File.trimPath(
          relativePath
        )
      );

    for (
      const node of relPathTree
    ) {
      if (node.trim() === ".")
        pathTree.pop();
      else if (node.trim() !== String())
        pathTree.push(
          node
        );
    }
    return File.trimPath(
      File.treeToPath(
        pathTree
      )
    );
  }
}

module.exports = File;
