const pqf_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class PathQueryFragment extends pqf_UrlComposite {
  readonly parts: [PathQuery, Fragment];
  readonly pathQuery: PathQuery = this.parts[0];
  readonly fragment: Fragment = this.parts[1];

  constructor();
  constructor(pathQueryFragment?: PathQueryFragment)
  constructor(pathQuery?: PathQuery);
  constructor(
    pathQuery?: PathQuery,
    fragment?: string | Fragment
  );
  constructor(
    {
      path?: string | Path,
    query?: string | Query,
    },
    fragment?: string | Fragment
  );

  constructor(
    pathOrPathQueryOrPathQueryFragment?: string | Path | PathQuery | PathQueryFragment,
    ifPathThenQueryElseFragment?: string | Query | Fragment,
    fragment?: string | Fragment
  ) {
    super();
    this.parts = pathOrPathQueryOrPathQueryFragment === undefined ?
      [
        new PathQueryFragment._PathQuery(),
        new PathQueryFragment._Fragment()
      ]
      : pathOrPathQueryOrPathQueryFragment instanceof PathQueryFragment ?
        pathOrPathQueryOrPathQueryFragment.parts
        : typeof pathOrPathQueryOrPathQueryFragment === "string" ?
          [
            new PathQueryFragment._PathQuery._Path(pathOrPathQueryOrPathQueryFragment),
            new PathQueryFragment._PathQuery._Query(ifPathThenQueryElseFragment),
            new PathQueryFragment._Fragment(fragment)
          ]
          : "query" in pathOrPathQueryOrPathQueryFragment ?
            [
              new PathQueryFragment._PathQuery(pathOrPathQueryOrPathQueryFragment),
              new PathQueryFragment._Fragment(fragment)
            ]
            :
  }

  get composite(): string {
    return this.fragment.hasValue ?
      [
        this.pathQuery.toString(),
        this.fragment.toString()
      ].join("#")
      : this.pathQuery.toString()
  }
}

namespace PathQueryFragment {
  export const _PathQuery: typeof PathQuery = importModule("PathQuery");
  export const _Fragment: typeof Fragment = importModule("urlparts/Fragment");
}

module.exports = PathQueryFragment;
