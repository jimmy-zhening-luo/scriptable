const f_ISplitter = importModule(
  `splitter/ISplitter`,
) as typeof ISplitter;

class Splitterful extends f_ISplitter<
  stringful
> {
  protected filter(nodes: readonly string[]) {
    try {
      return nodes.filter(
        (node): node is stringful =>
          node.length > 0,
      );
    }
    catch (e) {
      throw new EvalError(
        `Splitterful: filter`,
        { cause: e },
      );
    }
  }
}

module.exports = Splitterful;
