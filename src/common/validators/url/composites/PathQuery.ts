const pq_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
) as typeof UrlComposite;

class PathQuery extends pq_UrlComposite {
  public readonly parts: [UrlPath, UrlQuery];
  public readonly path: UrlPath;
  public readonly query: UrlQuery;

  constructor(
    pathOrPathQuery?: string | UrlPath | PathQuery,
    query?: string | UrlQuery,
  ) {
    try {
      super();      this.parts = pathOrPathQuery === undefined
        ? [
            new PathQuery.UrlPath(),
            new PathQuery.UrlQuery(),
          ]
        : pathOrPathQuery instanceof PathQuery
          ? pathOrPathQuery.parts
          : [
              new PathQuery.UrlPath(pathOrPathQuery),
              new PathQuery.UrlQuery(query),
            ];      this.path = this.parts[0];      this.query = this.parts[1];
    }
    catch (e) {
      throw new SyntaxError(
        `PathQuery: constructor: error creating PathQuery`,
        { cause: e },
      );
    }
  }

  public static get UrlPath(): typeof UrlPath {
    try {
      return this.UrlParts.UrlPath;
    }
    catch (e) {
      throw new ReferenceError(
        `PathQuery: get UrlPath: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlQuery(): typeof UrlQuery {
    try {
      return this.UrlParts.UrlQuery;
    }
    catch (e) {
      throw new ReferenceError(
        `PathQuery: get UrlQuery: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlComposite(): typeof UrlComposite {
    try {
      return pq_UrlComposite;
    }
    catch (e) {
      throw new ReferenceError(
        `PathQuery: get UrlComposite: error loading UrlComposite module`,
        { cause: e },
      );
    }
  }

  public get composite(): string {
    try {
      return this.query.isValid
        ? [
            this.path.toString(),
            this.query.toString(),
          ].join("?")
        : this.path.toString();
    }
    catch (e) {
      throw new EvalError(
        `PathQuery: get composite: error getting composite`,
        { cause: e },
      );
    }
  }
}

module.exports = PathQuery;
