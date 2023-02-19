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
    const split: string[] = new this.StringSplitter(
      path,
      ...this.UrlValidators.Char.slash,
      {
        trim: true,
        trimTokens: true,
        ignoreEmptyTokens: true
      }
    ).toTuple();
    return split.length === 0 ?
      null
      : split
        .every(pathRepeater => new this.PathRepeater(pathRepeater).isValid) ?
        split.join(this.UrlValidators.Char.slash[0])
        : null;
  }

  append(
    subpath:
      | null
      | undefined
      | string
      | Path
  ): Path {
    const newPath: Path = new Path(
      [
        this.toString(),
        new Path(subpath).toString()
      ]
        .join(this.UrlValidators.Char.slash[0])
    );
    return newPath.isValid ?
      newPath
      : this;
  }

  protected get PathRepeater(): typeof PathRepeater {
    return this.Repeaters.PathRepeater;
  }

  protected get StringSplitter(): typeof StringSplitter {
    return Path.StringSplitter;
  }

  static get UrlPart(): typeof UrlPart {
    return pa_UrlPart;
  }

  static get StringSplitter(): typeof StringSplitter {
    return importModule("./common/types/strings/StringSplitter");
  }

}

module.exports = Path;
