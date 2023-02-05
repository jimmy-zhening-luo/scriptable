const hrn_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostRegNameRepeater extends hrn_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    return new HostRegNameRepeater._ValidHostRegNameRepeater(repeater).value;
  }
}

namespace HostRegNameRepeater {
  export const _ValidHostRegNameRepeater: typeof ValidHostRegNameRepeater = importModule("./system/application/browser/urlcomposites/urlparts/validators/ValidHostRegNameRepeater");
}

module.exports = HostRegNameRepeater;
