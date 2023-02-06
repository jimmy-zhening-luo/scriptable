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
        new HostPort._Host(),
        new HostPort._Port()
      ]
      : hostOrHostPort instanceof HostPort ?
        hostOrHostPort.parts
        : [
          new HostPort._Host(hostOrHostPort),
          new HostPort._Port(port)
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
}

namespace HostPort {
  export const _Host: typeof Host = importModule("urlparts/Host");
  export const _Port: typeof Port = importModule("urlparts/Port");
}

module.exports = HostPort;
