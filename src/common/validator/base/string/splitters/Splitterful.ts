import type ISplitter from "./splitter/ISplitter.js";

const iSplitter = importModule(
  `splitter/ISplitter`,
) as typeof ISplitter;

export default class Splitterful extends iSplitter<
  stringful
> {
  protected filter(
    nodes: readonly string[],
  ) {
    try {
      return nodes
        .filter(
          (node): node is stringful =>
            node
              .length > 0,
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
