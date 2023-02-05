const pa_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class PathRepeater extends pa_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    return repeater;
  }
}

namespace PathRepeater {
  export const _ValidPathRepeater: typeof ValidPathRepeater = importModule("./shortcut/application/browser/urlcomposites/urlparts/validators/ValidPathRepeater");
}

module.exports = PathRepeater;
