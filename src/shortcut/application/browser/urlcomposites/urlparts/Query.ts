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
  
  get params(): Map<string, string> {
    return new Map<string, string>(
      this
        .toString()
        .split("&")
        .map(
          keyValuePair => keyValuePair
            .split("=")
        )
        .filter([])
    );
  }
  
  addParam(
    keyOrKeyValue: string | [string, string],
    value?: string
  ): Query {
    const key: string = Array.isArray(keyOrKeyValue) ?
      keyOrKeyValue[0] ?? ""
      : keyOrKeyValue;
    const value: string = Array.isArray(keyOrKeyValue) ?
    keyOrKeyValue[1] ?? ""
    : value ?? "";
    const params: Map<string, string> = this.params;
    
    if (key !== "") {
      if (value === "")
        params.delete(key)
      else
        params.set(key, value)
    }
    
    return new Query(
      params.entries().map(keyValuePair => keyValuePair.join("=")).join
    )
  }
}

namespace Query {
  export const _QueryRepeater: typeof QueryRepeater = importModule("repeater/QueryRepeater");
}

module.exports = Query;
