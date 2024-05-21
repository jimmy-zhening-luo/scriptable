abstract class ISplitter<
  S extends string,
> {
  public readonly segments: S[];

  constructor(
    unmerged:
      | string
      | string[],
    public readonly separator = "",
    splitOptions: Parameters<ISplitter<S>["splitAggregate"]>[1] = {},
    joinOptions: Parameters<ISplitter<S>["splitAggregate"]>[2] = {},
  ) {
    try {
      this.segments = this
        .splitAggregate(
          unmerged,
          splitOptions,
          joinOptions,
        );
    }
    catch (e) {
      throw new EvalError(
        `Splitter: ctor`,
        { cause: e },
      );
    }
  }

  public get length() {
    try {
      return this
        .segments
        .length;
    }
    catch (e) {
      throw new EvalError(
        `Splitter: length`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return this
        .segments
        .join(
          this
            .separator,
        );
    }
    catch (e) {
      throw new EvalError(
        `Splitter: toString`,
        { cause: e },
      );
    }
  }

  private splitAggregate(
    input:
      | string
      | string[],
    splitOptions: Parameters<ISplitter<S>["split"]>[1] = {},
    aggregateOptions: Parameters<ISplitter<S>["aggregate"]>[1] = {},
  ) {
    try {
      return this
        .aggregate(
          this
            .split(
              input,
              splitOptions,
            ),
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
    split: S[],
    {
      limit = Infinity,
      mergeTo = "right",
    }: {
      limit?: number;
      mergeTo?:
        | "left"
        | "right"
      ;
    },
  ) {
    const limitful =
      limit < 0
      || !Number
        .isInteger(
          limit,
        )
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
                .join(
                  this
                    .separator,
                ) as S,
              ...split
                .slice(
                  limitful - 1,
                ),
            ]
          : [
              ...split
                .slice(
                  0,
                  limitful - 1,
                ),
              split
                .slice(
                  limitful - 1,
                )
                .join(
                  this
                    .separator,
                ) as S,
            ];
  }

  private split(
    input:
      | string
      | string[],
    {
      trim = true,
      trimSegment = false,
    }: {
      trim?: boolean;
      trimSegment?: boolean;
    },
  ) {
    try {
      const trimmed: string = [input]
        .flat()
        .join(
          this
            .separator,
        )[
          trim
            ? "trim"
            : "toString"
        ]();

      return trimmed === ""
        ? []
        : this
          .filter(
            trimmed
              .split(
                this
                  .separator,
              )
              .map(
                segment =>
                  trimSegment
                    ? segment
                      .trim()
                    : segment,
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

  protected abstract filter(segments: string[]): S[];
}

module.exports = ISplitter;
