const qu_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Query extends qu_UrlPart {
  protected parse(query: string): string {
    return query;
  }
}

namespace Query {
  export const _QueryRepeater: typeof QueryRepeater = importModule("repeater/QueryRepeater");
}

module.exports = Query;
