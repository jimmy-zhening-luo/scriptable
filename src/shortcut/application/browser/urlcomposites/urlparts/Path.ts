const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Path extends pa_UrlPart {
  protected parse(path: string): string {
    return path;
  }
}

namespace Path {
  export const _PathRepeater: typeof PathRepeater = importModule("repeater/PathRepeater");
}

module.exports = Path;
