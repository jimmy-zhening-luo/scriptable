const pqf_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class PathQueryFragment extends pqf_UrlComposite {

  readonly parts: [PathQuery, Fragment];
  readonly pathQuery: PathQuery;
  readonly fragment: Fragment;

  constructor(pathQueryFragment?: PathQueryFragment)
  constructor(
    pathQuery?:
      PathQuery
      | [
        string | Path,
        string | Query
      ],
    fragment?:
      string | Fragment
  );

  constructor(
    pathOrPathQueryOrPathQueryFragment?:
      | PathQuery
      | [
        string | Path,
        string | Query
      ]
      | PathQueryFragment,
    fragment?: string | Fragment
  ) {
    super();
    this.parts = pathOrPathQueryOrPathQueryFragment === undefined ?
      [
        new this.PathQuery(),
        new this.Fragment()
      ]
      : pathOrPathQueryOrPathQueryFragment instanceof PathQueryFragment ?
        pathOrPathQueryOrPathQueryFragment.parts
        : Array.isArray(pathOrPathQueryOrPathQueryFragment) ?
          [
            new this.PathQuery(
              new this.PathQuery.Path(pathOrPathQueryOrPathQueryFragment[0]),
              new this.PathQuery.Query(pathOrPathQueryOrPathQueryFragment[1])
            ),
            new this.Fragment(fragment)
          ]
          : [
            new this.PathQuery(pathOrPathQueryOrPathQueryFragment),
            new this.Fragment(fragment)
          ];
    this.pathQuery = this.parts[0];
    this.fragment = this.parts[1];
  }

  get composite(): string {
    return this.fragment.isValid ?
      [
        this.pathQuery.toString(),
        this.fragment.toString()
      ].join("#")
      : this.pathQuery.toString()
  }

  get PathQuery(): typeof PathQuery {
    return PathQueryFragment.PathQuery;
  }

  get Fragment(): typeof Fragment {
    return PathQueryFragment.Fragment;
  }

  static get PathQuery(): typeof PathQuery {
    return importModule("PathQuery");
  }

  static get Fragment(): typeof Fragment {
    return this.UrlParts.Fragment;
  }

  static get UrlComposite(): typeof UrlComposite {
    return pqf_UrlComposite;
  }

}

module.exports = PathQueryFragment;
