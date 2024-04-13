const qu_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
) as typeof UrlPartRepeater;

class QueryRepeater extends qu_UrlPartRepeater {
  public static get ValidQueryRepeater(): typeof ValidQueryRepeater {
    try {
      return QueryRepeater.UrlValidators.Query.Repeaters.Query;
    }
    catch (e) {
      throw new ReferenceError(
        `QueryRepeater: error loading ValidQueryRepeater module: \n${e as string}`,
      );
    }
  }

  public static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return qu_UrlPartRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `QueryRepeater: error loading parent UrlPartRepeater module: \n${e as string}`,
      );
    }
  }

  protected parse(repeater: string): null | string {
    try {
      return new QueryRepeater.ValidQueryRepeater(repeater).value;
    }
    catch (e) {
      throw new Error(
        `QueryRepeater: parse: error parsing QueryRepeater: \n${e as string}`,
      );
    }
  }
}

module.exports = QueryRepeater;
