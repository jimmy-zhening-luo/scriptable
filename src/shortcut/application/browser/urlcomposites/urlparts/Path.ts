const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

// WIP
class Path extends pa_UrlPart {
  constructor(
    path?: (string
      | Path
      | undefined
    )
  ) {
    super(path);
  }

  protected parse(path: string): string {
    return path;
  }

}

module.exports = Path;
