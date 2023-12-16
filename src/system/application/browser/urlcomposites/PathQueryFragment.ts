const pqf_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
) as typeof UrlComposite;

class PathQueryFragment extends pqf_UrlComposite {
  public readonly parts: [PathQuery, UrlFragment];
  public readonly pathQuery: PathQuery;
  public readonly fragment: UrlFragment;

  constructor(
    pathOrPathQueryOrPathQueryFragment?:
    | PathQuery
    | [string | UrlPath, string | UrlQuery]
    | PathQueryFragment,
    fragment?: string | UrlFragment,
  ) {
    super();
    try {
      this.parts
        = pathOrPathQueryOrPathQueryFragment === undefined
          ? [
              new PathQueryFragment.PathQuery(),
              new PathQueryFragment.UrlFragment(),
            ]
          : pathOrPathQueryOrPathQueryFragment instanceof PathQueryFragment
            ? pathOrPathQueryOrPathQueryFragment.parts
            : Array.isArray(pathOrPathQueryOrPathQueryFragment)
              ? [
                  new PathQueryFragment.PathQuery(
                    new PathQueryFragment.PathQuery.UrlPath(
                      pathOrPathQueryOrPathQueryFragment[0],
                    ),
                    new PathQueryFragment.PathQuery.UrlQuery(
                      pathOrPathQueryOrPathQueryFragment[1],
                    ),
                  ),
                  new PathQueryFragment.UrlFragment(fragment),
                ]
              : [
                  new PathQueryFragment.PathQuery(
                    pathOrPathQueryOrPathQueryFragment,
                  ),
                  new PathQueryFragment.UrlFragment(fragment),
                ];
      this.pathQuery = this.parts[0];
      this.fragment = this.parts[1];
    }
    catch (e) {
      throw new SyntaxError(
        `PathQueryFragment: constructor: error creating PathQueryFragment: \n${e as string}`,
      );
    }
  }

  public static get PathQuery(): typeof PathQuery {
    try {
      return importModule("PathQuery") as typeof PathQuery;
    }
    catch (e) {
      throw new ReferenceError(
        `PathQueryFragment: get PathQuery: error loading module: \n${e as string}`,
      );
    }
  }

  public static get UrlFragment(): typeof UrlFragment {
    try {
      return this.UrlParts.UrlFragment;
    }
    catch (e) {
      throw new ReferenceError(
        `PathQueryFragment: get UrlFragment: error loading module: \n${e as string}`,
      );
    }
  }

  public static get UrlComposite(): typeof UrlComposite {
    try {
      return pqf_UrlComposite;
    }
    catch (e) {
      throw new ReferenceError(
        `PathQueryFragment: get UrlComposite: error loading UrlComposite module: \n${e as string}`,
      );
    }
  }

  public get composite(): string {
    try {
      return this.fragment.isValid
        ? [
            this.pathQuery.toString(),
            this.fragment.toString(),
          ].join("#")
        : this.pathQuery.toString();
    }
    catch (e) {
      throw new EvalError(
        `PathQueryFragment: get composite: error getting composite: \n${e as string}`,
      );
    }
  }
}

module.exports = PathQueryFragment;
