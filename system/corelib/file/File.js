const Bookmark = importModule("Bookmark");

class File {
  #subpath = String();
  #bookmark = new Bookmark();
  #m = FileManager.local();
  constructor (
    bookmark = new Bookmark(),
    subpath = String()
  ) {
    this.#m = this.constructor.Manager;
    this.subpath = subpath;
    this.#bookmark = (
      (bookmark instanceof Bookmark)?
        bookmark
        :new Bookmark()
    ) ?? new Bookmark();
  }
  
  static fromFile(
    file = new this(),
    relativePath = String()
  ) {
    if (!(file instanceof this))
      file = new this();
    if (relativePath
      ?.constructor !== String
    ) relativePath = String();
    const newSubpath = this
      .walkPath(
        file.subpath ?? String(),
        relativePath ?? String()
      );
    return new this(
      new Bookmark(
        file?.bookmark ?? String()
      ),
      newSubpath ?? String()
    ) ?? new this();
  }
  
  get bookmark() {
    return this
    .#bookmark
    ?.bookmark
    ?? String();
  } 
  
  get bookmarkedPath() {
    return this
    .constructor
    .trimPath(
      this
      .#bookmark
      ?.path
    ) ?? String();
  }
  
  get data() {
    try {
      if (!this.isReadable) {
        if (!this.exists)
          throw new ReferenceError(
            "path resolves to neither an existing file nor folder"
          );
        else if (this.isDirectory)
          throw new ReferenceError(
            "path resolves to a folder, not to a file"
          );
        else
          throw new ReferenceError(
            "(unhandled reason)"
          );
      }
      else {
        const data = this
          .#m
          .readString(
            this.path
            ?? String()
          );
        if (data?.constructor !== String)
          throw new ReferenceError(
            "Scriptable native FileManager object returned a non-String value when expecting a string"
          );
        else
          return data ?? String();
      }
    } catch (e) {
      console.warn(
        "File:data: Cannot read data from file. See caught error "
        + e
      );
      return String();
    }
  }
  
  get descendants() {
    if (this.isFile)
      return [this];
    else if (this.isBottom)
      return new Array();
    else if (this.isDirectory) {
      const children = this.ls?.map(
        (leaf) => (
          this.constructor.joinPaths(
            this.subpath
              ?? String(),
            this.constructor.trimPath(
              leaf
              ?? String()
            ) ?? String()
          ) ?? String()
        )
      )?.map(
        (subpath) => (
          new this.constructor(
            subpath ?? String()
          )
          ?? new this.constructor()
        )
      )?.filter(
        (file) => (
          !this.path?.startsWith(
            file?.path ?? String()
          )
        )
      );
      
      return children?.map(
        (file) => (
          file?.descendants
          ?? new Array()
        )
      ) ?? new Array();
    }
    else
      return new Array();
  }
  
  get exists() {
    return (
      this.parentExists === true
      && this.#m.fileExists(this.path) === true
    );
  }
  
  get isBottom() {
    return (
      this.isFile === true
      || (Array.isArray(this.ls)
        && this.ls.length === 0
      )
    );
  }
  
  get isDirectory() {
    return this.#m.isDirectory(
      this.path
    ) === true;
  }
  
  get isEnumerable() {
    return this.isDirectory === true;
  }
  
  get isFile() {
    return (
      this.exists
      && !this.isDirectory
    );
  }
  
  get isReadable() {
    return this.isFile === true;
  }
  
  get isTop() {
    return (
      this.subpath === this.parentSubpath
    );
  }
  
  get leaf() {
    return this
    .constructor
    .trimPath(
      this
      .subpath
      ?.split("/")
      ?.slice(-1)
      ?? String()
    ) ?? String();
  }
  
  get ls() {
    return this.isDirectory?
      (
        this.#m.listContents(this.path)
        ?? new Array()
      )
      :new Array();
  }
  
  get parent() {
    return new this.constructor(
      this.parentSubpath
      ?? String()
    ) ?? new this.constructor();
  }
  
  get parentExists() {
    return this.parent?.isDirectory === true;
  }
  
  get parentIsSelf() {
    return this.isTop === true;
  }
  
  get parentPath() {
    return this.parent?.path ?? String();
  }
  
  get parentSubpath() {
    return this.constructor.trimPath(
      this.subpath
      ?.split("/")
      ?.slice(0, -1)
      ?.join("/")
      ?? String()
    ) ?? String();
  }
  
  get path() {
    return this.constructor.joinPaths(
      this.bookmarkedPath
        ?? String(),
      this.subpath 
        ?? String()
    ) ?? String();
  }
  
  get pathTree() {
    return this
    .constructor
    .pathToTree(
      this.path
      ?? String()
    ) ?? new Array();
  }
  
  get root() {
    return this.bookmarkedPath ?? String();
  }
  
  get subpath() {
    return this.constructor.trimPath(
      this.#subpath
      ?? String()
    ) ?? String();
  }
  
  set subpath(path = String()) {
    this.#subpath = this
      .constructor
      .trimPath(
        path?.constructor === String?
          path
          :String()
      ) ?? String();
  }
  
  get subpathTree() {
    return this.constructor
      .pathToTree(
        this.subpath
        ?? String()
      ) ?? new Array();
  }
  
  cd(
    relativePath = String()
  ) {
    relativePath = relativePath
      ?.constructor === String?
        relativePath
        :String();
    this.subpath = this
      .constructor
      .trimPath(
        this.subpathRelativeTo(
          this
          .constructor
          .trimPath(
            relativePath
            ?? String()
          ) ?? String()
        ) ?? String()
      ) ?? String();
  }
  
  pathRelativeTo(
    relativePath = String()
  ) {
    relativePath = relativePath
      ?.constructor === String?
        relativePath
        :String();
    return this
      .constructor
      .trimPath(
        this.constructor.walkPath(
          this.path ?? String(),
          this
          .constructor
          .trimPath(
            relativePath
            ?? String()
          ) ?? String()
        ) ?? String()
      ) ?? String();
  }
  
  read() {
    return this.data ?? String();
  }
  
  subpathRelativeTo(
    relativePath = String()
  ) {
    relativePath = relativePath
      ?.constructor === String?
        relativePath
        :String();
    return this
      .constructor
      .trimPath(
        this.constructor.walkPath(
          this.subpath ?? String(),
          this
          .constructor
          .trimPath(
            relativePath
            ?? String()
          ) ?? String()
        ) ?? String()
      ) ?? String();
  }
  
  toString() {
    return this.path ?? String();
  }
  
  write(
    data = String(),
    overwrite = false
  ) {
    if (this.isDirectory)
      throw new ReferenceError(
        "File:write: File path points to a folder. Cannot write data to a folder."
      );
    else if (
      this.exists
      && overwrite !== true
    ) throw new ReferenceError(
        "File:write: File already exists. To overwrite existing data, write must be called with overwrite === true."
      );
    else {
      if (!this.parentExists) {
        this.#m.createDirectory(
          this.parentPath,
          true
        );
      }
      this.#m.writeString(
        this.path,
        data
      );
    }
  }
  
  static get Manager() {
    try {
      const m = FileManager?.local() ?? null;
      return m;
    } catch (e) {
      console.error("Fatal: File:Manager: Failed to get a FileManager.local() instance from the Scriptable  native library FileManager. See. caught error: " + e);
      return null;
    }
  }
  
  static joinPaths(
    l = String(),
    r = String()
  ) {
    l = this.trimPath(l) ?? String();
    r = this.trimPath(r) ?? String();
    return l === String()?
      r
      :r === String()?
        l
        :this.Manager.joinPath(l, r);
  }
  
  static pathToTree(
    path = String()
  ) {
    return this.trimPath(
      path
      ?? String()
    )?.split(
      "/"
    )?.map((node) => (
        this.trimPath(
          node
          ?? String()
        )
      )
    )?.filter((node) => (
        node?.constructor === String
      )
    )?.filter((node) => (
        node?.trim() !== String()
      )
    ) ?? new Array();
  }
  
  static treeToPath(
    tree = new Array()
  ) {
    tree = Array.isArray(tree)?
      tree
      :new Array();
    const path = tree
    ?.filter((node) => (
        node?.constructor === String
      )
    )?.map((node) => (
        this.trimPath(
          node
          ?? String()
        )
      )
    )?.filter((node) => (
        node?.trim() !== String()
      )
    )?.join(
      "/"
    )?.trim();
    
    return this.trimPath(
      path
      ?? String()
    ) ?? String();
  }
  
  static trimPath(
    path = String()
  ) {
    if (path?.constructor !== String) {
      if (Array.isArray(path)) {
        const p1 = path.flat(
          Infinity
        )?.shift() ?? String();
        path = p1?.constructor === String?
          first
          :String()
      } else path = String();
    }
    path = path?.trim() ?? String();
    while (path.startsWith("/"))
      path = path.slice(1);
    while (path.endsWith("/"))
      path = path.slice(0, -1);
    path = path?.trim() ?? String();
    return path ?? String();
  }
  
  static walkPath(
    path = String(),
    relativePath = String()
  ) {
    const pathTree = this.pathToTree(
      this.trimPath(
        path
        ?? String()
      )
      ?? String()
    ) ?? new Array();
    const relPathTree = this.pathToTree(
      this.trimPath(
        relativePath
        ?? String()
      )
      ?? String()
      ) ?? new Array();
    
    for (const node of relPathTree) {
      if (node.trim() === ".")
        pathTree.pop();
      else if (
        node?.constructor === String
        && node?.trim() !== String()
      )
        pathTree.push(String(node));
    }
    return this.trimPath(
      this.treeToPath(
        pathTree
        ?? new Array()
      ) ?? String()
    ) ?? String();
  }
}

class CloudFile extends File {
  static get Manager() {
    try {
      const m = FileManager?.iCloud() ?? null;
      return m;
    } catch (e) {
      console.error("Fatal: File:Manager: Failed to get a FileManager.iCloud() instance from the Scriptable  native library FileManager. See. caught error: " + e);
      return null;
    }
  }
}

class SecretsFile extends File {
  constructor(
    subpath = String()
  ) {
    super(
      new Bookmark("Local/Secrets"),
      subpath ?? String()
    );
  }
  
  get key() {
    return this.secret ?? String();
  }
  
  get secret() {
    return this.data ?? String();
  }
  
  write() {
    throw new ReferenceError("File::SecretsFile:write: Cannot overwrite a protected secrets file.");
  }
}

module.exports = File;
module.exports.Bookmark = Bookmark;
module.exports.File = File;
module.exports.CloudFile = CloudFile;
module.exports.SecretsFile = SecretsFile;
