const shppqf_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class SchemeHostPortPathQueryFragment extends shppqf_UrlComposite {
  readonly parts: [
    SchemeHostPort,
    PathQueryFragment
  ];
  readonly schemeHostPort: SchemeHostPort = this.parts[0];
  readonly pathQueryFragment: PathQueryFragment = this.parts[1];

  constructor(
    schemeHostPortPathQueryFragment?:
      SchemeHostPortPathQueryFragment
      | [
        string | Scheme,
        string | Host,
        string | number | Port,
        string | Path,
        string | Query,
        string | Fragment
      ]
  )
  constructor(
    schemeHostPort?: SchemeHostPort,
    pathQueryFragment?: PathQueryFragment
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
        string | Fragment
      ]
    ,
    pathQueryFragment?: PathQueryFragment
  ) {
    super();
    this.parts = schemeHostPortOrSchemeHostPortPathQueryFragment === undefined ?
      [
        new SchemeHostPortPathQueryFragment._SchemeHostPort(),
        new SchemeHostPortPathQueryFragment._PathQueryFragment()
      ]
      : schemeHostPortOrSchemeHostPortPathQueryFragment instanceof SchemeHostPortPathQueryFragment ?
        schemeHostPortOrSchemeHostPortPathQueryFragment.parts
        : Array.isArray(schemeHostPortOrSchemeHostPortPathQueryFragment) ?
          [
            new SchemeHostPortPathQueryFragment._SchemeHostPort(schemeHostPortOrSchemeHostPortPathQueryFragment[0], [
              schemeHostPortOrSchemeHostPortPathQueryFragment[1],
              schemeHostPortOrSchemeHostPortPathQueryFragment[2]
            ]),
            new SchemeHostPortPathQueryFragment._PathQueryFragment(
              [
                schemeHostPortOrSchemeHostPortPathQueryFragment[3],
                schemeHostPortOrSchemeHostPortPathQueryFragment[4]
              ],
              schemeHostPortOrSchemeHostPortPathQueryFragment[5]
            )
          ]
          : [
            new SchemeHostPortPathQueryFragment._SchemeHostPort(schemeHostPortOrSchemeHostPortPathQueryFragment),
            new SchemeHostPortPathQueryFragment._PathQueryFragment(pathQueryFragment)
          ];
  }

  get composite(): string {
    return this.schemeHostPort.isValid ?
      this.pathQueryFragment.isValid ?
        [
          this.schemeHostPort.toString(),
          this.pathQueryFragment.toString()
        ].join("/")
        : this.schemeHostPort.toString()
      : "";
  }
}

namespace SchemeHostPortPathQueryFragment {
  ;
  export const _SchemeHostPort: typeof SchemeHostPort = importModule("SchemeHostPort");
  export const _PathQueryFragment: typeof PathQueryFragment = importModule("PathQueryFragment");
}

module.exports = SchemeHostPortPathQueryFragment;
