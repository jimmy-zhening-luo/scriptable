const shp_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class SchemeHostPort extends shp_UrlComposite {
  readonly parts: [Scheme, HostPort];
  readonly scheme: Scheme = this.parts[0];
  readonly hostPort: HostPort = this.parts[1];

  constructor();
  constructor(schemeHostPort?: SchemeHostPort);
  constructor(scheme?: string | Scheme);
  constructor(
    scheme?: string | Scheme,
    hostPort?: HostPort
  );
  constructor(
    schemeOrSchemeHostPort?: string | Scheme | SchemeHostPort,
    hostPort?: HostPort
  ) {
    super();
    this.parts = schemeOrSchemeHostPort === undefined ?
      [
        new SchemeHostPort._Scheme(),
        new SchemeHostPort._HostPort()
      ]
      : schemeOrSchemeHostPort instanceof SchemeHostPort ?
        schemeOrSchemeHostPort.parts
        : [
          new SchemeHostPort._Scheme(schemeOrSchemeHostPort),
          new SchemeHostPort._HostPort(hostPort)
        ];
  }

  get composite(): string {
    return [
      this.scheme.hasValue ?
        this.scheme.toString()
        : "https",
      this.hostPort.toString()
    ].join("://");
  }
}

namespace SchemeHostPort {
  export const _Scheme: typeof Scheme = importModule("urlparts/Scheme");
  export const _HostPort: typeof HostPort = importModule("HostPort");
}

module.exports = SchemeHostPort;
