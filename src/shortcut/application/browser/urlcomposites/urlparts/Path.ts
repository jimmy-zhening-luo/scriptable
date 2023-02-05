const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Path extends pa_UrlPart {
  protected parse(path: string): null | string {
    path = path.trim();
    while (path.startsWith("/"))
      path = path.slice(1);
    while (path.endsWith("/"))
      path = path.slice(0, -1);
    return path
      .split("/")
      .map(pathRepeater => new Path._PathRepeater(pathRepeater))
      .every(pathRepeater => pathRepeater.isValid) ?
      path
      : "";
  }
}

namespace Path {
  export const _PathRepeater: typeof PathRepeater = importModule("repeaters/PathRepeater");
}

module.exports = Path;
