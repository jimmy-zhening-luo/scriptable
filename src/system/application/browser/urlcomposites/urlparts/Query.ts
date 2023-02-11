const qu_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Query extends qu_UrlPart {

  constructor(
    query?:
      | null
      | string
      | Query
      | Record<string, string>
      | [string, string]
      | [string, string][]
  ) {
    if (
      query === undefined
      || query === null
      || typeof query === "string"
      || query instanceof Query
    )
      super(query);
    else if (Array.isArray(query)) {
      if (
        query.length === 2
        && typeof query[0] === "string"
        && typeof query[1] === "string"
      )
        super(query.join("="));
      else
        super(
          query
            .map(([key, value]) => [key, value].join("="))
            .join("&")
        );
    }
    else {
      super(
        Array.from(
          Object.entries(query)
        )
          .map(([key, value]) => [key, value].join("="))
          .join("&")
      );
    }
  }

  protected parse(query: string): null | string {
    query = query.trim();
    query = query.startsWith("?") ? query.slice(1) : query;
    return query === "" ?
      null
      : this
        .mapToQueryString(this.queryStringToMap(query))
        .split("&")
        .filter(keyValueString => keyValueString !== "")
        .map(keyValueString => new Query._QueryRepeater(keyValueString))
        .filter(queryRepeater => queryRepeater.isValid)
        .map(queryRepeater => queryRepeater.toString())
        .join("&");
  }

  get params(): Map<string, string> {
    return this.queryStringToMap(this.toString());
  }

  addParam(
    _keyOrKeyValue:
      string
      | [string, string],
    _value?: string
  ): Query {
    const params: Map<string, string> = this.params;
    const key: string = Array.isArray(_keyOrKeyValue) ?
      _keyOrKeyValue[0] ?? ""
      : _keyOrKeyValue;
    const value: string = Array.isArray(_keyOrKeyValue) ?
      _keyOrKeyValue[1] ?? ""
      : _value ?? "";

    if (key !== "")
      value === "" ?
        params.delete(key)
        : params.set(key, value);

    return new Query(
      this.mapToQueryString(params)
    );
  }

  deleteParam(key: string): Query {
    return this.addParam(key, "");
  }

  protected queryStringToMap(query: string): Map<string, string> {
    const queryEntries: Array<[string, string]> = query
      .split("&")
      .map(keyValueString => keyValueString.split("="))
      .map(keyValueTuple => [
        keyValueTuple.slice(0, 1).shift() ?? "",
        keyValueTuple.slice(1).join("=")
      ]);

    const nullabeQueryMap: Map<string, string> = new Map<string, string>(queryEntries);
    nullabeQueryMap.delete("");
    for (const key of nullabeQueryMap.keys())
      if (
        nullabeQueryMap.get(key) === undefined
        || nullabeQueryMap.get(key) === null
        || nullabeQueryMap.get(key) === ""
      )
        nullabeQueryMap.delete(key);

    const queryMap: Map<string, string> = nullabeQueryMap;
    return queryMap;
  }

  protected mapToQueryString(queryMap: Map<string, string>): string {
    return Array.from(queryMap.entries())
      .map(keyValueTuple => keyValueTuple.join("="))
      .join("&");
  }

  static recordToTuples(record: Record<Types.stringful, string>): [Types.stringful, string][] {
    return Array.from(Object.entries(record));
  }

  static tuplesToRecord(tuples: [Types.stringful, string][]): Record<Types.stringful, string> {
    return Object.fromEntries(tuples);
  }

  static recordToQueryString(record: Record<Types.stringful, string>): string {
}

namespace Query {
  export const _QueryRepeater: typeof QueryRepeater = importModule("repeaters/QueryRepeater");
}

module.exports = Query;
