const hrn_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostRegNameRepeater extends hrn_UrlPartRepeater {
  protected parse(repeater: string): string {
    return repeater;
  }
}

module.exports = HostRegNameRepeater;
