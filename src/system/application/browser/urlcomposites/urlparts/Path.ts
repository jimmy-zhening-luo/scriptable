const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Path extends pa_UrlPart {
  protected parse(path: string): null | string {
    path = Path.Paths.trimPath(path);
    return path === "" ?
      null
      : path
        .split("/")
        .map(pathRepeater => new Path._PathRepeater(pathRepeater))
        .every(pathRepeater => pathRepeater.isValid) ?
        path
        : null;
  }
}

namespace Path {
  export const _PathRepeater: typeof PathRepeater = importModule("repeaters/PathRepeater");
}

module.exports = Path;
