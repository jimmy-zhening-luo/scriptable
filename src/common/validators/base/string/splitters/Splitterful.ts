const f_iSplitter: typeof ISplitter = importModule(
  "splitter/ISplitter",
) as typeof ISplitter;

class Splitterful extends f_iSplitter<stringful> {
  protected filter(parts: string[]): stringful[] {
    return parts.filter(
      (part): part is stringful =>
        part.length !== 0,
    );
  }
}

module.exports = Splitterful;
