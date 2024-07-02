import type ISplitter from "./splitter/ISplitter.js";

const iSplitter = importModule(
  `splitter/ISplitter`,
) as typeof ISplitter;

export default class Splitter extends iSplitter<
  string
> {
  protected filter(
    nodes: readonly string[],
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
