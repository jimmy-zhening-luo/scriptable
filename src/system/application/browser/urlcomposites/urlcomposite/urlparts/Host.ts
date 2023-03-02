const ho_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Host extends ho_UrlPart {
  constructor(host?: null | string | Host) {
    super(host);
  }

  protected parse(host: string): null | string {
    host = host.trim();
    host = host.includes("://") ? host.split("://").slice(1).join("://") : host;
    return host === ""
      ? null
      : (host.split(".").length === 4 &&
          host
            .split(".")
            .map(hostRepeater => new this.HostIPv4Repeater(hostRepeater))
            .every(
              hostRepeater =>
                hostRepeater.isValid &&
                Number.parseInt(hostRepeater.toString()) <= 255,
            )) ||
        (host.split(":").length <= 8 &&
          host.split(":").length >= 3 &&
          host
            .split(":")
            .map(hostRepeater => new this.HostIPv6Repeater(hostRepeater))
            .every(hostRepeater => hostRepeater.isValid)) ||
        (host.split(".").length >= 1 &&
          host
            .split(".")
            .map(hostRepeater => new this.HostRegNameRepeater(hostRepeater))
            .every(hostRepeater => hostRepeater.isValid))
      ? host
      : null;
  }

  protected get HostIPv4Repeater(): typeof HostIPv4Repeater {
    return this.Repeaters.HostIPv4Repeater;
  }

  protected get HostIPv6Repeater(): typeof HostIPv6Repeater {
    return this.Repeaters.HostIPv6Repeater;
  }

  protected get HostRegNameRepeater(): typeof HostRegNameRepeater {
    return this.Repeaters.HostRegNameRepeater;
  }

  static get UrlPart(): typeof UrlPart {
    return ho_UrlPart;
  }
}

module.exports = Host;
