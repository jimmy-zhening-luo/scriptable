const ho_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Host extends ho_UrlPart {
  protected parse(host: string): null | string {
    host = host.includes("://") ?
      host.split("://").slice(1).join("://")
      : host;
    return host.split(".").length === 4
      && host
        .split(".")
        .map(hostRepeater => new Host._HostIPv4Repeater(hostRepeater).toString())
        .every(hostRepeater => hostRepeater !== "")
      || host.split(":").length < 8
      && host.split(":").map(hostRepeater => new Host._HostIPv6Repeater(hostRepeater).toString()).every(hostRepeater => hostRepeater !== "")
      ? host
      : "";
  }
}

namespace Host {
  export const _HostIPv4Repeater: typeof HostIPv4Repeater = importModule("repeater/HostIPv4Repeater");
  export const _HostIPv6Repeater: typeof HostIPv6Repeater = importModule("repeater/HostIPv6Repeater");
  export const _HostRegNameRepeater: typeof HostRegNameRepeater = importModule("repeater/HostRegNameRepeater");
}

module.exports = Host;
