const ho_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Host extends ho_UrlPart {
  constructor(host?: null | string | Host) {
    try {
      super(host);
    } catch (e) {
      throw new Error(`Host: constructor: error creating Host: ${e}`);
    }
  }

  protected parse(host: string): null | string {
    try {
      host = host.trim();
      host = host.includes("://")
        ? host.split("://").slice(1).join("://")
        : host;
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
    } catch (e) {
      throw new Error(`Host: parse: error parsing Host: ${e}`);
    }
  }

  protected get HostIPv4Repeater(): typeof HostIPv4Repeater {
    try {
      return this.Repeaters.HostIPv4Repeater;
    } catch (e) {
      throw new ReferenceError(
        `Host: error loading HostIPv4Repeater module: ${e}`,
      );
    }
  }

  protected get HostIPv6Repeater(): typeof HostIPv6Repeater {
    try {
      return this.Repeaters.HostIPv6Repeater;
    } catch (e) {
      throw new ReferenceError(
        `Host: error loading HostIPv6Repeater module: ${e}`,
      );
    }
  }

  protected get HostRegNameRepeater(): typeof HostRegNameRepeater {
    try {
      return this.Repeaters.HostRegNameRepeater;
    } catch (e) {
      throw new ReferenceError(
        `Host: error loading HostRegNameRepeater module: ${e}`,
      );
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return ho_UrlPart;
    } catch (e) {
      throw new ReferenceError(
        `Host: error loading parent UrlPart module: ${e}`,
      );
    }
  }
}

module.exports = Host;
