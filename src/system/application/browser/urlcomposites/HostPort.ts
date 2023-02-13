const hp_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class HostPort extends hp_UrlComposite {

  readonly parts: [Host, Port];
  readonly host: Host;
  readonly port: Port;

  constructor(hostPort?: HostPort);
  constructor(
    host?: string | Host,
    port?: string | number | Port
  );

  constructor(
    hostOrHostPort?: string | Host | HostPort,
    port?: string | number | Port
  ) {
    super();
    this.parts = hostOrHostPort === undefined ?
      [
        new this.Host(),
        new this.Port()
      ]
      : hostOrHostPort instanceof HostPort ?
        hostOrHostPort.parts
        : [
          new this.Host(hostOrHostPort),
          new this.Port(port)
        ];
    this.host = this.parts[0];
    this.port = this.parts[1];
  }

  get composite(): string {
    return this.host.isValid ?
      this.port.isValid ?
        [
          this.host.toString(),
          this.port.toString()
        ].join(":")
        : this.host.toString()
      : "";
  }

  get Host(): typeof Host {
    return HostPort.Host;
  }

  get Port(): typeof Port {
    return HostPort.Port;
  }

  static get Host(): typeof Host {
    return this.UrlParts.Host;
  }

  static get Port(): typeof Port {
    return this.UrlParts.Port;
  }

  static get UrlComposite(): typeof UrlComposite {
    return hp_UrlComposite;
  }

}

module.exports = HostPort;
