const iSplitter = importModule(
  "splitter/ISplitter",
) as typeof ISplitter;

class Splitter extends iSplitter<
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
