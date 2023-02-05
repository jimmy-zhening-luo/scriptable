const hips_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostIPv6Repeater extends hips_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    return new HostIPv6Repeater._ValidHostIPv6Repeater(repeater).value;
  }
}

namespace HostIPv6Repeater {
  export const _ValidHostIPv6Repeater: typeof ValidHostIPv6Repeater = importModule("./shortcut/application/browser/urlcomposites/urlparts/validators/ValidHostIPv6Repeater");
}

module.exports = HostIPv6Repeater;
