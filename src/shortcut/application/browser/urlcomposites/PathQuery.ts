const pq_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class PathQuery extends pq_UrlComposite {
  readonly parts: [Path, Query];
  readonly path: Path = this.parts[0];
  readonly query: Query = this.parts[1];

  constructor();
  constructor(pathQuery?: PathQuery);
  constructor(path?: string | Path);
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
  }

  get composite(): string {
    return this.query.hasValue ?
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
