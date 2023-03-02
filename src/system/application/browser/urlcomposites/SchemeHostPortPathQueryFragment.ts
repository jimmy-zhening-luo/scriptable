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
  }

  get composite(): string {
    return this.schemeHostPort.isValid
      ? this.pathQueryFragment.isValid
        ? [
            this.schemeHostPort.toString(),
            this.pathQueryFragment.toString(),
          ].join("/")
        : this.schemeHostPort.toString()
      : "";
  }

  get SchemeHostPort(): typeof SchemeHostPort {
    return SchemeHostPortPathQueryFragment.SchemeHostPort;
  }

  get PathQueryFragment(): typeof PathQueryFragment {
    return SchemeHostPortPathQueryFragment.PathQueryFragment;
  }

  static get SchemeHostPort(): typeof SchemeHostPort {
    return importModule("SchemeHostPort");
  }

  static get PathQueryFragment(): typeof PathQueryFragment {
    return importModule("PathQueryFragment");
  }

  static get UrlComposite(): typeof UrlComposite {
    return shppqf_UrlComposite;
  }
}

module.exports = SchemeHostPortPathQueryFragment;
