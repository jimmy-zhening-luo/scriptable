abstract class IFilepath<Root extends boolean> {
  protected readonly _parts: Root extends true
    ? Arrayful<Part>
    : Part[];

  constructor(
    ...subpaths: Parameters<IFilepath<Root>["compose"]>
  ) {
    try {
      this._parts = this.check(
        this.compose(
          ...subpaths,
        ),
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
      return this._parts.length < 1;
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

  public pop(): Part {
    try {
      const partsQueue: Part[] = [...this._parts]
        .reverse();

      if (this.poppable(partsQueue)) {
        this._parts.pop();

        return partsQueue[0];
      }
      else
        throw new RangeError(
          `filepath unpoppable`,
          {
            cause: {
              parts: this._parts,
              length: this._parts.length,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: pop`,
        { cause: e },
      );
    }
  }

  public append(
    ...subpaths: Parameters<IFilepath<Root>["compose"]>
  ): this {
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

  public prepend(
    root: FString<true>,
  ): FString<true> {
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

  public cd(
    ...relPaths: Parameters<IFilepath<Root>["compose"]>
  ): this {
    try {
      const rel: Part[] = this.compose(
        ...relPaths,
      );

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
      return [...this._parts]
        .join("/") as FString<Root>;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: toString`,
        { cause: e },
      );
    }
  }

  private compose(
    ...subpaths: Array<
      | string
      | string[]
      | IFilepath<boolean>
    >
  ): Part[] {
    try {
      return subpaths
        .map(
          (subpath: string | string[] | IFilepath<boolean>): Part[] =>
            typeof subpath !== "string" && !Array.isArray(subpath)
              ? subpath._parts
              : new this.Splitterful(
                subpath,
                "/",
                { trimParts: true },
              )
                .parts
                .map(
                  (part: stringful): Part =>
                    new this
                      .FilepathPart(part)
                      .string,
                ),
        )
        .flat();
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: compose`,
        { cause: e },
      );
    }
  }

  protected abstract check(parts: Part[]): IFilepath<Root>["_parts"];

  protected abstract poppable(parts: Part[]): parts is Arrayful<Part>;
}

module.exports = IFilepath;
