const hp_UrlComposite: typeof UrlComposite = importModule("urlcomposite/UrlComposite");

class HostPort extends hp_UrlComposite {
  readonly parts: [Host, Port];
  readonly host: Host = this.parts[0];
  readonly port: Port = this.parts[1];


  constructor();
  constructor(hostport: HostPort);
  constructor(host: string | Host);
  constructor(
    host: string | Host | undefined,
    port: string | number | Port | undefined
  );

  constructor(
    hostOrHostport?: string | Host | HostPort | undefined,
    port?: string | number | Port | undefined
  ) {
    super();
    if (hostOrHostport === undefined)
      this.parts = [
        new HostPort._Host(),
        new HostPort._Port()
      ];
    else if (hostOrHostport instanceof HostPort)
      this.parts = hostOrHostport.parts;
    else
      this.parts = [
        new HostPort._Host(hostOrHostport),
        new HostPort._Port(port)
      ];
  }

  get composite(): string {
    return this.host.hasValue ?
      this.port.hasValue ?
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
