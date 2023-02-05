const pa_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class PathRepeater extends pa_UrlPartRepeater {
  protected parse(repeater: string): string {
    return repeater;
  }
}

module.exports = PathRepeater;
