const qu_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class UrlQuery extends qu_UrlPart {
  constructor(
    query:
      | string
      | UrlQuery
      | Map<string, string>
      | Record<string, string>
      | [string, string]
      | Array<[string, string]> = "",
  ) {
    try {
      if (typeof query === "string" || query instanceof UrlQuery)
        super(query);
      else if (Array.isArray(query)) {
        if (
          query.length === 2
          && typeof query[0] === "string"
          && typeof query[1] === "string"
        )
          super(`${query[0]}=${query[1]}`);
        else
          super(
            UrlQuery.tuplesToQueryString(query as Array<[string, string]>),
          );
      }
      else {
        super(UrlQuery.mapToQueryString(query));
      }
    }
    catch (e) {
      throw new EvalError(
        `UrlQuery: ctor`,
        { cause: e },
      );
    }
  }

  public static get QueryRepeater(): typeof QueryRepeater {
    try {
      return UrlQuery.Repeaters.QueryRepeater;
    }
    catch (e) {
      throw new Error(
        `UrlQuery: get QueryRepeater: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlPart(): typeof UrlPart {
    try {
      return qu_UrlPart;
    }
    catch (e) {
      throw new Error(`UrlQuery: get UrlPart: error getting UrlPart: \n${e as string}`);
    }
  }

  public get query(): string {
    try {
      return this.queryString;
    }
    catch (e) {
      throw new Error(`UrlQuery: get query: error getting query: \n${e as string}`);
    }
  }

  public get queryString(): string {
    try {
      return this.toString();
    }
    catch (e) {
      throw new Error(
        `UrlQuery: get queryString: error getting queryString`,
        { cause: e },
      );
    }
  }

  public get queryTuples(): Array<[string, string]> {
    try {
      return UrlQuery.queryStringToTuples(this.query);
    }
    catch (e) {
      throw new Error(
        `UrlQuery: get queryTuples: error getting queryTuples`,
        { cause: e },
      );
    }
  }

  public get queryMap(): Map<string, string> {
    try {
      return UrlQuery.queryStringToMap(this.query);
    }
    catch (e) {
      throw new Error(`UrlQuery: get queryMap: error getting queryMap: \n${e as string}`);
    }
  }

  public static queryStringToTuples(query: string): Array<[string, string]> {
    try {
      return (
        query
          .split("&")
          .filter(
            keyValueString =>
              keyValueString !== "",
          )
          .map(
            keyValueString =>
              keyValueString.split("="),
          )
          .filter(
            keyValueTuple =>
              keyValueTuple.length >= 2,
          )
          .map(
            keyValueTuple =>
              [
                keyValueTuple[0],
                keyValueTuple.slice(1)
                  .join("="),
              ],
          ) as Array<[string, string]>
      )
        .filter(
          tuple =>
            tuple[0] !== "" && tuple[1] !== "",
        );
    }
    catch (e) {
      throw new Error(
        `UrlQuery: queryStringToTuples: error converting to tuples`,
        { cause: e },
      );
    }
  }

  public static tuplesToMap(tuples: Array<[string, string]>): Map<string, string> {
    try {
      return new Map(
        tuples
          .filter(
            tuple =>
              tuple[0] !== "" && tuple[1] !== "",
          ),
      );
    }
    catch (e) {
      throw new Error(`UrlQuery: tuplesToMap: error converting to map: \n${e as string}`);
    }
  }

  public static queryStringToMap(query: string): Map<string, string> {
    try {
      return UrlQuery.tuplesToMap(UrlQuery.queryStringToTuples(query));
    }
    catch (e) {
      throw new Error(
        `UrlQuery: queryStringToMap: error converting to map`,
        { cause: e },
      );
    }
  }

  public static mapToTuples(
    record:
      | Map<string, string>
      | Record<string, string>,
  ): Array<[string, string]> {
    try {
      return Array.from(
        record instanceof Map
          ? record.entries()
          : Object.entries(record),
      )
        .filter(
          tuple =>
            tuple[0] !== "" && tuple[1] !== "",
        );
    }
    catch (e) {
      throw new Error(`UrlQuery: mapToTuples: error converting to tuples: \n${e as string}`);
    }
  }

  public static tuplesToQueryString(tuples: Array<[string, string]>): string {
    try {
      return tuples
        .filter(
          tuple =>
            tuple[0] !== "" && tuple[1] !== "",
        )
        .map(
          keyValueTuple =>
            keyValueTuple.join("="),
        )
        .join("&");
    }
    catch (e) {
      throw new Error(
        `UrlQuery: tuplesToQueryString: error converting to query string`,
        { cause: e },
      );
    }
  }

  public static mapToQueryString(record: Map<string, string> | Record<string, string>): string {
    try {
      return UrlQuery.tuplesToQueryString(UrlQuery.mapToTuples(record));
    }
    catch (e) {
      throw new Error(
        `UrlQuery: mapToQueryString: error converting to query string`,
        { cause: e },
      );
    }
  }

  public hasParam(key: string): boolean {
    try {
      return this.queryMap.has(key) && this.queryMap.get(key) !== "";
    }
    catch (e) {
      throw new Error(`UrlQuery: hasParam: error checking param: \n${e as string}`);
    }
  }

  public getParam(key: string): string {
    try {
      return this.queryMap.get(key) ?? "";
    }
    catch (e) {
      throw new Error(`UrlQuery: getParam: error getting param: \n${e as string}`);
    }
  }

  public addParam(
    _keyOrKeyValue: ConstructorParameters<typeof UrlQuery>[0],
    _value?: string,
  ): UrlQuery {
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
      else
        newParamTuples
          .push(
            ...new UrlQuery(
              _keyOrKeyValue,
            )
              .queryTuples,
          );

      newParamTuples
        .filter(
          tuple =>
            tuple[0] !== "",
        )
        .forEach(
          ([
            key,
            value,
          ]) => {
            value === ""
              ? queryMapCopy
                .delete(key)
              : queryMapCopy
                .set(
                  key,
                  value,
                );
          },
        );

      return new UrlQuery(queryMapCopy);
    }
    catch (e) {
      throw new Error(`UrlQuery: addParam: error adding param: \n${e as string}`);
    }
  }

  public deleteParam(keys: string | string[]): UrlQuery {
    try {
      let newQuery: UrlQuery = new UrlQuery(this);

      Array.isArray(keys)
        ? keys
          .forEach(
            key => {
              newQuery = newQuery
                .addParam(
                  key,
                  "",
                );
            },
          )
        : newQuery = newQuery
          .addParam(
            keys,
            "",
          );

      return newQuery;
    }
    catch (e) {
      throw new Error(`UrlQuery: deleteParam: error deleting param: \n${e as string}`);
    }
  }

  public toTuples(): typeof UrlQuery.prototype.queryTuples {
    try {
      return this.queryTuples;
    }
    catch (e) {
      throw new Error(`UrlQuery: toTuples: error converting to tuples: \n${e as string}`);
    }
  }

  public toMap(): typeof UrlQuery.prototype.queryMap {
    try {
      return this.queryMap;
    }
    catch (e) {
      throw new Error(`UrlQuery: toMap: error converting to map: \n${e as string}`);
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
        : UrlQuery
          .mapToQueryString(UrlQuery.queryStringToMap(query))
          .split("&")
          .filter(
            keyValueString =>
              keyValueString !== "",
          )
          .map(
            keyValueString =>
              new UrlQuery.QueryRepeater(keyValueString),
          )
          .filter(
            queryRepeater =>
              queryRepeater.isValid,
          )
          .map(
            queryRepeater =>
              queryRepeater.toString(),
          )
          .join("&");
    }
    catch (e) {
      throw new EvalError(
        `UrlQuery: parse`,
        { cause: e },
      );
    }
  }
}

module.exports = UrlQuery;
