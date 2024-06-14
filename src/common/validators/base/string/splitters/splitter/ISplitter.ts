abstract class ISplitter<
  Node extends string,
> {
  public readonly nodes: readonly Node[];

  constructor(
    ...split: Parameters<
      ISplitter<
        Node
      >[
        "split"
      ]
    >
  ) {
    try {
      this
        .nodes = this
          .split(
            ...split,
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
    string:
      | string
      | string[],
    separator = "",
    trimNode = false,
    trim = true,
  ) {
    try {
      const trimmed = [string]
        .flat()
        .join(
          separator,
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
            separator,
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
