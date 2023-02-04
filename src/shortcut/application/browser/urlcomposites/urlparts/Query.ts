const qu_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

// WIP
class Query extends qu_UrlPart {
  readonly params: Array<typeof Query.QueryParam>;
  constructor(
    query?: (string
      | Query
    )
  ) {
    super(query);
    this.params = new Array<typeof Query.QueryParam>();
  }

  protected static get QueryParam() {
    return importModule("query/QueryParam");
  }

  protected parse(query: string): string {
    return query;
  }

  static fromObjectEntries() {

  }

  static fromQueryString() {

  }
}

namespace Query {
  export const _ValidQuery: typeof ValidQuery = importModule("validators/ValidQuery");
}

module.exports = Query;
