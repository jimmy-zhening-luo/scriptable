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
    scheme?: string | Scheme,
    hostPortTuple?: [
      string | Host,
      string | number | Port
    ]
  );

  constructor(
    schemeOrSchemeHostPort?:
      string
      | Scheme
      | SchemeHostPort,
    hostPort?:
      HostPort
      | [
        string | Host,
        string | number | Port
      ]
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
          Array.isArray(hostPort) ?
            new SchemeHostPort._HostPort(
              new SchemeHostPort._HostPort._Host(hostPort[0]),
              new SchemeHostPort._HostPort._Port(hostPort[1])
            )
            : new SchemeHostPort._HostPort(hostPort)
        ];
  }

  get composite(): string {
    return [
      this.scheme.toString(),
      this.hostPort.toString()
    ].join("://");
  }
}

namespace SchemeHostPort {
  export const _Scheme: typeof Scheme = importModule("urlparts/Scheme");
  export const _HostPort: typeof HostPort = importModule("HostPort");
}

module.exports = SchemeHostPort;
