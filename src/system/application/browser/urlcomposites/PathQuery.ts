const pq_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
);

class PathQuery extends pq_UrlComposite {
  readonly parts: [Path, Query];
  readonly path: Path;
  readonly query: Query;

  constructor(
    pathOrPathQuery?: string | Path | PathQuery,
    query?: string | Query,
  ) {
    try {
      super();
      this.parts =
        pathOrPathQuery === undefined
          ? [new PathQuery.Path(), new PathQuery.Query()]
          : pathOrPathQuery instanceof PathQuery
          ? pathOrPathQuery.parts
          : [new PathQuery.Path(pathOrPathQuery), new PathQuery.Query(query)];
      this.path = this.parts[0];
      this.query = this.parts[1];
    } catch (e) {
      throw new SyntaxError(
        `PathQuery: constructor: error creating PathQuery: ${e}`,
      );
    }
  }

  get composite(): string {
    try {
      return this.query.isValid
        ? [this.path.toString(), this.query.toString()].join("?")
        : this.path.toString();
    } catch (e) {
      throw new EvalError(
        `PathQuery: get composite: error getting composite: ${e}`,
      );
    }
  }

  static get Path(): typeof Path {
    try {
      return this.UrlParts.Path;
    } catch (e) {
      throw new ReferenceError(
        `PathQuery: get Path: error loading Path module: ${e}`,
      );
    }
  }

  static get Query(): typeof Query {
    try {
      return this.UrlParts.Query;
    } catch (e) {
      throw new ReferenceError(
        `PathQuery: get Query: error loading Query module: ${e}`,
      );
    }
  }

  static get UrlComposite(): typeof UrlComposite {
    try {
      return pq_UrlComposite;
    } catch (e) {
      throw new ReferenceError(
        `PathQuery: get UrlComposite: error loading UrlComposite module: ${e}`,
      );
    }
  }
}

module.exports = PathQuery;
