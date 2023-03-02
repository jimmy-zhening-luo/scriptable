const shppqf_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
);

class SchemeHostPortPathQueryFragment extends shppqf_UrlComposite {
  readonly parts: [SchemeHostPort, PathQueryFragment];
  readonly schemeHostPort: SchemeHostPort;
  readonly pathQueryFragment: PathQueryFragment;

  constructor(
    schemeHostPortPathQueryFragment?:
      | SchemeHostPortPathQueryFragment
      | [
          string | Scheme,
          string | Host,
          string | number | Port,
          string | Path,
          string | Query,
          string | Fragment,
        ],
  );
  constructor(
    schemeHostPort?: SchemeHostPort,
    pathQueryFragment?: PathQueryFragment,
  );

  constructor(
    schemeHostPortOrSchemeHostPortPathQueryFragment?:
      | SchemeHostPort
      | SchemeHostPortPathQueryFragment
      | [
          string | Scheme,
          string | Host,
          string | number | Port,
          string | Path,
          string | Query,
          string | Fragment,
        ],
    pathQueryFragment?: PathQueryFragment,
  ) {
    super();
    try {
      this.parts =
        schemeHostPortOrSchemeHostPortPathQueryFragment === undefined
          ? [new this.SchemeHostPort(), new this.PathQueryFragment()]
          : schemeHostPortOrSchemeHostPortPathQueryFragment instanceof
            SchemeHostPortPathQueryFragment
          ? schemeHostPortOrSchemeHostPortPathQueryFragment.parts
          : Array.isArray(schemeHostPortOrSchemeHostPortPathQueryFragment)
          ? [
              new this.SchemeHostPort(
                schemeHostPortOrSchemeHostPortPathQueryFragment[0],
                [
                  schemeHostPortOrSchemeHostPortPathQueryFragment[1],
                  schemeHostPortOrSchemeHostPortPathQueryFragment[2],
                ],
              ),
              new this.PathQueryFragment(
                [
                  schemeHostPortOrSchemeHostPortPathQueryFragment[3],
                  schemeHostPortOrSchemeHostPortPathQueryFragment[4],
                ],
                schemeHostPortOrSchemeHostPortPathQueryFragment[5],
              ),
            ]
          : [
              new this.SchemeHostPort(
                schemeHostPortOrSchemeHostPortPathQueryFragment,
              ),
              new this.PathQueryFragment(pathQueryFragment),
            ];
      this.schemeHostPort = this.parts[0];
      this.pathQueryFragment = this.parts[1];
    } catch (e) {
      throw new Error(
        `SchemeHostPortPathQueryFragment: constructor: error creating SchemeHostPortPathQueryFragment: ${e}`,
      );
    }
  }

  get composite(): string {
    try {
      return this.schemeHostPort.isValid
        ? this.pathQueryFragment.isValid
          ? [
              this.schemeHostPort.toString(),
              this.pathQueryFragment.toString(),
            ].join("/")
          : this.schemeHostPort.toString()
        : "";
    } catch (e) {
      throw new Error(
        `SchemeHostPortPathQueryFragment: get composite: error getting composite: ${e}`,
      );
    }
  }

  get SchemeHostPort(): typeof SchemeHostPort {
    try {
      return SchemeHostPortPathQueryFragment.SchemeHostPort;
    } catch (e) {
      throw new Error(
        `SchemeHostPortPathQueryFragment: get SchemeHostPort: error getting SchemeHostPort: ${e}`,
      );
    }
  }

  get PathQueryFragment(): typeof PathQueryFragment {
    try {
      return SchemeHostPortPathQueryFragment.PathQueryFragment;
    } catch (e) {
      throw new Error(
        `SchemeHostPortPathQueryFragment: get PathQueryFragment: error getting PathQueryFragment: ${e}`,
      );
    }
  }

  static get SchemeHostPort(): typeof SchemeHostPort {
    try {
      return importModule("SchemeHostPort");
    } catch (e) {
      throw new Error(
        `SchemeHostPortPathQueryFragment: get SchemeHostPort: error getting SchemeHostPort: ${e}`,
      );
    }
  }

  static get PathQueryFragment(): typeof PathQueryFragment {
    try {
      return importModule("PathQueryFragment");
    } catch (e) {
      throw new Error(
        `SchemeHostPortPathQueryFragment: get PathQueryFragment: error getting PathQueryFragment: ${e}`,
      );
    }
  }

  static get UrlComposite(): typeof UrlComposite {
    try {
      return shppqf_UrlComposite;
    } catch (e) {
      throw new Error(
        `SchemeHostPortPathQueryFragment: get UrlComposite: error getting UrlComposite: ${e}`,
      );
    }
  }
}

module.exports = SchemeHostPortPathQueryFragment;
