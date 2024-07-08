const _ISplitter = importModule(
  `splitter/ISplitter`,
) as typeof ISplitter;

class Splitter extends _ISplitter<
  string
> {
  protected filter(
    nodes: readonly string[],
  ) {
    return nodes;
  }
}

module.exports = Splitter;
