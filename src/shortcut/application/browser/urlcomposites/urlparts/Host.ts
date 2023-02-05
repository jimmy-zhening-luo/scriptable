const ho_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Host extends ho_UrlPart {
  protected parse(host: string): string {
    return host;
  }
}

namespace Host {
  export const _HostIPv4Repeater: typeof HostIPv4Repeater = importModule("repeater/HostIPv4Repeater");
  export const _HostIPv6Repeater: typeof HostIPv6Repeater = importModule("repeater/HostIPv6Repeater");
  export const _HostRegNameRepeater: typeof HostRegNameRepeater = importModule("repeater/HostRegNameRepeater");
}

module.exports = Host;
