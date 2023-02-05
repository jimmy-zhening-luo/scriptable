const hips_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostIPv6Repeater extends hips_UrlPartRepeater {
  protected parse(repeater: string): string {
    return repeater;
  }
}

module.exports = HostIPv6Repeater;
