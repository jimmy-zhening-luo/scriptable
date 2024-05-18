abstract class ISplitter<T extends string> {
  public readonly parts: T[];

  constructor(
    unmerged: string | string[],
    public readonly separator: string = "",
    splitOptions: Parameters<ISplitter<T>["splitAggregate"]>[2] = {},
    aggregateOptions: Parameters<ISplitter<T>["splitAggregate"]>[3] = {},
  ) {
    try {
      this.separator = separator;
      this.parts = this.splitAggregate(
        unmerged,
        separator,
        splitOptions,
        aggregateOptions,
      );
    }
    catch (e) {
      throw new EvalError(
        `Splitter: ctor`,
        { cause: e },
      );
    }
  }

  public get length(): number {
    try {
      return this.parts.length;
    }
    catch (e) {
      throw new EvalError(
        `Splitter: length`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this.parts.join(this.separator);
    }
    catch (e) {
      throw new EvalError(
        `Splitter: toString`,
        { cause: e },
      );
    }
  }

  private splitAggregate(
    input: string | string[],
    separator: string,
    splitOptions: Parameters<ISplitter<T>["split"]>[2] = {},
    aggregateOptions: Parameters<ISplitter<T>["aggregate"]>[2] = {},
  ): T[] {
    try {
      return this.aggregate(
        this.split(
          input,
          separator,
          splitOptions,
        ),
        separator,
        aggregateOptions,
      );
    }
    catch (e) {
      throw new EvalError(
        `Splitter: _mergeSplit`,
        { cause: e },
      );
    }
  }

  private aggregate(
    split: T[],
    separator: string,
    {
      limit = Infinity,
      mergeTo = "right",
    }: {
      limit?: number;
      mergeTo?: "left" | "right";
    },
  ): T[] {
    const limitful: number = !Number.isInteger(limit) || limit < 0
      ? Infinity
      : limit;

    return split.length < 1
      ? []
      : split.length <= limitful
        ? split
        : mergeTo === "left"
          ? [
              split
                .slice(
                  0,
                  limitful - 1,
                )
                .join(separator) as T,
              ...split.slice(limitful - 1),
            ]
          : [
              ...split.slice(
                0,
                limitful - 1,
              ),
              split
                .slice(limitful - 1)
                .join(separator) as T,
            ];
  }

  private split(
    input: string | string[],
    separator: string,
    {
      trim = true,
      trimParts = false,
    }: {
      trim?: boolean;
      trimParts?: boolean;
    },
  ): T[] {
    try {
      const trimmedString: string = [input]
        .flat()
        .join(
          separator,
        )[
          trim
            ? "trim"
            : "toString"
        ]();

      return trimmedString === ""
        ? []
        : this
          .filter(
            trimmedString
              .split(
                separator,
              )
              .map(
                (part: string): string =>
                  trimParts
                    ? part.trim()
                    : part,
              ),
          );
    }
    catch (e) {
      throw new EvalError(
        `Splitter: __split`,
        { cause: e },
      );
    }
  }

  protected abstract filter(parts: string[]): T[];
}

module.exports = ISplitter;
