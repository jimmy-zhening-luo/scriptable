const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Path extends pa_UrlPart {

  protected parse(path: string): null | string {
    path = Path.Paths.trimPath(path);
    return path === "" ?
      null
      : path
        .split("/")
        .map(pathRepeater => new this.PathRepeater(pathRepeater))
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

  protected get PathRepeater(): typeof PathRepeater {
    return this.Repeaters.PathRepeater;
  }

  static get UrlPart(): typeof UrlPart {
    return pa_UrlPart;
  }

}

module.exports = Path;
