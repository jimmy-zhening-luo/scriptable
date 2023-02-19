class Filepath {

  private _tree: Filepath.PathTree;

  constructor(
    path: Filepath.ConstructorInput = "",
    requiredPathSegment: string = ""
  ) {
    this._tree = this.parse(
      this.flattenRaw(path),
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

  append(
    subpath: Filepath.MutatorInput,
    requiredPathSegment: ConstructorParameters<typeof Filepath>[1] = ""
  ): this {
    this._tree = new Filepath(
      this.walk(subpath),
      requiredPathSegment
    )
      .toTree();
    return this;
  }

  cd(
    relativePath: Filepath.MutatorInput,
    requiredPathSegment: ConstructorParameters<typeof Filepath>[1] = ""
  ): this {
    this._tree = new Filepath(
      this.walk(relativePath, true),
      requiredPathSegment
    )
      .toTree();
    return this;
  }

  toTree(): typeof Filepath.prototype.tree {
    return this.tree;
  }

  toString(): typeof Filepath.prototype.path {
    return this.path;
  }

  private walk(
    relativePath: Filepath.MutatorInput,
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
    path: Filepath.MutatorInput,
    requiredPathSegment: string
  ): string[] {
    const parsed: string[] = this.validate(path);
    return this.flattenRaw(parsed).includes(requiredPathSegment) ?
      parsed
      : [];
  }

  private validate(
    path: Filepath.MutatorInput
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
    path: Filepath.MutatorInput
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
    path: Filepath.MutatorInput
  ): string[] {
    return this
      .flattenRaw(path)
      .split("/");
  }

  private flattenRaw(
    path: Filepath.ConstructorInput
  ): string {
    return Array.isArray(path) ?
      path.join("/")
      : typeof path === "string" ?
        path
        : path.toString();
  }

  static join(
    left: Filepath.ConstructorInput,
    right: Filepath.MutatorInput = "",
    requiredPathSegment: ConstructorParameters<typeof Filepath>[1] = ""
  ): string {
    return new Filepath(left)
      .append(right, requiredPathSegment)
      .toString();
  }

  static mutate(
    path: Filepath.ConstructorInput,
    relativePath: Filepath.MutatorInput = "",
    requiredPathSegment: ConstructorParameters<typeof Filepath>[1] = ""
  ): string {
    return new Filepath(path)
      .cd(relativePath, requiredPathSegment)
      .toString();
  }

  static toString(
    path: Filepath.ConstructorInput
  ): ReturnType<typeof Filepath.prototype.toString> {
    return new Filepath(path).toString();
  }

  static toTree(
    path: Filepath.ConstructorInput
  ): ReturnType<typeof Filepath.prototype.toTree> {
    return new Filepath(path).toTree();
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

  export type ConstructorInput = string | string[] | Filepath;
  export type MutatorInput = string | string[];
  export type PathTree =
    MinTuple<
      stringful<string>,
      0
    >;

}

module.exports = Filepath;
