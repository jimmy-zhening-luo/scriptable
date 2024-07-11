abstract class ISplitter<
  Node extends string,
> {
  public readonly nodes: readonly Node[];

  constructor(
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

      this.nodes = this.filter(nodes);
    }
    catch (e) {
      throw new EvalError(
        `Splitter: ctor`,
        { cause: e },
      );
    }
  }

  protected abstract filter(nodes: readonly string[]): readonly Node[];
}

module.exports = ISplitter;
