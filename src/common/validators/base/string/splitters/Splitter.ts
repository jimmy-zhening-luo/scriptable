const _ISplitter = importModule(
  `splitter/ISplitter`,
) as typeof ISplitter;

class Splitter extends _ISplitter<
  string
> {
  protected filter(
    nodes: string[],
  ) {
    try {
      return nodes;
    }
    catch (e) {
      throw new EvalError(
        `Splitter: filter`,
        { cause: e },
      );
    }
  }
}

module.exports = Splitter;
