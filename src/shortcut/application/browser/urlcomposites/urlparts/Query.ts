const qu_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Query extends qu_UrlPart {
  protected parse(query: string): null | string {
    query = query.trim();
    query = query.startsWith("?") ? query.slice(1) : query;
    return query
      .split("&")
      .map(queryRepeater => new Query._QueryRepeater(queryRepeater))
      .filter(queryRepeater => queryRepeater.isValid)
      .map(queryRepeater => queryRepeater.toString())
      .join("&");
  }
}

namespace Query {
  export const _QueryRepeater: typeof QueryRepeater = importModule("repeater/QueryRepeater");
}

module.exports = Query;
