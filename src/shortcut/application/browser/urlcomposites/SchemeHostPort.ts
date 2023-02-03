const shp_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class SchemeHostPort extends shp_UrlComposite {
  readonly parts: [Scheme, HostPort];
  readonly scheme: Scheme = this.parts[0];
  readonly hostport: HostPort = this.parts[1];

  constructor(schemeHostPort: SchemeHostPort);
  constructor(scheme: string | Scheme, hostport: HostPort);
  constructor(
    schemeOrSchemeHostPort: string | Scheme | SchemeHostPort,
    hostport: HostPort = new SchemeHostPort._HostPort()
  ) {
    super();
    this.parts = schemeOrSchemeHostPort instanceof SchemeHostPort ?
      schemeOrSchemeHostPort.parts
      : [
        new SchemeHostPort._Scheme(schemeOrSchemeHostPort),
        new SchemeHostPort._HostPort(hostport)
      ]
  }

  get composite(): string {
    return [
      this.scheme.hasValue ?
        this.scheme.toString()
        : "https",
      this.hostport.toString()
    ].join("://");
  }
}

namespace SchemeHostPort {
  export const _Scheme: typeof Scheme = importModule("urlparts/Scheme");
  export const _HostPort: typeof HostPort = importModule("HostPort");
}

module.exports = SchemeHostPort;
