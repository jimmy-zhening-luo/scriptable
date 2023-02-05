const hrn_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostRegNameRepeater extends hrn_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    return repeater;
  }
}

namespace HostRegNameRepeater {
  export const _ValidHostRegNameRepeater: typeof ValidHostRegNameRepeater = importModule("./shortcut/application/browser/urlcomposites/urlparts/validators/ValidHostRegNameRepeater");
}

module.exports = HostRegNameRepeater;
