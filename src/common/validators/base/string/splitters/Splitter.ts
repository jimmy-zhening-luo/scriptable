const iSplitter: typeof ISplitter = importModule(
  "splitter/ISplitter",
) as typeof ISplitter;

class Splitter extends iSplitter<string> {
  protected filter(parts: string[]): string[] {
    try {
      return parts;
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
