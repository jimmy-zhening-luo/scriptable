const iSplitter: typeof ISplitter = importModule("splitter/ISplitter") as typeof ISplitter;

class Splitter extends iSplitter {
  protected filter(parts: string[]): string[] {
    return parts;
  }
}

module.exports = Splitter;
