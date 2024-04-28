abstract class ISplitter<StringType extends string = string> {
  public readonly parts: StringType[];

  constructor(
    unmerged: string | string[],
    public readonly separator: string = "",
    splitOptions: Parameters<ISplitter["splitAggregate"]>[2] = {},
    aggregateOptions: Parameters<ISplitter["splitAggregate"]>[3] = {},
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
    splitOptions: Parameters<ISplitter["split"]>[2] = {},
    aggregateOptions: Parameters<ISplitter["aggregate"]>[2] = {},
  ): StringType[] {
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
    split: StringType[],
    separator: string,
    {
      limit = Infinity,
      mergeTo = "right",
    }: {
      limit?: number;
      mergeTo?: "left" | "right";
    },
  ): StringType[] {
    limit = !Number.isInteger(limit) || limit < 0
      ? Infinity
      : limit;

    return split.length === 0
      ? []
      : split.length <= limit
        ? split
        : mergeTo === "left"
          ? [
              split
                .slice(
                  0,
                  limit - 1,
                )
                .join(separator) as StringType,
              ...split.slice(limit - 1),
            ]
          : [
              ...split.slice(
                0,
                limit - 1,
              ),
              split
                .slice(limit - 1)
                .join(separator) as StringType,
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
  ): StringType[] {
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
                part =>
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

  protected abstract filter(parts: string[]): StringType[];
}

module.exports = ISplitter;
