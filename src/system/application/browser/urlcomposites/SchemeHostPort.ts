const shp_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
) as typeof UrlComposite;

class SchemeHostPort extends shp_UrlComposite {
  public readonly parts: [Scheme, HostPort];
  public readonly scheme: Scheme;
  public readonly hostPort: HostPort;

  constructor(
    schemeOrSchemeHostPort?: string | Scheme | SchemeHostPort,
    hostPort?: HostPort | [string | Host, string | number | Port],
  ) {
    super();
    try {
      this.parts
        = schemeOrSchemeHostPort === undefined
          ? [
              new SchemeHostPort.Scheme(),
              new SchemeHostPort.HostPort(),
            ]
          : schemeOrSchemeHostPort instanceof SchemeHostPort
            ? schemeOrSchemeHostPort.parts
            : [
                new SchemeHostPort.Scheme(schemeOrSchemeHostPort),
                Array.isArray(hostPort)
                  ? new SchemeHostPort.HostPort(
                    new SchemeHostPort.HostPort.Host(hostPort[0]),
                    new SchemeHostPort.HostPort.Port(hostPort[1]),
                  )
                  : new SchemeHostPort.HostPort(hostPort),
              ];
      this.scheme = this.parts[0];
      this.hostPort = this.parts[1];
    }
    catch (e) {
      throw new SyntaxError(
        `SchemeHostPort: constructor: error creating SchemeHostPort: \n${e as string}`,
      );
    }
  }

  public static get Scheme(): typeof Scheme {
    try {
      return this.UrlParts.Scheme;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPort: get Scheme: error loading Scheme module: \n${e as string}`,
      );
    }
  }

  public static get HostPort(): typeof HostPort {
    try {
      return importModule("HostPort") as typeof HostPort;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPort: get HostPort: error loading HostPort module: \n${e as string}`,
      );
    }
  }

  public static get UrlComposite(): typeof UrlComposite {
    try {
      return shp_UrlComposite;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPort: get UrlComposite: error loading UrlComposite module: \n${e as string}`,
      );
    }
  }

  public get composite(): string {
    try {
      return [
        this.scheme.toString(),
        this.hostPort.toString(),
      ].join("://");
    }
    catch (e) {
      throw new EvalError(
        `SchemeHostPort: get composite: error getting composite: \n${e as string}`,
      );
    }
  }
}

module.exports = SchemeHostPort;
