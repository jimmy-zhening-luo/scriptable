const qu_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class QueryRepeater extends qu_UrlPartRepeater {
  protected parse(repeater: string): string {
    return repeater;
  }
}

module.exports = QueryRepeater;
