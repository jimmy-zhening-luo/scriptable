const pq_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class PathQuery extends pq_UrlComposite {
  readonly parts: [Path, Query];
  readonly path: Path;
  readonly query: Query;

  constructor(pathQuery?: PathQuery);
  constructor(
    path?: string | Path,
    query?: string | Query
  );

  constructor(
    pathOrPathQuery?: string | Path | PathQuery,
    query?: string | Query
  ) {
    super();
    this.parts = pathOrPathQuery === undefined ?
      [
        new PathQuery._Path(),
        new PathQuery._Query()
      ]
      : pathOrPathQuery instanceof PathQuery ?
        pathOrPathQuery.parts
        : [
          new PathQuery._Path(pathOrPathQuery),
          new PathQuery._Query(query)
        ];
    this.path = this.parts[0];
    this.query = this.parts[1];
  }

  get composite(): string {
    return this.query.isValid ?
      [
        this.path.toString(),
        this.query.toString()
      ].join("?")
      : this.path.toString();
  }
}

namespace PathQuery {
  export const _Path: typeof Path = importModule("urlparts/Path");
  export const _Query: typeof Query = importModule("urlparts/Query");
}

module.exports = PathQuery;
