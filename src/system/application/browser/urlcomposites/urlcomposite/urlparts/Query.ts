const qu_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Query extends qu_UrlPart {
  constructor(
    query?:
      | null
      | string
      | Query
      | Map<string, string>
      | Record<string, string>
      | [string, string]
      | [string, string][],
  ) {
    if (
      query === undefined ||
      query === null ||
      typeof query === "string" ||
      query instanceof Query
    )
      super(query);
    else if (Array.isArray(query)) {
      if (
        query.length === 2 &&
        typeof query[0] === "string" &&
        typeof query[1] === "string"
      )
        super(query.join("="));
      else super(Query.tuplesToQueryString(query as [string, string][]));
    } else {
      super(Query.mapToQueryString(query));
    }
  }

  protected parse(query: string): null | string {
    query = query.trim();
    query = query.startsWith("?") ? query.slice(1) : query;
    return query === ""
      ? null
      : Query.mapToQueryString(Query.queryStringToMap(query))
          .split("&")
          .filter(keyValueString => keyValueString !== "")
          .map(keyValueString => new this.QueryRepeater(keyValueString))
          .filter(queryRepeater => queryRepeater.isValid)
          .map(queryRepeater => queryRepeater.toString())
          .join("&");
  }

  get query(): string {
    return this.queryString;
  }

  get queryString(): string {
    return this.toString();
  }

  get queryTuples(): [string, string][] {
    return Query.queryStringToTuples(this.query);
  }

  get queryMap(): Map<string, string> {
    return Query.queryStringToMap(this.query);
  }

  hasParam(key: string): boolean {
    return this.queryMap.has(key) && this.queryMap.get(key) !== "";
  }

  getParam(key: string): string {
    return this.queryMap.get(key) ?? "";
  }

  addParam(
    _keyOrKeyValue: ConstructorParameters<typeof Query>[0],
    _value?: string,
  ): Query {
    const queryMapCopy: Map<string, string> = new Map(this.queryMap);
    const newParamTuples: [string, string][] = [];
    if (_value !== undefined) {
      if (typeof _keyOrKeyValue === "string")
        newParamTuples.push([_keyOrKeyValue, _value]);
    } else newParamTuples.push(...new Query(_keyOrKeyValue).queryTuples);
    newParamTuples
      .filter(tuple => tuple[0] !== "")
      .forEach(([key, value]) => {
        value === "" ? queryMapCopy.delete(key) : queryMapCopy.set(key, value);
      });
    return new Query(queryMapCopy);
  }

  deleteParam(keys: string | string[]): Query {
    let newQuery: Query = new Query(this);
    Array.isArray(keys)
      ? keys.forEach(key => {
          newQuery = newQuery.addParam(key, "");
        })
      : (newQuery = newQuery.addParam(keys, ""));
    return newQuery;
  }

  toTuples(): typeof Query.prototype.queryTuples {
    return this.queryTuples;
  }

  toMap(): typeof Query.prototype.queryMap {
    return this.queryMap;
  }

  static queryStringToTuples(query: string): [string, string][] {
    return (
      query
        .split("&")
        .filter(keyValueString => keyValueString !== "")
        .map(keyValueString => keyValueString.split("="))
        .filter(keyValueTuple => keyValueTuple.length >= 2)
        .map(keyValueTuple => [
          keyValueTuple[0],
          keyValueTuple.slice(1).join("="),
        ]) as [string, string][]
    ).filter(tuple => tuple[0] !== "" && tuple[1] !== "");
  }

  static tuplesToMap(tuples: [string, string][]): Map<string, string> {
    return new Map(tuples.filter(tuple => tuple[0] !== "" && tuple[1] !== ""));
  }

  static queryStringToMap(query: string): Map<string, string> {
    return Query.tuplesToMap(Query.queryStringToTuples(query));
  }

  static mapToTuples(
    record: Map<string, string> | Record<string, string>,
  ): [string, string][] {
    return Array.from(Object.entries(record)).filter(
      tuple => tuple[0] !== "" && tuple[1] !== "",
    );
  }

  static tuplesToQueryString(tuples: [string, string][]): string {
    return tuples
      .filter(tuple => tuple[0] !== "" && tuple[1] !== "")
      .map(keyValueTuple => keyValueTuple.join("="))
      .join("&");
  }

  static mapToQueryString(
    record: Map<string, string> | Record<string, string>,
  ): string {
    return Query.tuplesToQueryString(Query.mapToTuples(record));
  }

  protected get QueryRepeater(): typeof QueryRepeater {
    return this.Repeaters.QueryRepeater;
  }

  static get UrlPart(): typeof UrlPart {
    return qu_UrlPart;
  }
}

module.exports = Query;
