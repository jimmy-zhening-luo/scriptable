class Filepath {
  public readonly name: string = "Filepath";
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

        if (typeof head === "string" || Array.isArray(head)) {
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
        `Filepath: ctor`,
        { cause: e },
      );
    }
  }

  private static get Splitter(): typeof Splitter {
    try {
      return importModule("./common/types/strings/Splitter") as typeof Splitter;
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: import Splitter`,
        { cause: e },
      );
    }
  }

  private static get FilepathPart(): typeof FilepathPart {
    try {
      return importModule("part/FilepathPart") as typeof FilepathPart;
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: import FilepathPart`,
        { cause: e },
      );
    }
  }

  public get tree(): string[] {
    try {
      return [...this._tree];
    }
    catch (e) {
      throw new EvalError(
        `Filepath: get isEmpty`,
        { cause: e },
      );
    }
  }

  public get isEmpty(): boolean {
    try {
      return this._tree.length === 0;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: get isEmpty`,
        { cause: e },
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
        `Filepath: get parent`,
        { cause: e },
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
        `Filepath: get leaf`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && "name" in instance
        && (instance as Filepath).name === "Filepath"
      );
    }
    catch (e) {
      throw new EvalError(
        `Filepath: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  public static join(...subpaths: ConstructorParameters<typeof Filepath>): string {
    try {
      return new Filepath(...subpaths)
        .toString();
    }
    catch (e) {
      throw new EvalError(
        `Filepath: static join`,
        { cause: e },
      );
    }
  }

  private static _validate(subpath: string | string[]): string[] {
    try {
      return new Filepath
        .Splitter(
          subpath,
          "/",
          {
            trim: true,
            trimTokens: true,
            noEmptyTokens: true,
          },
        )
        .merged
        .map(
          part =>
            new Filepath
              .FilepathPart(part)
              .value,
        )
        .filter(part =>
          part !== "");
    }
    catch (e) {
      throw new EvalError(
        `Filepath: _validate`,
        { cause: e },
      );
    }
  }

  public append(...subpaths: ConstructorParameters<typeof Filepath>): Filepath {
    try {
      return new Filepath(
        this,
        ...subpaths,
      );
    }
    catch (e) {
      throw new EvalError(
        `Filepath: append`,
        { cause: e },
      );
    }
  }

  public prepend(root: string): string {
    try {
      return this.isEmpty
        ? root
        : root + "/" + this.toString();
    }
    catch (e) {
      throw new EvalError(
        `Filepath: prepend`,
        { cause: e },
      );
    }
  }

  public cd(...relPaths: ConstructorParameters<typeof Filepath>): this {
    try {
      const rel: Filepath = new Filepath(...relPaths);

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
        `Filepath: cd`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this._tree.join("/");
    }
    catch (e) {
      throw new EvalError(
        `Filepath: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = Filepath;
