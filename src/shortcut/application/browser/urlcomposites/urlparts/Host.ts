const ho_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

// WIP
class Host extends ho_UrlPart {
  constructor(
    host?: string | Host
  ) {
    super(host);
  }

  static get IP() {
    return importModule("host/IP");
  }
  static get IPv4() {
    return Host.IP.IPv4;
  }
  static get IPv6() {
    return Host.IP.IPv6;
  }
  static get RegName() {
    return importModule("host/RegName");
  }

  protected parse(host: any): string {
    return (this.parseIP(host) !== String()) ?
      this.parseIP(host)
      : (this.parseRegName(host) !== String()) ?
        this.parseRegName(host)
        : String();
  }

  protected parseIP(
    host: any
  ): string {
    return (this.parseIPv4(host) !== String()) ?
      this.parseIPv4(host)
      : (this.parseIPv6(host) !== String()) ?
        this.parseIPv6(host)
        : String();
  }

  protected parseIPv4(
    host: any
  ): string {
    return new Host.IPv4(host).string;
  }

  protected parseIPv6(
    host: any
  ): string {
    return new Host.IPv6(host).string;
  }

  protected parseRegName(
    host: any
  ): string {
    return new Host.RegName(host).string;
  }
}

namespace Host {
  export const _ValidIPv4: typeof ValidIPv4 = importModule("validators/validhosts/ValidIPv4");
  export const _ValidIPv6: typeof ValidIPv6 = importModule("validators/validhosts/ValidIPv6");
  export const _ValidRegName: typeof ValidRegName = importModule("validators/validhosts/ValidRegName");
}

module.exports = Host;
