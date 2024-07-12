class Splitter<Stringful extends boolean> {
  public readonly _nodes: readonly string[];

  constructor(
    string: Unflat,
    public readonly stringful: Stringful,
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

      this._nodes = trimNode
        ? split.map(
          node =>
            node.trim(),
        )
        : split;
    }
    catch (e) {
      throw new EvalError(
        `Splitter: ctor`,
        { cause: e },
      );
    }
  }

  public get nodes() {
    try {
      const filter = (
        node: string,
        stringful: Stringful,
      ): node is (Stringful extends true ? stringful : string) =>
        !stringful || node.length > 0;
      const { stringful } = this;

      return this._nodes.filter(
        node =>
          filter(
            node,
            stringful,
          ),
      );
    }
    catch (e) {
      throw new EvalError(
        `Splitter: nodes`,
        { cause: e },
      );
    }
  }
}

module.exports = Splitter;
