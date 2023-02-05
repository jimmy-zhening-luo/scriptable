const hipf_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostIPv4Repeater extends hipf_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    return new HostIPv4Repeater._ValidHostIPv4Repeater(repeater).value;
  }
}

namespace HostIPv4Repeater {
  export const _ValidHostIPv4Repeater: typeof ValidHostIPv4Repeater = importModule("./system/application/browser/urlcomposites/urlparts/validators/ValidHostIPv4Repeater");
}

module.exports = HostIPv4Repeater;
