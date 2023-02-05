const hipf_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostIPv4Repeater extends hipf_UrlPartRepeater {
  protected parse(repeater: string): string {
    return repeater;
  }
}

module.exports = HostIPv4Repeater;
