abstract class IFilepath<Root extends boolean> {
  public readonly name: literalful<"IFilepath"> = "IFilepath";
  protected readonly _parts: Array<FilepathPart["string"]>;

  constructor(
    ...subpaths: Array<
      | string
      | string[]
      | IFilepath<boolean>
    >
  ) {
    try {
      this._parts = [...this.cleanValidateParts(...subpaths)];

      if (!this.isOk())
        throw new TypeError(
          `Invalid IFilepath`,
          { cause: { filepath: this.toString() } },
        );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: ctor`,
        { cause: e },
      );
    }
  }

  public get parts(): IFilepath<Root>["_parts"] {
    try {
      return [...this._parts];
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: parts`,
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

  public get isEmpty(): boolean {
    try {
      return this._parts.length === 0;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: isEmpty`,
        { cause: e },
      );
    }
  }

  private get Splitterful(): typeof Splitterful {
    try {
      return importModule(
        "./common/validators/base/string/splitters/Splitterful",
      ) as typeof Splitterful;
    }
    catch (e) {
      throw new ReferenceError(
        `IFilepath: import Splitterful`,
        { cause: e },
      );
    }
  }

  private get FilepathPart(): typeof FilepathPart {
    try {
      return importModule(
        "part/FilepathPart",
      ) as typeof FilepathPart;
    }
    catch (e) {
      throw new ReferenceError(
        `IFilepath: import FilepathPart`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && (instance as { name: string }).name === "IFilepath"
      );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: [Symbol.hasInstance]`,
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

  public prepend(root: FString<true>): FString<true> {
    try {
      return this.isEmpty
        ? root
        : `${root}/${this.toString()}` as FString<true>;
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
      const rel: IFilepath<boolean>["_parts"] = this.cleanValidateParts(...relPaths);

      for (const node of rel)
        if (node === "..")
          this.pop();
        else
          this._parts.push(node);

      return this;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: cd`,
        { cause: e },
      );
    }
  }

  public toString(): FString<Root> {
    try {
      return this._parts.join("/") as FString<Root>;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: toString`,
        { cause: e },
      );
    }
  }

  private cleanValidateParts(
    ...subpaths: ConstructorParameters<typeof IFilepath>
  ): ReturnType<IFilepath<false>["validateParts"]> {
    try {
      const _tree: Array<FilepathPart["string"]> = [];

      while (subpaths.length > 0) {
        const head: Null<ConstructorParameters<typeof IFilepath>[0]> = subpaths.shift() ?? null;

        if (head !== null)
          _tree.push(
            ...head instanceof IFilepath
              ? head._parts
              : this.validateParts(
                ...this.cleanSplit(
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

  private cleanSplit(
    subpath: string | string[],
  ): stringful[] {
    try {
      return new this
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

  private validateParts(...parts: stringful[]): IFilepath<boolean>["_parts"] {
    try {
      return parts
        .map(
          (part: stringful): FilepathPart["string"] =>
            new this
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

  public abstract pop(): Root extends true ? FilepathPart["string"] : string;
  protected abstract isOk(): Root extends true ? boolean : true;
}

module.exports = IFilepath;
