class FilepathString {
  readonly _nominalType: string = "FilepathString";
  private _tree: string[];

  constructor(
    path: string | string[] | FilepathString = "",
    requiredPathSegment: string = "",
  ) {
    try {
      this._tree = this._parse(path, requiredPathSegment);
    } catch (e) {
      throw new Error(
        `FilepathString: constructor: Caught unhandled exception while instantiating FilepathString by parsing path: ${e}`,
      );
    }
  }

  private _parse(
    path: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: string,
  ): string[] {
    try {
      const parsed: string[] = this._validate(path);
      return this._flattenRaw(parsed).includes(requiredPathSegment)
        ? parsed
        : [];
    } catch (e) {
      throw new Error(
        `FilepathString: _parse: Caught unhandled exception while parsing path: ${e}`,
      );
    }
  }

  private _validate(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): string[] {
    try {
      return this._clean(path).some(
        node => new this.ValidFilepathRepeater(node).value === null,
      )
        ? []
        : this._clean(path);
    } catch (e) {
      throw new Error(
        `FilepathString: _validate: Caught unhandled exception while validating path: ${e}`,
      );
    }
  }

  private _clean(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): string[] {
    try {
      return new this.StringSplitter(this._treeifyRaw(path), "/", {
        trim: true,
        trimTokens: true,
        ignoreEmptyTokens: true,
      }).toTuple();
    } catch (e) {
      throw new Error(
        `FilepathString: _clean: Caught unhandled exception while cleaning path using StringSplitter instance: ${e}`,
      );
    }
  }

  private _treeifyRaw(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): string[] {
    try {
      return this._flattenRaw(path).split("/");
    } catch (e) {
      throw new Error(
        `FilepathString: _treeifyRaw: Caught unhandled exception while treeifying raw path: ${e}`,
      );
    }
  }

  private _flattenRaw(
    path: ConstructorParameters<typeof FilepathString>[0] = "",
  ): string {
    try {
      return Array.isArray(path)
        ? path.join("/")
        : typeof path === "string"
        ? path
        : path.toString();
    } catch (e) {
      throw new Error(
        `FilepathString: _flattenRaw: Caught unhandled exception while flattening raw path: ${e}`,
      );
    }
  }

  private _walk(
    relativePath: ConstructorParameters<typeof FilepathString>[0],
    backtrackOnDotDot: boolean = false,
  ): string[] {
    try {
      const relativeTree: string[] = this._validate(relativePath);
      const walked: string[] = this.tree;
      for (const node of relativeTree) {
        if (node === ".." && backtrackOnDotDot) walked.pop();
        else walked.push(node);
      }
      return new FilepathString(walked).toTree();
    } catch (e) {
      throw new Error(
        `FilepathString: _walk: Caught unhandled exception while walking path: ${e}`,
      );
    }
  }

  get tree(): typeof FilepathString.prototype._tree {
    try {
      return this._tree;
    } catch (e) {
      throw new Error(
        `FilepathString: get tree: Caught unhandled exception while getting tree: ${e}`,
      );
    }
  }

  get path(): string {
    try {
      return this._flattenRaw(this.tree);
    } catch (e) {
      throw new Error(
        `FilepathString: get path: Caught unhandled exception while getting path: ${e}`,
      );
    }
  }

  get isEmpty(): boolean {
    try {
      return (
        this.tree.length === 0 ||
        this.tree[0] === undefined ||
        this.tree[0] === ""
      );
    } catch (e) {
      throw new Error(
        `FilepathString: get isEmpty: Caught unhandled exception while getting isEmpty: ${e}`,
      );
    }
  }

  get parent(): string {
    try {
      return this.cd("..").toString();
    } catch (e) {
      throw new Error(
        `FilepathString: get parent: Caught unhandled exception while getting parent: ${e}`,
      );
    }
  }

  get leaf(): string {
    try {
      return !this.isEmpty ? this.tree[this.tree.length - 1]! : "";
    } catch (e) {
      throw new Error(
        `FilepathString: get leaf: Caught unhandled exception while getting leaf: ${e}`,
      );
    }
  }

  append(
    subpath: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = "",
  ): this {
    try {
      this._tree = new FilepathString(
        this._walk(subpath),
        requiredPathSegment,
      ).tree;
      return this;
    } catch (e) {
      throw new Error(
        `FilepathString: append: Caught unhandled exception while appending path by calling private FilepathString._walk(): ${e}`,
      );
    }
  }

  cd(
    relativePath: ConstructorParameters<typeof FilepathString>[0],
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = "",
  ): this {
    try {
      this._tree = new FilepathString(
        this._walk(relativePath, true),
        requiredPathSegment,
      ).tree;
      return this;
    } catch (e) {
      throw new Error(
        `FilepathString: cd: Caught unhandled exception while changing directories by calling private FilepathString._walk(): ${e}`,
      );
    }
  }

  toTree(): typeof FilepathString.prototype.tree {
    try {
      return this.tree;
    } catch (e) {
      throw new Error(
        `FilepathString: toTree: Caught unhandled exception while getting tree: ${e}`,
      );
    }
  }

  toString(): typeof FilepathString.prototype.path {
    try {
      return this.path;
    } catch (e) {
      throw new Error(
        `FilepathString: toString: Caught unhandled exception while getting path: ${e}`,
      );
    }
  }

  static join(
    left: ConstructorParameters<typeof FilepathString>[0],
    right: ConstructorParameters<typeof FilepathString>[0] = "",
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = "",
  ): string {
    try {
      return new FilepathString(left)
        .append(right, requiredPathSegment)
        .toString();
    } catch (e) {
      throw new Error(
        `FilepathString: join: Caught unhandled exception while creating a new FilepathString to join paths: ${e}`,
      );
    }
  }

  static mutate(
    path: ConstructorParameters<typeof FilepathString>[0],
    relativePath: ConstructorParameters<typeof FilepathString>[0] = "",
    requiredPathSegment: ConstructorParameters<typeof FilepathString>[1] = "",
  ): string {
    try {
      return new FilepathString(path)
        .cd(relativePath, requiredPathSegment)
        .toString();
    } catch (e) {
      throw new Error(
        `FilepathString: mutate: Caught unhandled exception while creating a new FilepathString to mutate path: ${e}`,
      );
    }
  }

  static toString(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): ReturnType<typeof FilepathString.prototype.toString> {
    try {
      return new FilepathString(path).toString();
    } catch (e) {
      throw new Error(
        `FilepathString: toString: Caught unhandled exception while creating a new FilepathString to convert path to string: ${e}`,
      );
    }
  }

  static toTree(
    path: ConstructorParameters<typeof FilepathString>[0],
  ): ReturnType<typeof FilepathString.prototype.toTree> {
    try {
      return new FilepathString(path).toTree();
    } catch (e) {
      throw new Error(
        `FilepathString: toTree: Caught unhandled exception while creating a new FilepathString to convert path to tree: ${e}`,
      );
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null &&
        instance !== undefined &&
        "_nominalType" in instance &&
        (instance as FilepathString)._nominalType === "FilepathString"
      );
    } catch (e) {
      throw new Error(
        `FilepathString: [Symbol.hasInstance]: Caught unhandled exception while checking if instance is a FilepathString: ${e}`,
      );
    }
  }

  private get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    try {
      return FilepathString.ValidFilepathRepeater;
    } catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to get ValidFilepathRepeater: ${e}`,
      );
    }
  }

  private get StringSplitter(): typeof StringSplitter {
    try {
      return FilepathString.StringSplitter;
    } catch (e) {
      throw new ReferenceError(`Filepath: Failed to get StringSplitter: ${e}`);
    }
  }

  static get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    try {
      return importModule("validfilepathrepeater/ValidFilepathRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to import module ValidFilepathRepeater: ${e}`,
      );
    }
  }

  static get StringSplitter(): typeof StringSplitter {
    try {
      return FilepathString.ValidFilepathRepeater.StringSplitter;
    } catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to import module StringSplitter: ${e}`,
      );
    }
  }

  static get Manager(): FileManager {
    try {
      return FileManager.iCloud();
    } catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to get instance of Scriptable FileManager iCloud object: ${e}`,
      );
    }
  }
}

module.exports = FilepathString;
