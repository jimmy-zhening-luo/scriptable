const shppqf_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
) as typeof UrlComposite;

class SchemeHostPortPathQueryFragment extends shppqf_UrlComposite {
  public readonly parts: [SchemeHostPort, PathQueryFragment];
  public readonly schemeHostPort: SchemeHostPort;
  public readonly pathQueryFragment: PathQueryFragment;

  constructor(
    schemeHostPortOrSchemeHostPortPathQueryFragment?:
    | SchemeHostPort
    | SchemeHostPortPathQueryFragment
    | [
      string | UrlScheme,
      string | UrlHost,
      string | number | UrlPort,
      string | UrlPath,
      string | UrlQuery,
      string | UrlFragment,
    ],
    pathQueryFragment?: PathQueryFragment,
  ) {
    super();
    try {
      this.parts
        = schemeHostPortOrSchemeHostPortPathQueryFragment === undefined
          ? [
              new SchemeHostPortPathQueryFragment.SchemeHostPort(),
              new SchemeHostPortPathQueryFragment.PathQueryFragment(),
            ]
          : schemeHostPortOrSchemeHostPortPathQueryFragment
              instanceof SchemeHostPortPathQueryFragment
            ? schemeHostPortOrSchemeHostPortPathQueryFragment.parts
            : Array.isArray(schemeHostPortOrSchemeHostPortPathQueryFragment)
              ? [
                  new SchemeHostPortPathQueryFragment.SchemeHostPort(
                    schemeHostPortOrSchemeHostPortPathQueryFragment[0],
                    [
                      schemeHostPortOrSchemeHostPortPathQueryFragment[1],
                      schemeHostPortOrSchemeHostPortPathQueryFragment[2],
                    ],
                  ),
                  new SchemeHostPortPathQueryFragment.PathQueryFragment(
                    [
                      schemeHostPortOrSchemeHostPortPathQueryFragment[3],
                      schemeHostPortOrSchemeHostPortPathQueryFragment[4],
                    ],
                    schemeHostPortOrSchemeHostPortPathQueryFragment[5],
                  ),
                ]
              : [
                  new SchemeHostPortPathQueryFragment.SchemeHostPort(
                    schemeHostPortOrSchemeHostPortPathQueryFragment,
                  ),
                  new SchemeHostPortPathQueryFragment.PathQueryFragment(
                    pathQueryFragment,
                  ),
                ];
      this.schemeHostPort = this.parts[0];
      this.pathQueryFragment = this.parts[1];
    }
    catch (e) {
      throw new SyntaxError(
        `SchemeHostPortPathQueryFragment: constructor: error creating SchemeHostPortPathQueryFragment: \n${e as string}`,
      );
    }
  }

  public static get SchemeHostPort(): typeof SchemeHostPort {
    try {
      return importModule("SchemeHostPort") as typeof SchemeHostPort;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPortPathQueryFragment: get SchemeHostPort: error loading module: \n${e as string}`,
      );
    }
  }

  public static get PathQueryFragment(): typeof PathQueryFragment {
    try {
      return importModule("PathQueryFragment") as typeof PathQueryFragment;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPortPathQueryFragment: get PathQueryFragment: error loading module: \n${e as string}`,
      );
    }
  }

  public static get UrlComposite(): typeof UrlComposite {
    try {
      return shppqf_UrlComposite;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPortPathQueryFragment: get UrlComposite: error loading UrlComposite module: \n${e as string}`,
      );
    }
  }

  public get composite(): string {
    try {
      return this.schemeHostPort.isValid
        ? this.pathQueryFragment.isValid
          ? [
              this.schemeHostPort.toString(),
              this.pathQueryFragment.toString(),
            ].join("/")
          : this.schemeHostPort.toString()
        : "";
    }
    catch (e) {
      throw new EvalError(
        `SchemeHostPortPathQueryFragment: get composite: error getting composite: \n${e as string}`,
      );
    }
  }
}

module.exports = SchemeHostPortPathQueryFragment;
