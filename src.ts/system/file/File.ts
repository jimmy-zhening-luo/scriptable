// type Bookmark = importModule("Bookmark");
class File {
  subpath: string = String();
  // readonly bookmark: Bookmark = new Bookmark();
  constructor (
    // bookmark: Bookmark = new Bookmark(),
    subpath: string = String()
  ) {
    this.subpath = subpath;
    // this.bookmark = bookmark;
  }
  
  static fromFile (
    file: this,
    relativePath: string = String()
  ): this {
    // this.bookmark = file.bookmark,
    this.subpath = this.walkPath(
      file.subpath,
      relativePath
    );
  }
  
  get bookmarkedPath(): string {
    /*
    return this.constructor.trimPath(
      this.bookmark.path
    );
    */
    return String();
  }
  
  get data(): string {
    if (this.isReadable)
      return FileManager.iCloud().readString(
        this.path
      );
    else
      return String();
  }
  
  get descendants(): this.constructor[] {
    if (this.isFile)
      return [this];
    else if (this.isBottom)
      return (
        new Array<this.constructor>()
      );
    else if (this.isDirectory) {
      return this.ls.map(
        (leaf: string): string => (
          this.constructor.joinPaths(
            this.subpath,
            this.constructor.trimPath(
              leaf
            )
          )
        )
      ).map(
        (subpath: string): (
          this.constructor
        ) => (
          new this.constructor(
            subpath
          )
        )
      ).filter(
        (file: this.constructor) => (
          !this.path.startsWith(
            file.path
          )
        )
      ).map(
        (file: this.constructor): (
          Array<this.constructor>
        ) => (
          file.descendants
        )
      ).flat(Infinity);
    }
    else
      return (
        new Array<this.constructor>()
      );
  }
  
  get exists(): boolean {
    return (
      this.parentExists
      && FileManager.iCloud().fileExists(
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
    return FileManager.iCloud().isDirectory(
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
    return this.constructor.trimPath(
      this.path.split("/").slice(-1)
    );
  }
  
  get ls(): string[] {
    return this.isDirectory?
      FileManager.iCloud().listContents(
        this.path
      )
      :new Array<string>();
  }
  
  get parent(): this.constructor {
    return new this.constructor(
      // this.bookmark,
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
    return this.constructor.trimPath(
      this.subpath.split("/").slice(0, -1).join("/")
    );
  }
  
  get path(): string {
    return this.constructor.joinPaths(
      this.bookmarkedPath,
      this.subpath 
    );
  }
  
  get pathTree(): string[] {
    return this.constructor.pathToTree(
      this.path
    );
  }
  
  get root(): string {
    return this.bookmarkedPath;
  }
  
  get subpath(): string {
    return this.constructor.trimPath(
      this.subpath
    );
  }
  
  set subpath (
    path: string = String()
  ): void {
    this.subpath = this.constructor.trimPath(
        path
    );
  }
  
  get subpathTree(): string[] {
    return this.constructor.pathToTree(
      this.subpath
    );
  }
  
  cd (
    relativePath: string = String()
  ): void {
    this.subpath = this.constructor.trimPath(
        this.subpathRelativeTo(
          this.constructor.trimPath(
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
        FileManager.iCloud().remove(
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
            FileManager.iCloud().remove(
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
    return this.constructor.trimPath(
      this.constructor.walkPath(
        this.path,
        this.constructor.trimPath(
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
    return this.constructor.trimPath(
      this.constructor.walkPath(
        this.subpath,
        this.constructor.trimPath(
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
        FileManager.iCloud().createDirectory(
          this.parentPath,
          true
        );
      FileManager.iCloud().writeString(
        this.path,
        data
      );
    }
  }
  
  static joinPaths (
    left: string = String(),
    right: string = String()
  ): string {
    left = this.trimPath(left);
    right = this.trimPath(right);
    return this.trimPath(
      FileManager.iCloud().joinPath(
        left,
        right
      )
    );
  }
  
  static pathToTree (
    path: string = String()
  ): string[] {
    return this.trimPath(
      path
    )
    .split("/")
    .map(
      (node: string): string => (
        this.trimPath(
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
    return this.trimPath(
      tree.map(
        (node: string): string => (
          this.trimPath(
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
    const pathTree: string[] = this.pathToTree(
        this.trimPath(
          path
        )
      );
    const relPathTree = this.pathToTree(
        this.trimPath(
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
    return this
    .trimPath(
      this
      .treeToPath(
        pathTree
      )
    );
  }
}

module.exports = File;
