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
    schemeHostPort?: SchemeHostPort,
    pathQueryFragment?: PathQueryFragment
  );

  constructor(
    schemeHostPortOrSchemeHostPortPathQueryFragment?: SchemeHostPort | SchemeHostPortPathQueryFragment,
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
        : [
          new SchemeHostPortPathQueryFragment._SchemeHostPort(schemeHostPortOrSchemeHostPortPathQueryFragment),
          new SchemeHostPortPathQueryFragment._PathQueryFragment(pathQueryFragment)
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

namespace SchemeHostPortPathQueryFragment {;
  export const _SchemeHostPort: typeof SchemeHostPort = importModule("SchemeHostPort");
  export const _PathQueryFragment: typeof PathQueryFragment = importModule("PathQueryFragment");
}

module.exports = SchemeHostPortPathQueryFragment;
