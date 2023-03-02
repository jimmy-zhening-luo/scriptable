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
    super();
    this.parts =
      pathOrPathQuery === undefined
        ? [new this.Path(), new this.Query()]
        : pathOrPathQuery instanceof PathQuery
        ? pathOrPathQuery.parts
        : [new this.Path(pathOrPathQuery), new this.Query(query)];
    this.path = this.parts[0];
    this.query = this.parts[1];
  }

  get composite(): string {
    return this.query.isValid
      ? [this.path.toString(), this.query.toString()].join("?")
      : this.path.toString();
  }

  get Path(): typeof Path {
    return PathQuery.Path;
  }

  get Query(): typeof Query {
    return PathQuery.Query;
  }

  static get Path(): typeof Path {
    return this.UrlParts.Path;
  }

  static get Query(): typeof Query {
    return this.UrlParts.Query;
  }

  static get UrlComposite(): typeof UrlComposite {
    return pq_UrlComposite;
  }
}

module.exports = PathQuery;
