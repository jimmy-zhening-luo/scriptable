const pqf_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
) as typeof UrlComposite;

class PathQueryFragment extends pqf_UrlComposite {
  readonly parts: [PathQuery, Fragment];
  readonly pathQuery: PathQuery;
  readonly fragment: Fragment;

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
          ? [
              new PathQueryFragment.PathQuery(),
              new PathQueryFragment.Fragment(),
            ]
          : pathOrPathQueryOrPathQueryFragment instanceof PathQueryFragment
            ? pathOrPathQueryOrPathQueryFragment.parts
            : Array.isArray(pathOrPathQueryOrPathQueryFragment)
              ? [
                  new PathQueryFragment.PathQuery(
                    new PathQueryFragment.PathQuery.Path(
                      pathOrPathQueryOrPathQueryFragment[0],
                    ),
                    new PathQueryFragment.PathQuery.Query(
                      pathOrPathQueryOrPathQueryFragment[1],
                    ),
                  ),
                  new PathQueryFragment.Fragment(fragment),
                ]
              : [
                  new PathQueryFragment.PathQuery(
                    pathOrPathQueryOrPathQueryFragment,
                  ),
                  new PathQueryFragment.Fragment(fragment),
                ];
      this.pathQuery = this.parts[0];
      this.fragment = this.parts[1];
    } catch (e) {
      throw new SyntaxError(
        `PathQueryFragment: constructor: error creating PathQueryFragment: \n${e}`,
      );
    }
  }

  get composite(): string {
    try {
      return this.fragment.isValid
        ? [this.pathQuery.toString(), this.fragment.toString()].join("#")
        : this.pathQuery.toString();
    } catch (e) {
      throw new EvalError(
        `PathQueryFragment: get composite: error getting composite: \n${e}`,
      );
    }
  }

  static get PathQuery(): typeof PathQuery {
    try {
      return importModule("PathQuery") as typeof PathQuery;
    } catch (e) {
      throw new ReferenceError(
        `PathQueryFragment: get PathQuery: error loading PathQuery module: \n${e}`,
      );
    }
  }

  static get Fragment(): typeof Fragment {
    try {
      return this.UrlParts.Fragment;
    } catch (e) {
      throw new ReferenceError(
        `PathQueryFragment: get Fragment: error loading Fragment module: \n${e}`,
      );
    }
  }

  static get UrlComposite(): typeof UrlComposite {
    try {
      return pqf_UrlComposite;
    } catch (e) {
      throw new ReferenceError(
        `PathQueryFragment: get UrlComposite: error loading UrlComposite module: \n${e}`,
      );
    }
  }
}

module.exports = PathQueryFragment;
