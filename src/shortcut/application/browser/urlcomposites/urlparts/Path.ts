const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

// WIP
class Path extends pa_UrlPart {
  constructor(
    path?: (string
      | Path
    )
  ) {
    super(path);
  }

  protected parse(path: string): string {
    return path;
  }
}

namespace Path {
  export const _ValidPath: typeof ValidPath = importModule("validators/ValidPath");
}

module.exports = Path;
