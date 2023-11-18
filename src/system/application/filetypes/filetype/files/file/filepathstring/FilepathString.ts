class FilepathString {
  readonly _nominalType: string = "FilepathString";
  private readonly _tree: string[];

  constructor(...filepaths: (string | string[] | FilepathString)[]) {
    try {
      if (filepaths.length === 0) this._tree = [];
      else {
        const filepath: string | string[] | FilepathString = filepaths.shift()!;

        this._tree
          = filepath instanceof FilepathString
            ? [...filepath._tree]
            : [...FilepathString._validate(filepath)];
        if (filepaths.length > 0)
          this._tree = [
            ...this._tree,
            ...new FilepathString(...filepaths)._tree,
          ];
      }
    }
    catch (e) {
      throw new SyntaxError(
        `FilepathString: constructor: Caught unhandled exception while instantiating FilepathString by parsing path: \n${e}`,
      );
    }
  }

  private static _validate(filepath: string | string[]): string[] {
    try {
      const cleaned: string[] = __clean(filepath);

      return cleaned.some(
        node => new FilepathString.ValidFilepathRepeater(node).value === null,
      )
        ? []
        : [...cleaned];

      function __clean(filepath: string | string[]): string[] {
        try {
          return new FilepathString.StringSplitter(
            ___treeifyRaw(filepath),
            "/",
            {
              trim: true,
              trimTokens: true,
              ignoreEmptyTokens: true,
            },
          )
            .toTuple();

          function ___treeifyRaw(filepath: string | string[]): string[] {
            try {
              return (
                Array.isArray(filepath) ? filepath.join("/") : filepath
              ).split("/");
            }
            catch (e) {
              throw new SyntaxError(
                `FilepathString: __treeifyRaw: Caught unhandled exception while treeifying raw path: \n${e}`,
              );
            }
          }
        }
        catch (e) {
          throw new SyntaxError(
            `FilepathString: _clean: Caught unhandled exception while cleaning path using StringSplitter instance: \n${e}`,
          );
        }
      }
    }
    catch (e) {
      throw new SyntaxError(
        `FilepathString: _validate: Caught unhandled exception while validating path: \n${e}`,
      );
    }
  }

  get isEmpty(): boolean {
    try {
      return this._tree.length === 0;
    }
    catch (e) {
      throw new EvalError(
        `FilepathString: get isEmpty: Caught unhandled exception while getting isEmpty: \n${e}`,
      );
    }
  }

  get parent(): FilepathString {
    try {
      const parent: FilepathString = new FilepathString(this);

      parent._tree.pop();

      return parent;
    }
    catch (e) {
      throw new EvalError(
        `FilepathString: get parent: Caught unhandled exception while getting parent: \n${e}`,
      );
    }
  }

  get leaf(): string {
    try {
      const selfCopy: string[] = [...this._tree];
      const leaf: string = selfCopy.pop() ?? "";

      return leaf;
    }
    catch (e) {
      throw new EvalError(
        `FilepathString: get leaf: Caught unhandled exception while getting leaf: \n${e}`,
      );
    }
  }

  append(
    ...filepaths: ConstructorParameters<typeof FilepathString>
  ): FilepathString {
    try {
      return new FilepathString(this, ...filepaths);
    }
    catch (e) {
      throw new SyntaxError(
        `FilepathString: append: Caught unhandled exception while appending path by calling private FilepathString._walk(): \n${e}`,
      );
    }
  }

  cd(relativeFilepath: ConstructorParameters<typeof FilepathString>[0]): this {
    try {
      const relativeTree: string[] = [
        ...new FilepathString(relativeFilepath)
          .toTree(),
      ];

      for (const node of relativeTree) {
        if (node === "..") this._tree.pop();
        else this._tree.push(node);
      }

      return this;
    }
    catch (e) {
      throw new SyntaxError(
        `FilepathString: cd: Caught unhandled exception while changing directories by calling private FilepathString._walk(): \n${e}`,
      );
    }
  }

  toTree(): string[] {
    try {
      return [...this._tree];
    }
    catch (e) {
      throw new EvalError(
        `FilepathString: toTree: Caught unhandled exception while getting tree: \n${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.toTree()
        .join("/");
    }
    catch (e) {
      throw new EvalError(
        `FilepathString: toString: Caught unhandled exception while getting path: \n${e}`,
      );
    }
  }

  static join(
    ...filepaths: ConstructorParameters<typeof FilepathString>
  ): string {
    try {
      return new FilepathString(...filepaths)
        .toString();
    }
    catch (e) {
      throw new SyntaxError(
        `FilepathString: static join: Caught unhandled exception while creating a new FilepathString to join paths: \n${e}`,
      );
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null
        && instance !== undefined
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as FilepathString)._nominalType === "FilepathString"
      );
    }
    catch (e) {
      throw new EvalError(
        `FilepathString: [Symbol.hasInstance]: Caught unhandled exception while checking if instance is a FilepathString: \n${e}`,
      );
    }
  }

  static get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    try {
      return importModule(
        "validfilepathrepeater/ValidFilepathRepeater",
      ) as typeof ValidFilepathRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to import module ValidFilepathRepeater: \n${e}`,
      );
    }
  }

  static get StringSplitter(): typeof StringSplitter {
    try {
      return importModule(
        "./common/types/strings/StringSplitter",
      ) as typeof StringSplitter;
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: Failed to import module StringSplitter: \n${e}`,
      );
    }
  }
}

module.exports = FilepathString;
