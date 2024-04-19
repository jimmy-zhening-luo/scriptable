const ho_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class UrlHost extends ho_UrlPart {
  constructor(host?: string | UrlHost) {
    try {
      super(host);
    }
    catch (e) {
      throw new Error(`UrlHost: constructor: error creating UrlHost: \n${e as string}`);
    }
  }

  public static get HostIPv4Repeater(): typeof HostIPv4Repeater {
    try {
      return UrlHost.Repeaters.HostIPv4Repeater;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlHost: error loading module`,
        { cause: e },
      );
    }
  }

  public static get HostIPv6Repeater(): typeof HostIPv6Repeater {
    try {
      return UrlHost.Repeaters.HostIPv6Repeater;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlHost: error loading module`,
        { cause: e },
      );
    }
  }

  public static get HostRegNameRepeater(): typeof HostRegNameRepeater {
    try {
      return UrlHost.Repeaters.HostRegNameRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlHost: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlPart(): typeof UrlPart {
    try {
      return ho_UrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlHost: error loading module`,
        { cause: e },
      );
    }
  }

  protected parse(host: string): null | string {
    try {
      host = host.trim();
      host = host.includes("://")
        ? host.split("://")
          .slice(1)
          .join("://")
        : host;

      return host === ""
        ? null
        : host.split(".").length === 4
              && host
                .split(".")
                .map(hostRepeater => new UrlHost.HostIPv4Repeater(hostRepeater))
                .every(
                  hostRepeater =>
                    hostRepeater.isValid
                    && Number.parseInt(hostRepeater.toString()) <= 255,
                )
            || host.split(":").length <= 8
              && host.split(":").length >= 3
              && host
                .split(":")
                .map(hostRepeater => new UrlHost.HostIPv6Repeater(hostRepeater))
                .every(hostRepeater => hostRepeater.isValid)
            || host.split(".").length >= 1
              && host
                .split(".")
                .map(
                  hostRepeater => new UrlHost.HostRegNameRepeater(hostRepeater),
                )
                .every(hostRepeater => hostRepeater.isValid)
          ? host
          : null;
    }
    catch (e) {
      throw new Error(`UrlHost: parse: error parsing UrlHost: \n${e as string}`);
    }
  }
}

module.exports = UrlHost;
