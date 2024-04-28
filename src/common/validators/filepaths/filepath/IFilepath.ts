abstract class IFilepath<Root extends boolean> {
  public readonly name: string = "IFilepath";
  protected readonly _tree: Array<FilepathPart["string"]>;

  constructor(
    ...subpaths: Array<
      | string
      | string[]
      | IFilepath<boolean>
    >
  ) {
    try {
      this._tree = [...IFilepath.cleanValidateParts(...subpaths)];

      if (!this.isOk())
        throw new TypeError(
          `Invalid IFilepath: '${this.toString()}'`,
        );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: ctor`,
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
        `IFilepath: import Splitterful`,
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
        `IFilepath: import FilepathPart`,
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
        `IFilepath: tree`,
        { cause: e },
      );
    }
  }

  public get parent(): this {
    try {
      const parent: this = new (this.constructor as new (
        ...args: ConstructorParameters<typeof IFilepath>
      )=> this)(
        this,
      );

      parent.pop();

      return parent;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: parent`,
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
        `IFilepath: leaf`,
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
        `IFilepath: isEmpty`,
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
        && (instance as IFilepath<boolean>).name === "IFilepath"
      );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  private static cleanValidateParts(
    ...subpaths: ConstructorParameters<typeof IFilepath>
  ): ReturnType<typeof IFilepath<false>["validateParts"]> {
    try {
      const _tree: Array<FilepathPart["string"]> = [];

      while (subpaths.length > 0) {
        const head: Nullable<ConstructorParameters<typeof IFilepath>[0]> = subpaths.shift() ?? null;

        if (head !== null)
          _tree.push(
            ...head instanceof IFilepath
              ? head._tree
              : IFilepath.validateParts(
                ...IFilepath.cleanSplit(
                  head,
                ),
              ),
          );
      }

      return [..._tree];
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: cleanValidate`,
        { cause: e },
      );
    }
  }

  private static cleanSplit(
    subpath: string | string[],
  ): stringful[] {
    try {
      return new IFilepath
        .Splitterful(
          subpath,
          "/",
          { trimParts: true },
        )
        .parts;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: clean`,
        { cause: e },
      );
    }
  }

  private static validateParts(...parts: stringful[]): IFilepath<false>["_tree"] {
    try {
      return parts
        .map(
          part =>
            new IFilepath
              .FilepathPart(part)
              .string,
        );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: validate`,
        { cause: e },
      );
    }
  }

  public append(...subpaths: ConstructorParameters<typeof IFilepath>): this {
    try {
      return new (this.constructor as new (
        ...args: ConstructorParameters<typeof IFilepath>
      )=> this)(
        this,
        ...subpaths,
      );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: append`,
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
        `IFilepath: prepend`,
        { cause: e },
      );
    }
  }

  public cd(...relPaths: ConstructorParameters<typeof IFilepath>): this {
    try {
      const rel: IFilepath<boolean>["_tree"] = IFilepath.cleanValidateParts(...relPaths);

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
        `IFilepath: cd`,
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
        `IFilepath: toString`,
        { cause: e },
      );
    }
  }

  public abstract pop(): Root extends true ? FilepathPart["string"] : string;
  protected abstract isOk(): Root extends true ? boolean : true;
}

module.exports = IFilepath;
