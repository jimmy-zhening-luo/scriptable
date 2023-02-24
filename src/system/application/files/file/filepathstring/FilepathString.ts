class FilepathString {

  readonly _nominalType: string = "FilepathString";
  private readonly _tree: FilepathString.PathTree;

  constructor(
    path:
      | string
      | string[]
      | FilepathString = "",
    requiredPathSegment: string = ""
  ) {
    this._tree = this.parse(
      path,
      requiredPathSegment
    );
  }

  get tree(): FilepathString.PathTree {
    return this._tree;
  }

  get path(): string {
    return this.flattenRaw(this.tree);
  }

  get isEmpty(): boolean {
    return this.tree.length === 0;
  }

  get parent(): string {
    return this.cd("..").toString();
  }

  get leaf(): string {
    return !this.isEmpty ?
      this.tree[this.tree.length - 1]
      : "";
  }

  append(
    subpath: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = ""
  ): FilepathString {
    return new FilepathString(
      this.walk(subpath),
      requiredPathSegment
    );
  }

  cd(
    relativePath: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = ""
  ): FilepathString {
    return new FilepathString(
      this.walk(relativePath, true),
      requiredPathSegment
    );
  }

  toTree(): typeof FilepathString.prototype.tree {
    return this.tree;
  }

  toString(): typeof FilepathString.prototype.path {
    return this.path;
  }

  private walk(
    relativePath: ConstructorParameters<typeof FilepathString>[0],
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
    return new FilepathString(walked).toTree();
  }

  private parse(
    path: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: string
  ): string[] {
    const parsed: string[] = this.validate(path);
    return this.flattenRaw(parsed).includes(requiredPathSegment) ?
      parsed
      : [];
  }

  private validate(
    path: ConstructorParameters<typeof FilepathString>[0]
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
    path: ConstructorParameters<typeof FilepathString>[0]
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
    path: ConstructorParameters<typeof FilepathString>[0]
  ): string[] {
    return this
      .flattenRaw(path)
      .split("/");
  }

  private flattenRaw(
    path: ConstructorParameters<typeof FilepathString>[0] = ""
  ): string {
    return Array.isArray(path) ?
      path.join("/")
      : typeof path === "string" ?
        path
        : path.toString();
  }

  static join(
    left: ConstructorParameters<typeof FilepathString>[0],
    right: ConstructorParameters<typeof FilepathString>[0] = "",
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = ""
  ): string {
    return new FilepathString(left)
      .append(right, requiredPathSegment)
      .toString();
  }

  static mutate(
    path: ConstructorParameters<typeof FilepathString>[0],
    relativePath: ConstructorParameters<typeof FilepathString>[0] = "",
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = ""
  ): string {
    return new FilepathString(path)
      .cd(relativePath, requiredPathSegment)
      .toString();
  }

  static toString(
    path: ConstructorParameters<typeof FilepathString>[0]
  ): ReturnType<typeof FilepathString.prototype.toString> {
    return new FilepathString(path).toString();
  }

  static toTree(
    path: ConstructorParameters<typeof FilepathString>[0]
  ): ReturnType<typeof FilepathString.prototype.toTree> {
    return new FilepathString(path).toTree();
  }

  static [Symbol.hasInstance](instance: any): boolean {
    return (
      instance !== null
      && instance !== undefined
      && typeof instance === "object"
      && "_nominalType" in instance
      && instance._nominalType === "FilepathString"
    );
  }

  private get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    return FilepathString.ValidFilepathRepeater;
  }

  private get StringSplitter(): typeof StringSplitter {
    return FilepathString.StringSplitter;
  }

  static get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    try {
      return importModule("validfilepathrepeater/ValidFilepathRepeater");
    } catch (e) {
      console.error(`Filepath.ts: Failed to import module ValidFilepathRepeater: ${e}`);
      throw e;
    }
  }

  static get StringSplitter(): typeof StringSplitter {
    return FilepathString.ValidFilepathRepeater.StringSplitter;
  }

  static get Manager(): FileManager {
    return FileManager.iCloud();
  }

}

namespace FilepathString {

  export type PathTree =
    MinTuple<
      stringful<string>,
      0
    >;

}

module.exports = FilepathString;
