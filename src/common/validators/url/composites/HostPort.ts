const hp_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
) as typeof UrlComposite;

class HostPort extends hp_UrlComposite {
  public readonly parts: [UrlHost, UrlPort];
  public readonly host: UrlHost;
  public readonly port: UrlPort;

  constructor(
    hostOrHostPort?: string | UrlHost | HostPort,
    port?: string | number | UrlPort,
  ) {
    super();

    try {
      this.parts = hostOrHostPort === undefined
        ? [
            new HostPort.UrlHost(),
            new HostPort.UrlPort(),
          ]
        : hostOrHostPort instanceof HostPort
          ? hostOrHostPort.parts
          : [
              new HostPort.UrlHost(hostOrHostPort),
              new HostPort.UrlPort(port),
            ];      this.host = this.parts[0];      this.port = this.parts[1];
    }
    catch (e) {
      throw new SyntaxError(
        `HostPort: constructor: error creating HostPort`,
        { cause: e },
      );
    }
  }

  public static get UrlHost(): typeof UrlHost {
    try {
      return HostPort.UrlParts.UrlHost;
    }
    catch (e) {
      throw new ReferenceError(
        `HostPort: get UrlHost: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlPort(): typeof UrlPort {
    try {
      return HostPort.UrlParts.UrlPort;
    }
    catch (e) {
      throw new ReferenceError(
        `HostPort: get UrlPort: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlComposite(): typeof UrlComposite {
    try {
      return hp_UrlComposite;
    }
    catch (e) {
      throw new ReferenceError(
        `HostPort: get UrlComposite: error loading UrlComposite module`,
        { cause: e },
      );
    }
  }

  public get composite(): string {
    try {
      return this.host.isValid
        ? this.port.isValid
          ? [
              this.host.toString(),
              this.port.toString(),
            ].join(":")
          : this.host.toString()
        : "";
    }
    catch (e) {
      throw new EvalError(
        `HostPort: get composite: error getting composite`,
        { cause: e },
      );
    }
  }
}

module.exports = HostPort;
