const f_iSplitter = importModule(
  `splitter/ISplitter`,
) as typeof ISplitter;

class Splitterful extends f_iSplitter<
  stringful
> {
  protected filter(
    segments: string[],
  ) {
    try {
      return segments
        .filter(
          (segment): segment is stringful =>
            segment
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
