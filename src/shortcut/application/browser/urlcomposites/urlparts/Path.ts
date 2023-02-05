const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Path extends pa_UrlPart {
  protected parse(path: string): null | string {
    return path
      .split("/")
      .map(pathRepeater => new Path._PathRepeater(pathRepeater).toString())
      .filter(pathRepeater => pathRepeater !== "")
      .join("/");
  }
}

namespace Path {
  export const _PathRepeater: typeof PathRepeater = importModule("repeater/PathRepeater");
}

module.exports = Path;
