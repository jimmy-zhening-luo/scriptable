abstract class Filepath<Root extends boolean> {
  public readonly name: string = "Filepath";
  protected readonly _tree: Array<FilepathPart["string"]>;

  constructor(
    ...subpaths: Array<
      | string
      | string[]
      | Filepath<boolean>
    >
  ) {
    try {
      this._tree = [...Filepath.cleanValidateParts(...subpaths)];

      if (!this.isOk())
        throw new TypeError(
          `Invalid Filepath: '${this.toString()}'`,
        );
    }
    catch (e) {
      throw new EvalError(
        `Filepath: ctor`,
        { cause: e },
      );
    }
  }

  private static get Splitterful(): typeof Splitterful {
    try {
      return importModule("./common/types/strings/Splitterful") as typeof Splitterful;
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: import Splitterful`,
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

  public get tree(): stringful[] {
    try {
      return [...this._tree];
    }
    catch (e) {
      throw new EvalError(
        `Filepath: tree`,
        { cause: e },
      );
    }
  }

  public get parent(): this {
    try {
      const parent: this = new (this.constructor as new (
        ...args: ConstructorParameters<typeof Filepath>
      )=> this)(
        this,
      );

      parent.pop();

      return parent;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: parent`,
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
        `Filepath: leaf`,
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
        `Filepath: isEmpty`,
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
        && (instance as Filepath<boolean>).name === "Filepath"
      );
    }
    catch (e) {
      throw new EvalError(
        `Filepath: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  private static cleanValidateParts(
    ...subpaths: ConstructorParameters<typeof Filepath>
  ): ReturnType<typeof Filepath<false>["validateParts"]> {
    try {
      const _tree: Array<FilepathPart["string"]> = [];

      while (subpaths.length > 0) {
        const head: Nullable<ConstructorParameters<typeof Filepath>[0]> = subpaths.shift() ?? null;

        if (head !== null)
          _tree.push(
            ...head instanceof Filepath
              ? head._tree
              : Filepath.validateParts(
                ...Filepath.cleanSplit(
                  head,
                ),
              ),
          );
      }

      return [..._tree];
    }
    catch (e) {
      throw new EvalError(
        `Filepath: cleanValidate`,
        { cause: e },
      );
    }
  }

  private static cleanSplit(
    subpath: string | string[],
  ): stringful[] {
    try {
      return new Filepath
        .Splitterful(
          subpath,
          "/",
          { trimParts: true },
        )
        .parts;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: clean`,
        { cause: e },
      );
    }
  }

  private static validateParts(...parts: stringful[]): Filepath<false>["_tree"] {
    try {
      return parts
        .map(
          part =>
            new Filepath
              .FilepathPart(part)
              .string,
        );
    }
    catch (e) {
      throw new EvalError(
        `Filepath: validate`,
        { cause: e },
      );
    }
  }

  public append(...subpaths: ConstructorParameters<typeof Filepath>): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof Filepath>
      )=> this)(
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

  public prepend(root: stringful): stringful {
    try {
      return this.isEmpty
        ? root
        : root + "/" + this.toString() as stringful;
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
      const rel: Filepath<boolean>["_tree"] = Filepath.cleanValidateParts(...relPaths);

      for (const node of rel) {
        if (node === "..")
          this.pop();
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

  public toString(): Root extends true ? stringful : string {
    try {
      return this._tree.join("/") as Root extends true ? stringful : string;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: toString`,
        { cause: e },
      );
    }
  }

  public abstract pop(): Root extends true ? FilepathPart["string"] : string;
  protected abstract isOk(): Root extends true ? boolean : true;
}

module.exports = Filepath;
