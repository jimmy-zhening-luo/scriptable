const pqf_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
);

class PathQueryFragment extends pqf_UrlComposite {
  readonly parts: [PathQuery, Fragment];
  readonly pathQuery: PathQuery;
  readonly fragment: Fragment;

  constructor(pathQueryFragment?: PathQueryFragment);
  constructor(
    pathQuery?: PathQuery | [string | Path, string | Query],
    fragment?: string | Fragment,
  );

  constructor(
    pathOrPathQueryOrPathQueryFragment?:
      | PathQuery
      | [string | Path, string | Query]
      | PathQueryFragment,
    fragment?: string | Fragment,
  ) {
    super();
    try {
      this.parts =
        pathOrPathQueryOrPathQueryFragment === undefined
          ? [new this.PathQuery(), new this.Fragment()]
          : pathOrPathQueryOrPathQueryFragment instanceof PathQueryFragment
          ? pathOrPathQueryOrPathQueryFragment.parts
          : Array.isArray(pathOrPathQueryOrPathQueryFragment)
          ? [
              new this.PathQuery(
                new this.PathQuery.Path(pathOrPathQueryOrPathQueryFragment[0]),
                new this.PathQuery.Query(pathOrPathQueryOrPathQueryFragment[1]),
              ),
              new this.Fragment(fragment),
            ]
          : [
              new this.PathQuery(pathOrPathQueryOrPathQueryFragment),
              new this.Fragment(fragment),
            ];
      this.pathQuery = this.parts[0];
      this.fragment = this.parts[1];
    } catch (e) {
      throw new Error(
        `PathQueryFragment: constructor: error creating PathQueryFragment: ${e}`,
      );
    }
  }

  get composite(): string {
    try {
      return this.fragment.isValid
        ? [this.pathQuery.toString(), this.fragment.toString()].join("#")
        : this.pathQuery.toString();
    } catch (e) {
      throw new Error(
        `PathQueryFragment: get composite: error getting composite: ${e}`,
      );
    }
  }

  get PathQuery(): typeof PathQuery {
    try {
      return PathQueryFragment.PathQuery;
    } catch (e) {
      throw new Error(
        `PathQueryFragment: get PathQuery: error getting PathQuery: ${e}`,
      );
    }
  }

  get Fragment(): typeof Fragment {
    try {
      return PathQueryFragment.Fragment;
    } catch (e) {
      throw new Error(
        `PathQueryFragment: get Fragment: error getting Fragment: ${e}`,
      );
    }
  }

  static get PathQuery(): typeof PathQuery {
    try {
      return importModule("PathQuery");
    } catch (e) {
      throw new Error(
        `PathQueryFragment: get PathQuery: error getting PathQuery: ${e}`,
      );
    }
  }

  static get Fragment(): typeof Fragment {
    try {
      return this.UrlParts.Fragment;
    } catch (e) {
      throw new Error(
        `PathQueryFragment: get Fragment: error getting Fragment: ${e}`,
      );
    }
  }

  static get UrlComposite(): typeof UrlComposite {
    try {
      return pqf_UrlComposite;
    } catch (e) {
      throw new Error(
        `PathQueryFragment: get UrlComposite: error getting UrlComposite: ${e}`,
      );
    }
  }
}

module.exports = PathQueryFragment;
