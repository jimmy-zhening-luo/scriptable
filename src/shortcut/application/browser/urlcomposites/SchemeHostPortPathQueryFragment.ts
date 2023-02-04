const shppqf_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class SchemeHostPortPathQueryFragment extends shppqf_UrlComposite {
  readonly parts: [
    SchemeHostPort,
    PathQueryFragment
  ];
  readonly schemeHostPort: SchemeHostPort = this.parts[0];
  readonly pathQueryFragment: PathQueryFragment = this.parts[1];

  constructor();
  constructor(schemeHostPortPathQueryFragment?: SchemeHostPortPathQueryFragment);
  constructor(schemeHostPort?: SchemeHostPort);
  constructor(
    schemeHostPortPathQueryFragmentTuple?: [
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
    schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment?:
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
    hostOrPathQueryFragment?: PathQueryFragment
  ) {
    super();
    this.parts = schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment === undefined ?
      [
        new SchemeHostPortPathQueryFragment._SchemeHostPort(),
        new SchemeHostPortPathQueryFragment._PathQueryFragment()
      ]
      : schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment instanceof SchemeHostPortPathQueryFragment ?
        schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment.parts
        : Array.isArray(schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment) ?
          [
            new SchemeHostPortPathQueryFragment._SchemeHostPort(schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment[0], [
              schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment[1],
              schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment[2]
            ]),
            new SchemeHostPortPathQueryFragment._PathQueryFragment(
              [
                schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment[3],
                schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment[4]
              ],
              schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment[5]
            )
          ]
          : [
            new SchemeHostPortPathQueryFragment._SchemeHostPort(schemeOrSchemeHostPortOrSchemeHostPortPathQueryFragment),
            new SchemeHostPortPathQueryFragment._PathQueryFragment(hostOrPathQueryFragment)
          ];
  }

  get composite(): string {
    return this.schemeHostPort.hasValue ?
      this.pathQueryFragment.hasValue ?
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
