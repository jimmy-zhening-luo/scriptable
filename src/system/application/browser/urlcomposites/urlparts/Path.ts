const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Path extends pa_UrlPart {

  constructor(
    path?:
      | null
      | string
      | Path
  ) {
    super(path);
  }

  protected parse(path: string): null | string {
    return path.trim() === "" ?
      null
      : path
        .trim()
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
    const subpathToUrl: UrlPart = new Path(subpath);
    return subpathToUrl.isValid ?
      new Path(
        [
          this.toString() as string,
          subpathToUrl.toString()
        ].join(
          this.toString().endsWith("/") ?
            ""
            : subpathToUrl.toString().startsWith("/") ?
              ""
              : "/"
        )
      )
      : this;
  }

  protected get PathRepeater(): typeof PathRepeater {
    return this.Repeaters.PathRepeater;
  }

  static get UrlPart(): typeof UrlPart {
    return pa_UrlPart;
  }

}

module.exports = Path;
