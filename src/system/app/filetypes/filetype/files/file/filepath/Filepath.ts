class Filepath {
  public readonly _nominalType: string = "Filepath";

  private readonly _tree: string[] = [];

  constructor(
    head?:
      | string
      | string[]
      | Filepath
      | Bookmark,
    ...subpaths: Array<
      | string
      | string[]
      | Filepath
    >
  ) {
    try {
      head = head ?? subpaths.shift();
      if (head !== undefined) {
        this._tree.push(
          head instanceof Bookmark
            ? ...head.path.split("/")
            : head instanceof Filepath
              ? ...head._tree
              : ...Filepath._validate(head);
        );
        this._tree.push(
          ...new Filepath(
            ...subpaths
          )
            ._tree,
        );
      }
    }
    catch (e) {
      throw new EvalError(
        `Filepath: ctor: \n${e as string}`,
      );
    }
  }

  protected static get StringSplitter(): typeof StringSplitter {
    try {
      return importModule(
        "./common/types/strings/StringSplitter",
      ) as typeof StringSplitter;
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: import StringSplitter: \n${e as string}`,
      );
    }
  }

  protected static get ValidFilepathPart(): typeof ValidFilepathPart {
    try {
      return importModule(
        "validpart/ValidFilepathPart",
      ) as typeof ValidFilepathPart;
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: import ValidFilepathPart: \n${e as string}`,
      );
    }
  }

  public get tree(): string[] {
    try {
      return [...this._tree];
    }
    catch (e) {
      throw new EvalError(
        `Filepath: get isEmpty: \n${e as string}`,
      );
    }
  }

  public get isEmpty(): boolean {
    try {
      return this._tree.length === 0;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: get isEmpty: \n${e as string}`,
      );
    }
  }

  public get parent(): Filepath {
    try {
      const parent: Filepath = new Filepath(this);

      parent._tree.pop();

      return parent;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: get parent: \n${e as string}`,
      );
    }
  }

  public get leaf(): string {
    try {
      const treeCopy: string[] = [...this._tree];

      return treeCopy.pop() ?? "";
    }
    catch (e) {
      throw new EvalError(
        `Filepath: get leaf: \n${e as string}`,
      );
    }
  }

  public static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null
        && instance !== undefined
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as Filepath)._nominalType === "Filepath"
      );
    }
    catch (e) {
      throw new EvalError(
        `Filepath: [Symbol.hasInstance]: \n${e as string}`,
      );
    }
  }

  public static join(
    ...subpaths: ConstructorParameters<typeof Filepath>
  ): string {
    try {
      return new Filepath(
        ...subpaths
      )
        .toString();
    }
    catch (e) {
      throw new EvalError(
        `Filepath: static join: \n${e as string}`,
      );
    }
  }

  private static _validate(
    subpath: 
      | string
      | string[],
  ): string[] {
    try {
      const cleaned: string[] = __clean(subpath);

      return cleaned.some(
        node => new Filepath
          .ValidFilepathPart(
            node
          )
          .value === null,
      )
        ? []
        : cleaned;

      function __clean(
        subpath:
          | string
          | string[],
      ): string[] {
        try {
          return new Filepath
            .StringSplitter(
              ___treeifyRaw(
                subpath
              ),
            "/",
            {
              trim: true,
              trimTokens: true,
              ignoreEmptyTokens: true,
            },
          )
            ._tree;

          function ___treeifyRaw(subpath: string | string[]): string[] {
            try {
              return (
                Array.isArray(subpath)
                  ? subpath.join("/")
                  : subpath
              ).split("/");
            }
            catch (e) {
              throw new SyntaxError(
                `___treeifyRaw: \n${e as string}`,
              );
            }
          }
        }
        catch (e) {
          throw new SyntaxError(
            `__clean: \n${e as string}`,
          );
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `Filepath: _validate: \n${e as string}`,
      );
    }
  }

  public append(
    ...subpaths: ConstructorParameters<typeof Filepath>
  ): Filepath {
    try {
      return new Filepath(this, ...subpaths);
    }
    catch (e) {
      throw new EvalError(
        `Filepath: append: \n${e as string}`,
      );
    }
  }

  public cd(
    ...relPaths: ConstructorParameters<typeof Filepath>,
  ): this {
    try {
      const rel: Filepath = new Filepath(
        ...relPaths
      );

      for (const node of rel._tree) {
        if (node === "..")
          this._tree.pop();
        else
          this._tree.push(node);
      }

      return this;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: cd: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this._tree.join("/");
    }
    catch (e) {
      throw new EvalError(
        `Filepath: toString: \n${e as string}`,
      );
    }
  }
}

module.exports = Filepath;
