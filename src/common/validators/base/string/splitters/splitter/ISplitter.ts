abstract class ISplitter<
  Node extends string,
> {
  public readonly nodes: readonly Node[];

  constructor(
    unmerged:
      | string
      | string[],
    public readonly separator = "",
    split: Parameters<
      ISplitter<
        Node
      >[
        "split"
      ]>[
      1
    ] = {},
  ) {
    try {
      this
        .nodes = this
          .split(
            unmerged,
            split,
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
        .nodes
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
      return `[${
        this
          .nodes
          .join(
            ", ",
          )
      }]`;
    }
    catch (e) {
      throw new EvalError(
        `Splitter: toString`,
        { cause: e },
      );
    }
  }

  private split(
    input:
      | string
      | string[],
    {
      trim = true,
      trimNode = false,
    }: {
      trim?: boolean;
      trimNode?: boolean;
    },
  ) {
    try {
      const trimmed = [input]
        .flat()
        .join(
          this
            .separator,
        )[
          trim
            ? "trim"
            : "toString"
        ]();
      const nodes = trimmed
        .length < 1
        ? []
        : trimmed
          .split(
            this
              .separator,
          );
      const trimmedNodes = trimNode
        ? nodes
          .map(
            node =>
              node
                .trim(),
          )
        : nodes;

      return this
        .filter(
          trimmedNodes,
        );
    }
    catch (e) {
      throw new EvalError(
        `Splitter: __split`,
        { cause: e },
      );
    }
  }

  protected abstract filter(nodes: string[]): Node[];
}

module.exports = ISplitter;
