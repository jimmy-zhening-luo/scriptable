class Filepath {

  readonly _nominalType: string = "Filepath";
  private readonly _tree: Filepath.PathTree;

  constructor(
    path:
      | string
      | string[]
      | Filepath = "",
    requiredPathSegment: string = ""
  ) {
    this._tree = this.parse(
      path,
      requiredPathSegment
    );
  }

  get tree(): Filepath.PathTree {
    return this._tree;
  }

  get path(): string {
    return this.flattenRaw(this.tree);
  }

  get isValid(): boolean {
    return this.tree.length > 0;
  }

  get parent(): string {
    return this.cd("..").toString();
  }

  get leaf(): string {
    return this.isValid ?
      this.tree[this.tree.length - 1]
      : "";
  }

  append(
    subpath: ConstructorParameters<typeof Filepath>[0],
    requiredPathSegment: ConstructorParameters<typeof Filepath>[1] = ""
  ): Filepath {
    return new Filepath(
      this.walk(subpath),
      requiredPathSegment
    );
  }

  cd(
    relativePath: ConstructorParameters<typeof Filepath>[0],
    requiredPathSegment: ConstructorParameters<typeof Filepath>[1] = ""
  ): Filepath {
    return new Filepath(
      this.walk(relativePath, true),
      requiredPathSegment
    );
  }

  toTree(): typeof Filepath.prototype.tree {
    return this.tree;
  }

  toString(): typeof Filepath.prototype.path {
    return this.path;
  }

  private walk(
    relativePath: ConstructorParameters<typeof Filepath>[0],
    backtrackOnDotDot: boolean = false
  ): string[] {
    const relativeTree: string[] = this.validate(relativePath);
    const walked: string[] = this.tree;
    for (const node of relativeTree) {
      if (
        node === ".."
        && backtrackOnDotDot
      )
        walked.pop();
      else
        walked.push(node);
    }
    return new Filepath(walked).toTree();
  }

  private parse(
    path: ConstructorParameters<typeof Filepath>[0],
    requiredPathSegment: string
  ): string[] {
    const parsed: string[] = this.validate(path);
    return this.flattenRaw(parsed).includes(requiredPathSegment) ?
      parsed
      : [];
  }

  private validate(
    path: ConstructorParameters<typeof Filepath>[0]
  ): string[] {
    return this
      .clean(path)
      .some(node =>
        new this
          .ValidFilepathRepeater(node)
          .value === null
      ) ?
      []
      : this.clean(path);
  }

  private clean(
    path: ConstructorParameters<typeof Filepath>[0]
  ): string[] {
    return new this.StringSplitter(
      this.treeifyRaw(path),
      "/",
      {
        trim: true,
        trimTokens: true,
        ignoreEmptyTokens: true
      }
    ).toTuple();
  }

  private treeifyRaw(
    path: ConstructorParameters<typeof Filepath>[0]
  ): string[] {
    return this
      .flattenRaw(path)
      .split("/");
  }

  private flattenRaw(
    path: ConstructorParameters<typeof Filepath>[0] = ""
  ): string {
    return Array.isArray(path) ?
      path.join("/")
      : typeof path === "string" ?
        path
        : path.toString();
  }

  static join(
    left: ConstructorParameters<typeof Filepath>[0],
    right: ConstructorParameters<typeof Filepath>[0] = "",
    requiredPathSegment: ConstructorParameters<typeof Filepath>[1] = ""
  ): string {
    return new Filepath(left)
      .append(right, requiredPathSegment)
      .toString();
  }

  static mutate(
    path: ConstructorParameters<typeof Filepath>[0],
    relativePath: ConstructorParameters<typeof Filepath>[0] = "",
    requiredPathSegment: ConstructorParameters<typeof Filepath>[1] = ""
  ): string {
    return new Filepath(path)
      .cd(relativePath, requiredPathSegment)
      .toString();
  }

  static toString(
    path: ConstructorParameters<typeof Filepath>[0]
  ): ReturnType<typeof Filepath.prototype.toString> {
    return new Filepath(path).toString();
  }

  static toTree(
    path: ConstructorParameters<typeof Filepath>[0]
  ): ReturnType<typeof Filepath.prototype.toTree> {
    return new Filepath(path).toTree();
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return (
      instance !== null
      && instance !== undefined
      && typeof instance === "object"
      && "_nominalType" in instance
      && instance._nominalType === "Filepath"
    );
  }

  private get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    return Filepath.ValidFilepathRepeater;
  }

  private get StringSplitter(): typeof StringSplitter {
    return Filepath.StringSplitter;
  }

  static get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    return importModule("validfilepathrepeater/ValidFilepathRepeater");
  }

  static get StringSplitter(): typeof StringSplitter {
    return Filepath.ValidFilepathRepeater.StringSplitter;
  }

}

namespace Filepath {

  export type PathTree =
    MinTuple<
      stringful<string>,
      0
    >;

}

module.exports = Filepath;
