const qu_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class QueryRepeater extends qu_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    return new QueryRepeater._ValidQueryRepeater(repeater).value;
  }
}

namespace QueryRepeater {
  export const _ValidQueryRepeater: typeof ValidQueryRepeater = importModule("./shortcut/application/browser/urlcomposites/urlparts/validators/ValidQueryRepeater");
}

module.exports = QueryRepeater;
