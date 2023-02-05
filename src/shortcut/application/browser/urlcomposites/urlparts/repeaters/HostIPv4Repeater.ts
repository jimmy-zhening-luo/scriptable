const hipf_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostIPv4Repeater extends hipf_UrlPartRepeater {
  protected parse(repeater: string): string {
    return repeater;
  }
}

namespace HostIPv4Repeater {
  export const _ValidHostIPv4Repeater: typeof ValidHostIPv4Repeater = importModule("./shortcut/application/browser/urlcomposites/urlparts/validators/ValidHostIPv4Repeater");
}

module.exports = HostIPv4Repeater;
