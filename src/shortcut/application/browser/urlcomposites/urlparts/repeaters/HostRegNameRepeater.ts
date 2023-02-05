const hrn_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostRegNameRepeater extends hrn_UrlPartRepeater {
  protected parse(repeater: string): string {
    return repeater;
  }
}

namespace QueryRepeater {
  export const _ValidHostRegNameRepeater: typeof ValidHostRegNameRepeater = importModule("./shortcut/application/browser/urlcomposites/urlparts/validators/ValidHostRegNameRepeater");
}

module.exports = HostRegNameRepeater;
