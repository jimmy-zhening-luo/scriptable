const ho_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class Host extends ho_UrlPart {
  constructor(host?: string | Host) {
    try {
      super(host);
    } catch (e) {
      throw new Error(`Host: constructor: error creating Host: \n${e}`);
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
                .map(hostRepeater => new Host.HostIPv4Repeater(hostRepeater))
                .every(
                  hostRepeater =>
                    hostRepeater.isValid &&
                    Number.parseInt(hostRepeater.toString()) <= 255,
                )) ||
            (host.split(":").length <= 8 &&
              host.split(":").length >= 3 &&
              host
                .split(":")
                .map(hostRepeater => new Host.HostIPv6Repeater(hostRepeater))
                .every(hostRepeater => hostRepeater.isValid)) ||
            (host.split(".").length >= 1 &&
              host
                .split(".")
                .map(hostRepeater => new Host.HostRegNameRepeater(hostRepeater))
                .every(hostRepeater => hostRepeater.isValid))
          ? host
          : null;
    } catch (e) {
      throw new Error(`Host: parse: error parsing Host: \n${e}`);
    }
  }

  static get HostIPv4Repeater(): typeof HostIPv4Repeater {
    try {
      return Host.Repeaters.HostIPv4Repeater;
    } catch (e) {
      throw new ReferenceError(
        `Host: error loading HostIPv4Repeater module: \n${e}`,
      );
    }
  }

  static get HostIPv6Repeater(): typeof HostIPv6Repeater {
    try {
      return Host.Repeaters.HostIPv6Repeater;
    } catch (e) {
      throw new ReferenceError(
        `Host: error loading HostIPv6Repeater module: \n${e}`,
      );
    }
  }

  static get HostRegNameRepeater(): typeof HostRegNameRepeater {
    try {
      return Host.Repeaters.HostRegNameRepeater;
    } catch (e) {
      throw new ReferenceError(
        `Host: error loading HostRegNameRepeater module: \n${e}`,
      );
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return ho_UrlPart;
    } catch (e) {
      throw new ReferenceError(
        `Host: error loading parent UrlPart module: \n${e}`,
      );
    }
  }
}

module.exports = Host;
