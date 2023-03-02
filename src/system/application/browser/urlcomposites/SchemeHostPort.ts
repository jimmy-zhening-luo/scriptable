const shp_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
);

class SchemeHostPort extends shp_UrlComposite {
  readonly parts: [Scheme, HostPort];
  readonly scheme: Scheme;
  readonly hostPort: HostPort;

  constructor(schemeHostPort?: SchemeHostPort);
  constructor(
    scheme?: string | Scheme,
    hostPort?: HostPort | [string | Host, string | number | Port],
  );

  constructor(
    schemeOrSchemeHostPort?: string | Scheme | SchemeHostPort,
    hostPort?: HostPort | [string | Host, string | number | Port],
  ) {
    super();
    this.parts =
      schemeOrSchemeHostPort === undefined
        ? [new this.Scheme(), new this.HostPort()]
        : schemeOrSchemeHostPort instanceof SchemeHostPort
        ? schemeOrSchemeHostPort.parts
        : [
            new this.Scheme(schemeOrSchemeHostPort),
            Array.isArray(hostPort)
              ? new this.HostPort(
                  new this.HostPort.Host(hostPort[0]),
                  new this.HostPort.Port(hostPort[1]),
                )
              : new this.HostPort(hostPort),
          ];
    this.scheme = this.parts[0];
    this.hostPort = this.parts[1];
  }

  get composite(): string {
    return [this.scheme.toString(), this.hostPort.toString()].join("://");
  }

  get Scheme(): typeof Scheme {
    return SchemeHostPort.Scheme;
  }

  get HostPort(): typeof HostPort {
    return SchemeHostPort.HostPort;
  }

  static get Scheme(): typeof Scheme {
    return this.UrlParts.Scheme;
  }

  static get HostPort(): typeof HostPort {
    return importModule("HostPort");
  }

  static get UrlComposite(): typeof UrlComposite {
    return shp_UrlComposite;
  }
}

module.exports = SchemeHostPort;
