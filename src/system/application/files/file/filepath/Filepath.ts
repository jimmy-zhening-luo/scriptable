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
        Filepath.joinArray(path)
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
    return Filepath.joinArray(this._path);
  }

  get tree(): string[] {
    return this._path;
  }

  get isValid(): boolean {
    return this._path.length > 0;
  }

  toString(): typeof Filepath.prototype.path {
    return this.path;
  }

  toTree(): typeof Filepath.prototype.tree {
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
    _path:
      | string
      | string[]
  ): void { }


  private static joinArray(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ): string {
    return Array.isArray(path) ?
      path.join("/")
      : path;
 }

  private static unrollArray(
    path: Parameters<typeof Filepath.identity>[0] = ""
  ): string[] {
    return Filepath
      .joinArray(path)
      .split("/");
  }

  private static deepClean(
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

  private static validate(
    path: Parameters<typeof Filepath.identity>[0] = "",
  ) {

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
    path: Parameters<typeof Filepath.identity>[0],
    relativePath: Parameters<typeof Filepath.identity>[0] = ""
  ): string {
    path = new Filepath(path).tree;
    for (const node of new Filepath(relativePath).tree) {
      if (node.trim() === "..")
        path
          .pop();
      else if (node.trim() !== "")
        path.push(node);
    }

    return new Filepath(path).path;

   * 3
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

namespace Filepath {
  export type Path = string;
  export type PathCandidate = string;
}

module.exports = Filepath;
