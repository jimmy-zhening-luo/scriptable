class Filepath {

  readonly raw: string;
  private readonly _path: Types.stringful[];

  constructor(
    path?:
      | Parameters<typeof Filepath.identity>[0]
      | Filepath,
    requiredPathSegment: string = ""
  ) {
    this.raw = path === undefined ?
      ""
      : Array.isArray(path) ?
        Filepath.flattenToString(path)
        : typeof path === "string" ?
          path
          : path.toString();
    this._path = this.parse(
      this.raw,
      requiredPathSegment
    );
  }

  protected parse(
    path: typeof Filepath.prototype.raw,
    requiredPathSegment: typeof Filepath.prototype.requiredPathSegment
  ): string[] {
    return Filepath.validate(
      path,
      requiredPathSegment
    )
  }

  get path(): string {
    return Filepath.flattenToString(this._path);
  }

  get pathTree(): string[] {
    return this._path;
  }

  get isValid(): boolean {
    return this._path.length > 0;
  }

  toString(): typeof Filepath.prototype.path {
    return this.path;
  }

  toTree(): typeof Filepath.prototype.pathTree {
    return this.pathTree;
  }

  append(
    subpath: ConstructorParameters<typeof Filepath>[0] = ""
  ): Filepath {
    return new Filepath(
      Filepath.join(
        this.path,
        new Filepath(
          subpath
        ).path
      )
    );
  }

  cd() {

  }

  protected static identity(
    path:
      | string
      | string[]
  ): string | string[] {
    return path;
  }

  protected static flattenToString(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ) {
    return Array.isArray(path) ?
      path.join("/")
      : path;
  }

  protected static flattenToTuple(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ): string[] {
    return Filepath
      .flattenToString(path)
      .split("/");
  }

  protected static trimEdges(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ): string {
    return Filepath.ValidString.clean(
      Filepath.flattenToString(path),
      {
        trim: true,
        trimLeading: [
          ...Filepath.ValidString.Char.slash
        ],
        trimTrailing: [
          ...Filepath.ValidString.Char.slash
        ]
      }
    );
  }

  static trim(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ): string {
    return Filepath.trimEdges(path);
  }

  protected static trimNodes(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ) {
    return new Filepath.StringSplitter(
      path,
      "/",
      {
        trim: true,
        trimTokens: true,
        ignoreEmptyTokens: true
      }
    )
      .merged
      .join("/");
  }

  static clean(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ): string {
    return Filepath.trimNodes(path);
  }

  static join(
    left: Parameters<typeof Filepath.identity>[0],
    right: Parameters<typeof Filepath.identity>[0] = ""
  ): string {
    return FileManager.iCloud().joinPath(
      Filepath.clean(left),
      Filepath.clean(right)
    );
  }

  static walk(
    currentPath: Parameters<typeof Filepath.identity>[0],
    relativePath: Parameters<typeof Filepath.identity>[0] = ""
  ): null | string {
    const relPathTree: string[] = typeof relativePath ===

      Filepath.pathToTree(
        Filepath.trimPath(
          relativePath
        )
      );



    const pathTree: string[] = (
      relPathTree
        .length > 0
      && relPathTree
        .find(node =>
          node
            .trim() !== ""
        ).trim() === "."
    ) ?
      []
      : Filepath
        .pathToTree(
          Filepath
            .trimPath(
              path
            )
        );

    relPathTree.forEach(
      (node) => {
        if (node.trim() === "..")
          pathTree
            .pop();
        else if (node.trim() !== "")
          pathTree.push(node);
      }
    );

    return Filepath.trimPath(
      Filepath.treeToPath(pathTree)
    );
  }

  static toString(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ): string {
    return Filepath.clean(path);
  }

  static toTree(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ): string[] {
    return Filepath.toString(path).split("/");
  }

  protected get ValidString(): typeof ValidString {
    return Filepath.ValidString;
  }

  protected get StringSplitter(): typeof StringSplitter {
    return Filepath.StringSplitter;
  }

  static get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    return importModule("validfilepathrepeater/ValidFilepathRepeater");
  }

  static get ValidString(): typeof ValidString {
    return Filepath.ValidFilepathRepeater.ValidString;
  }

  static get StringSplitter(): typeof StringSplitter {
    return Filepath.ValidFilepathRepeater.StringSplitter;
  }

}

module.exports = Filepath;
