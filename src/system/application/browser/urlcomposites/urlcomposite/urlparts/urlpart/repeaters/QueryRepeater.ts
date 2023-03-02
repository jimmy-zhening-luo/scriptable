const qu_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
);

class QueryRepeater extends qu_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    return new this.ValidQueryRepeater(repeater).value;
  }

  protected get ValidQueryRepeater(): typeof ValidQueryRepeater {
    return this.UrlValidators.Query.Repeaters.Query;
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    return qu_UrlPartRepeater;
  }
}

module.exports = QueryRepeater;
