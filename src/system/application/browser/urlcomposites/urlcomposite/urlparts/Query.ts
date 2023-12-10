const qu_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class Query extends qu_UrlPart {
  constructor(
    query:
    | string
    | Query
    | Map<string, string>
    | Record<string, string>
    | [string, string]
    | Array<[string, string]> = "",
  ) {
    try {
      if (typeof query === "string" || query instanceof Query) super(query);
      else if (Array.isArray(query)) {
        if (
          query.length === 2
          && typeof query[0] === "string"
          && typeof query[1] === "string"
        )
          super(`${query[0]}=${query[1]}`);
        else super(Query.tuplesToQueryString(query as Array<[string, string]>));
      }
      else {
        super(Query.mapToQueryString(query));
      }
    }
    catch (e) {
      throw new Error(`Query: constructor: error creating Query: \n${e as string}`);
    }
  }

  public static get QueryRepeater(): typeof QueryRepeater {
    try {
      return Query.Repeaters.QueryRepeater;
    }
    catch (e) {
      throw new Error(
        `Query: get QueryRepeater: error loading QueryRepeater module: \n${e as string}`,
      );
    }
  }

  public static get UrlPart(): typeof UrlPart {
    try {
      return qu_UrlPart;
    }
    catch (e) {
      throw new Error(`Query: get UrlPart: error getting UrlPart: \n${e as string}`);
    }
  }

  public get query(): string {
    try {
      return this.queryString;
    }
    catch (e) {
      throw new Error(`Query: get query: error getting query: \n${e as string}`);
    }
  }

  public get queryString(): string {
    try {
      return this.toString();
    }
    catch (e) {
      throw new Error(
        `Query: get queryString: error getting queryString: \n${e as string}`,
      );
    }
  }

  public get queryTuples(): Array<[string, string]> {
    try {
      return Query.queryStringToTuples(this.query);
    }
    catch (e) {
      throw new Error(
        `Query: get queryTuples: error getting queryTuples: \n${e as string}`,
      );
    }
  }

  public get queryMap(): Map<string, string> {
    try {
      return Query.queryStringToMap(this.query);
    }
    catch (e) {
      throw new Error(`Query: get queryMap: error getting queryMap: \n${e as string}`);
    }
  }

  public static queryStringToTuples(query: string): Array<[string, string]> {
    try {
      return (
        query
          .split("&")
          .filter(keyValueString => keyValueString !== "")
          .map(keyValueString => keyValueString.split("="))
          .filter(keyValueTuple => keyValueTuple.length >= 2)
          .map(keyValueTuple => [
            keyValueTuple[0],
            keyValueTuple.slice(1)
              .join("="),
          ]) as Array<[string, string]>
      ).filter(tuple => tuple[0] !== "" && tuple[1] !== "");
    }
    catch (e) {
      throw new Error(
        `Query: queryStringToTuples: error converting to tuples: \n${e as string}`,
      );
    }
  }

  public static tuplesToMap(
    tuples: Array<[string, string]>,
  ): Map<string, string> {
    try {
      return new Map(
        tuples.filter(tuple => tuple[0] !== "" && tuple[1] !== ""),
      );
    }
    catch (e) {
      throw new Error(`Query: tuplesToMap: error converting to map: \n${e as string}`);
    }
  }

  public static queryStringToMap(query: string): Map<string, string> {
    try {
      return Query.tuplesToMap(Query.queryStringToTuples(query));
    }
    catch (e) {
      throw new Error(
        `Query: queryStringToMap: error converting to map: \n${e as string}`,
      );
    }
  }

  public static mapToTuples(
    record: Map<string, string> | Record<string, string>,
  ): Array<[string, string]> {
    try {
      return Array.from(
        record instanceof Map
          ? record.entries()
          : Object.entries(record),
      )
        .filter(tuple => tuple[0] !== "" && tuple[1] !== "");
    }
    catch (e) {
      throw new Error(`Query: mapToTuples: error converting to tuples: \n${e as string}`);
    }
  }

  public static tuplesToQueryString(tuples: Array<[string, string]>): string {
    try {
      return tuples
        .filter(tuple => tuple[0] !== "" && tuple[1] !== "")
        .map(keyValueTuple => keyValueTuple.join("="))
        .join("&");
    }
    catch (e) {
      throw new Error(
        `Query: tuplesToQueryString: error converting to query string: \n${e as string}`,
      );
    }
  }

  public static mapToQueryString(
    record: Map<string, string> | Record<string, string>,
  ): string {
    try {
      return Query.tuplesToQueryString(Query.mapToTuples(record));
    }
    catch (e) {
      throw new Error(
        `Query: mapToQueryString: error converting to query string: \n${e as string}`,
      );
    }
  }

  public hasParam(key: string): boolean {
    try {
      return this.queryMap.has(key) && this.queryMap.get(key) !== "";
    }
    catch (e) {
      throw new Error(`Query: hasParam: error checking param: \n${e as string}`);
    }
  }

  public getParam(key: string): string {
    try {
      return this.queryMap.get(key) ?? "";
    }
    catch (e) {
      throw new Error(`Query: getParam: error getting param: \n${e as string}`);
    }
  }

  public addParam(
    _keyOrKeyValue: ConstructorParameters<typeof Query>[0],
    _value?: string,
  ): Query {
    try {
      const queryMapCopy: Map<string, string> = new Map(this.queryMap);
      const newParamTuples: Array<[string, string]> = [];

      if (_value !== undefined) {
        if (typeof _keyOrKeyValue === "string")
          newParamTuples.push([
            _keyOrKeyValue,
            _value,
          ]);
      }
      else newParamTuples.push(...new Query(_keyOrKeyValue).queryTuples);
      newParamTuples
        .filter(tuple => tuple[0] !== "")
        .forEach(([
          key,
          value,
        ]) => {
          value === ""
            ? queryMapCopy.delete(key)
            : queryMapCopy.set(key, value);
        });

      return new Query(queryMapCopy);
    }
    catch (e) {
      throw new Error(`Query: addParam: error adding param: \n${e as string}`);
    }
  }

  public deleteParam(keys: string | string[]): Query {
    try {
      let newQuery: Query = new Query(this);

      Array.isArray(keys)
        ? keys.forEach(key => {
          newQuery = newQuery.addParam(key, "");
        })
        : newQuery = newQuery.addParam(keys, "");

      return newQuery;
    }
    catch (e) {
      throw new Error(`Query: deleteParam: error deleting param: \n${e as string}`);
    }
  }

  public toTuples(): typeof Query.prototype.queryTuples {
    try {
      return this.queryTuples;
    }
    catch (e) {
      throw new Error(`Query: toTuples: error converting to tuples: \n${e as string}`);
    }
  }

  public toMap(): typeof Query.prototype.queryMap {
    try {
      return this.queryMap;
    }
    catch (e) {
      throw new Error(`Query: toMap: error converting to map: \n${e as string}`);
    }
  }

  protected parse(query: string): null | string {
    try {
      query = query.trim();
      query = query.startsWith("?")
        ? query.slice(1)
        : query;

      return query === ""
        ? null
        : Query.mapToQueryString(Query.queryStringToMap(query))
          .split("&")
          .filter(keyValueString => keyValueString !== "")
          .map(keyValueString => new Query.QueryRepeater(keyValueString))
          .filter(queryRepeater => queryRepeater.isValid)
          .map(queryRepeater => queryRepeater.toString())
          .join("&");
    }
    catch (e) {
      throw new Error(`Query: parse: error parsing Query: \n${e as string}`);
    }
  }
}

module.exports = Query;
