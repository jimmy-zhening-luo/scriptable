const iSplitter: typeof ISplitter = importModule(
  "splitter/ISplitter",
) as typeof ISplitter;

class Splitter extends iSplitter<string> {
  protected filter(segments: string[]): string[] {
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
