const shp_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class SchemeHostPort extends shp_UrlComposite {
  readonly parts: [Scheme, HostPort];
  readonly scheme: Scheme = this.parts[0];
  readonly hostport: HostPort = this.parts[1];


  constructor(
    scheme: string | Scheme | undefined,
    hostport: HostPort | undefined
  ) {
    super();
    this.parts = [
      new SchemeHostPort._Scheme(scheme),
      new SchemeHostPort._HostPort(hostport)
    ]
  }
}

namespace SchemeHostPort {
  export const _Scheme: typeof Scheme = importModule("urlparts/Scheme");
  export const _HostPort: typeof HostPort = importModule("HostPort");
}

module.exports = SchemeHostPort;
