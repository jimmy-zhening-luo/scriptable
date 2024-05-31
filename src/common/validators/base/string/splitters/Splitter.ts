const _ISplitter = importModule(
  `splitter/ISplitter`,
) as typeof ISplitter;

class Splitter extends _ISplitter<
  string
> {
  protected filter(
    segments: string[],
  ) {
    try {
      return segments;
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
