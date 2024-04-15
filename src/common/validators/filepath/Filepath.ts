class Filepath {
  public readonly _nominalType: string = "Filepath";
  private readonly _tree: string[] = [];

  constructor(
    ...subpaths: Array<
      | string
      | string[]
      | Filepath
    >
  ) {
    try {
      if (subpaths.length > 0) {
        const head:
        | string
        | string[]
        | Filepath = subpaths.shift() ?? "";

        if (typeof head === "string") {
          if (head.length > 0)
            this._tree.push(...Filepath._validate(head));
        }
        else if (Array.isArray(head)) {
          if (head.length > 0)
            this._tree.push(...Filepath._validate(head));
        }
        else
          this._tree.push(...head._tree);

        this._tree.push(...new Filepath(...subpaths)._tree);
      }
    }

    catch (e) {
      throw new EvalError(
        `Filepath: ctor: \n${e as string}`,
      );
    }
  }

  private static get StringSplitter(): typeof StringSplitter {
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

  private static get FilepathPart(): typeof FilepathPart {
    try {
      return importModule(
        "part/FilepathPart",
      ) as typeof FilepathPart;
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: import FilepathPart: \n${e as string}`,
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
        ...subpaths,
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
    subpath: string | string[],
  ): string[] {
    try {
      return new Filepath
        .StringSplitter(
          subpath,
          "/",
          {
            trim: true,
            trimTokens: true,
            noEmptyTokens: true,
          },
        )
        .merged
        .map(part =>
          new Filepath
            .FilepathPart(
              part,
            ).value)
        .filter(part =>
          part !== "");
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

  public prepend(
    root: string,
  ): string {
    try {
      return this.isEmpty
        ? root
        : root + "/" + this.toString();
    }
    catch (e) {
      throw new EvalError(
        `Filepath: prepend: \n${e as string}`,
      );
    }
  }

  public cd(
    ...relPaths: ConstructorParameters<typeof Filepath>
  ): this {
    try {
      const rel: Filepath = new Filepath(
        ...relPaths,
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
