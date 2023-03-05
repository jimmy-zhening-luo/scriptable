const pa_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Path extends pa_UrlPart {
  constructor(path?: string | Path) {
    try {
      super(path);
    } catch (e) {
      throw new Error(`Path: constructor: error creating Path: ${e}`);
    }
  }

  protected parse(path: string): null | string {
    try {
      const split: string[] = new this.StringSplitter(
        path,
        ...this.UrlValidators.Char.slash,
        {
          trim: true,
          trimTokens: true,
          ignoreEmptyTokens: true,
        },
      ).toTuple();
      return split.length === 0
        ? null
        : split.every(
            pathRepeater => new this.PathRepeater(pathRepeater).isValid,
          )
        ? split.join(this.UrlValidators.Char.slash[0])
        : null;
    } catch (e) {
      throw new Error(`Path: parse: error parsing Path: ${e}`);
    }
  }

  append(subpath: string | Path): Path {
    try {
      const newPath: Path = new Path(
        [this.toString(), new Path(subpath).toString()].join(
          this.UrlValidators.Char.slash[0],
        ),
      );
      return newPath.isValid ? newPath : this;
    } catch (e) {
      throw new Error(`Path: append: error appending Path: ${e}`);
    }
  }

  protected get PathRepeater(): typeof PathRepeater {
    try {
      return this.Repeaters.PathRepeater;
    } catch (e) {
      throw new ReferenceError(`Path: error loading PathRepeater module: ${e}`);
    }
  }

  protected get StringSplitter(): typeof StringSplitter {
    try {
      return Path.StringSplitter;
    } catch (e) {
      throw new ReferenceError(
        `Path: error loading StringSplitter module: ${e}`,
      );
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return pa_UrlPart;
    } catch (e) {
      throw new ReferenceError(`Path: error loading UrlPart module: ${e}`);
    }
  }

  static get StringSplitter(): typeof StringSplitter {
    try {
      return importModule("./common/types/strings/StringSplitter");
    } catch (e) {
      throw new ReferenceError(
        `Path: error loading StringSplitter module: ${e}`,
      );
    }
  }
}

module.exports = Path;
