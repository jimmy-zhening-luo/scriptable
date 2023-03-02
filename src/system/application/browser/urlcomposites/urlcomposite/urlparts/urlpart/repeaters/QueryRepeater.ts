const qu_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
);

class QueryRepeater extends qu_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    try {
      return new this.ValidQueryRepeater(repeater).value;
    } catch (e) {
      throw new Error(
        `QueryRepeater: parse: error parsing QueryRepeater: ${e}`,
      );
    }
  }

  protected get ValidQueryRepeater(): typeof ValidQueryRepeater {
    try {
      return this.UrlValidators.Query.Repeaters.Query;
    } catch (e) {
      throw new ReferenceError(
        `QueryRepeater: error loading ValidQueryRepeater module: ${e}`,
      );
    }
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return qu_UrlPartRepeater;
    } catch (e) {
      throw new ReferenceError(
        `QueryRepeater: error loading parent UrlPartRepeater module: ${e}`,
      );
    }
  }
}

module.exports = QueryRepeater;
