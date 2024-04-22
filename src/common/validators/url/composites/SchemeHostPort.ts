const shp_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
) as typeof UrlComposite;

class SchemeHostPort extends shp_UrlComposite {
  public readonly parts: [UrlScheme, HostPort];
  public readonly scheme: UrlScheme;
  public readonly hostPort: HostPort;

  constructor(
    schemeOrSchemeHostPort?: string | UrlScheme | SchemeHostPort,
    hostPort?: HostPort | [string | UrlHost, string | number | UrlPort],
  ) {
    super();

    try {
      this.parts = schemeOrSchemeHostPort === undefined
        ? [
            new SchemeHostPort.UrlScheme(),
            new SchemeHostPort.HostPort(),
          ]
        : schemeOrSchemeHostPort instanceof SchemeHostPort
          ? schemeOrSchemeHostPort.parts
          : [
              new SchemeHostPort.UrlScheme(schemeOrSchemeHostPort),
              Array.isArray(hostPort)
                ? new SchemeHostPort.HostPort(
                  new SchemeHostPort.HostPort.UrlHost(hostPort[0]),
                  new SchemeHostPort.HostPort.UrlPort(hostPort[1]),
                )
                : new SchemeHostPort.HostPort(hostPort),
            ];      this.scheme = this.parts[0];      this.hostPort = this.parts[1];
    }
    catch (e) {
      throw new SyntaxError(
        `SchemeHostPort: constructor: error creating SchemeHostPort`,
        { cause: e },
      );
    }
  }

  public static get UrlScheme(): typeof UrlScheme {
    try {
      return this.UrlParts.UrlScheme;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPort: get UrlScheme: error loading module`,
        { cause: e },
      );
    }
  }

  public static get HostPort(): typeof HostPort {
    try {
      return importModule("HostPort") as typeof HostPort;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPort: get HostPort: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlComposite(): typeof UrlComposite {
    try {
      return shp_UrlComposite;
    }
    catch (e) {
      throw new ReferenceError(
        `SchemeHostPort: get UrlComposite: error loading UrlComposite module`,
        { cause: e },
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
        `SchemeHostPort: get composite: error getting composite`,
        { cause: e },
      );
    }
  }
}

module.exports = SchemeHostPort;
