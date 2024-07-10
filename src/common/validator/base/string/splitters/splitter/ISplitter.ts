abstract class ISplitter<
  Node extends string,
> {
  public readonly nodes: readonly Node[];

  constructor(...split: Parameters<ISplitter<Node>["split"]>) {
    try {
      this.nodes = this.split(...split);
    }
    catch (e) {
      throw new EvalError(
        `Splitter: ctor`,
        { cause: e },
      );
    }
  }

  private split(
    string: Unflat<string>,
    separator = "",
    trimNode = false,
    trim = true,
  ) {
    try {
      const clean = (
        typeof string === "string"
          ? [string]
          : string
      )
        .join(separator)[
          trim
            ? "trim"
            : "toString"
        ]();
      const split = clean.length < 1
        ? []
        : clean.split(separator);
      const nodes = trimNode
        ? split.map(
          node =>
            node.trim(),
        )
        : split;

      return this.filter(nodes);
    }
    catch (e) {
      throw new EvalError(
        `Splitter: __split`,
        { cause: e },
      );
    }
  }

  protected abstract filter(nodes: readonly string[]): readonly Node[];
}

module.exports = ISplitter;
