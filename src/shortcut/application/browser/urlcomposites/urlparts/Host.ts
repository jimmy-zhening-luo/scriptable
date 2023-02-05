const ho_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

// WIP
class Host extends ho_UrlPart {
  constructor(
    host?: string | Host
  ) {
    super(host);
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
    return new Host._ValidHostIPv4(host).string;
  }

  protected parseIPv6(
    host: any
  ): string {
    return new Host._ValidHostIPv6(host).string;
  }

  protected parseRegName(
    host: any
  ): string {
    return new Host._ValidHostRegName(host).string;
  }
}

namespace Host {
  export const _ValidHostIPv4: typeof ValidHostIPv4 = importModule("validators/ValidIPv4");
  export const _ValidHostIPv6: typeof ValidHostIPv6 = importModule("validators/ValidIPv6");
  export const _ValidHostRegName: typeof ValidHostRegName = importModule("validators/ValidRegName");
}

module.exports = Host;
