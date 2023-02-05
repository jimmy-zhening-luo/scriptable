const ho_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Host extends ho_UrlPart {
  protected parse(host: string): null | string {
    host = host.trim();
    host = host.includes("://") ?
      host.split("://").slice(1).join("://")
      : host;
    return (
      host
        .split(".").length === 4
      && host
        .split(".")
        .map(hostRepeater => new Host._HostIPv4Repeater(hostRepeater))
        .every(hostRepeater => (
          hostRepeater.isValid
          && Number.parseInt(hostRepeater.toString()) <= 255
        ))
    ) || (
      host
        .split(":").length < 8
      && host
        .split(":")
        .map(hostRepeater => new Host._HostIPv6Repeater(hostRepeater))
        .every(hostRepeater => hostRepeater.isValid)
    ) || (
      host
        .split(".").length >= 1
      && host
        .split(".")
        .map(hostRepeater => new Host._HostRegNameRepeater(hostRepeater))
        .every(hostRepeater => hostRepeater.isValid)
    )
      ? host
      : "";
  }
}

namespace Host {
  export const _HostIPv4Repeater: typeof HostIPv4Repeater = importModule("repeaters/HostIPv4Repeater");
  export const _HostIPv6Repeater: typeof HostIPv6Repeater = importModule("repeaters/HostIPv6Repeater");
  export const _HostRegNameRepeater: typeof HostRegNameRepeater = importModule("repeaters/HostRegNameRepeater");
}

module.exports = Host;
