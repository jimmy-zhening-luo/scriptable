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

  appendPath(
    subpath:
      | null | undefined
      | string
      | Path
  ) {
    return new Path(
      this.Paths.joinPaths(
        this.toString(),
        new Path(subpath).toString()
      )
    );
  }
}

namespace Path {
  export const _PathRepeater: typeof PathRepeater = importModule("repeaters/PathRepeater");
}

module.exports = Path;
