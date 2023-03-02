const pq_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
);

class PathQuery extends pq_UrlComposite {
  readonly parts: [Path, Query];
  readonly path: Path;
  readonly query: Query;

  constructor(pathQuery?: PathQuery);
  constructor(path?: string | Path, query?: string | Query);

  constructor(
    pathOrPathQuery?: string | Path | PathQuery,
    query?: string | Query,
  ) {
    try {
      super();
      this.parts =
        pathOrPathQuery === undefined
          ? [new this.Path(), new this.Query()]
          : pathOrPathQuery instanceof PathQuery
          ? pathOrPathQuery.parts
          : [new this.Path(pathOrPathQuery), new this.Query(query)];
      this.path = this.parts[0];
      this.query = this.parts[1];
    } catch (e) {
      throw new Error(`PathQuery: constructor: error creating PathQuery: ${e}`);
    }
  }

  get composite(): string {
    try {
      return this.query.isValid
        ? [this.path.toString(), this.query.toString()].join("?")
        : this.path.toString();
    } catch (e) {
      throw new Error(
        `PathQuery: get composite: error getting composite: ${e}`,
      );
    }
  }

  get Path(): typeof Path {
    try {
      return PathQuery.Path;
    } catch (e) {
      throw new Error(`PathQuery: get Path: error getting Path: ${e}`);
    }
  }

  get Query(): typeof Query {
    try {
      return PathQuery.Query;
    } catch (e) {
      throw new Error(`PathQuery: get Query: error getting Query: ${e}`);
    }
  }

  static get Path(): typeof Path {
    try {
      return this.UrlParts.Path;
    } catch (e) {
      throw new Error(`PathQuery: get Path: error getting Path: ${e}`);
    }
  }

  static get Query(): typeof Query {
    try {
      return this.UrlParts.Query;
    } catch (e) {
      throw new Error(`PathQuery: get Query: error getting Query: ${e}`);
    }
  }

  static get UrlComposite(): typeof UrlComposite {
    try {
      return pq_UrlComposite;
    } catch (e) {
      throw new Error(
        `PathQuery: get UrlComposite: error getting UrlComposite: ${e}`,
      );
    }
  }
}

module.exports = PathQuery;
