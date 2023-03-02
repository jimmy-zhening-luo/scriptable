const hp_UrlComposite: typeof UrlComposite = importModule(
  "urlcomposite/UrlComposite",
);

class HostPort extends hp_UrlComposite {
  readonly parts: [Host, Port];
  readonly host: Host;
  readonly port: Port;

  constructor(hostPort?: HostPort);
  constructor(host?: string | Host, port?: string | number | Port);

  constructor(
    hostOrHostPort?: string | Host | HostPort,
    port?: string | number | Port,
  ) {
    super();
    try {
      this.parts =
        hostOrHostPort === undefined
          ? [new this.Host(), new this.Port()]
          : hostOrHostPort instanceof HostPort
          ? hostOrHostPort.parts
          : [new this.Host(hostOrHostPort), new this.Port(port)];
      this.host = this.parts[0];
      this.port = this.parts[1];
    } catch (e) {
      throw new Error(`HostPort: constructor: error creating HostPort: ${e}`);
    }
  }

  get composite(): string {
    try {
      return this.host.isValid
        ? this.port.isValid
          ? [this.host.toString(), this.port.toString()].join(":")
          : this.host.toString()
        : "";
    } catch (e) {
      throw new Error(`HostPort: get composite: error getting composite: ${e}`);
    }
  }

  get Host(): typeof Host {
    try {
      return HostPort.Host;
    } catch (e) {
      throw new Error(`HostPort: get Host: error getting Host: ${e}`);
    }
  }

  get Port(): typeof Port {
    try {
      return HostPort.Port;
    } catch (e) {
      throw new Error(`HostPort: get Port: error getting Port: ${e}`);
    }
  }

  static get Host(): typeof Host {
    try {
      return this.UrlParts.Host;
    } catch (e) {
      throw new Error(`HostPort: get Host: error getting Host: ${e}`);
    }
  }

  static get Port(): typeof Port {
    try {
      return this.UrlParts.Port;
    } catch (e) {
      throw new Error(`HostPort: get Port: error getting Port: ${e}`);
    }
  }

  static get UrlComposite(): typeof UrlComposite {
    try {
      return hp_UrlComposite;
    } catch (e) {
      throw new Error(
        `HostPort: get UrlComposite: error getting UrlComposite: ${e}`,
      );
    }
  }
}

module.exports = HostPort;
