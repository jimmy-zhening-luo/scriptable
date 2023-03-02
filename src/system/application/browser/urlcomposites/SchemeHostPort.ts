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
    try {
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
    } catch (e) {
      throw new Error(
        `SchemeHostPort: constructor: error creating SchemeHostPort: ${e}`,
      );
    }
  }

  get composite(): string {
    try {
      return [this.scheme.toString(), this.hostPort.toString()].join("://");
    } catch (e) {
      throw new Error(
        `SchemeHostPort: get composite: error getting composite: ${e}`,
      );
    }
  }

  get Scheme(): typeof Scheme {
    try {
      return SchemeHostPort.Scheme;
    } catch (e) {
      throw new Error(`SchemeHostPort: get Scheme: error getting Scheme: ${e}`);
    }
  }

  get HostPort(): typeof HostPort {
    try {
      return SchemeHostPort.HostPort;
    } catch (e) {
      throw new Error(
        `SchemeHostPort: get HostPort: error getting HostPort: ${e}`,
      );
    }
  }

  static get Scheme(): typeof Scheme {
    try {
      return this.UrlParts.Scheme;
    } catch (e) {
      throw new Error(`SchemeHostPort: get Scheme: error getting Scheme: ${e}`);
    }
  }

  static get HostPort(): typeof HostPort {
    try {
      return importModule("HostPort");
    } catch (e) {
      throw new Error(
        `SchemeHostPort: get HostPort: error getting HostPort: ${e}`,
      );
    }
  }

  static get UrlComposite(): typeof UrlComposite {
    try {
      return shp_UrlComposite;
    } catch (e) {
      throw new Error(
        `SchemeHostPort: get UrlComposite: error getting UrlComposite: ${e}`,
      );
    }
  }
}

module.exports = SchemeHostPort;
