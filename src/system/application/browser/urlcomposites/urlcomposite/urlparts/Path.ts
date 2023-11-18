const pa_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class Path extends pa_UrlPart {
  constructor(path?: string | Path) {
    try {
      super(path);
    }
    catch (e) {
      throw new Error(`Path: constructor: error creating Path: \n${e}`);
    }
  }

  protected parse(path: string): null | string {
    try {
      const split: string[] = new Path.StringSplitter(
        path,
        ...Path.UrlValidators.CharSet.slash,
        {
          trim: true,
          trimTokens: true,
          ignoreEmptyTokens: true,
        },
      )
        .toTuple();

      return split.length === 0
        ? null
        : split.every(
          pathRepeater => new Path.PathRepeater(pathRepeater).isValid,
        )
          ? split.join(Path.UrlValidators.CharSet.slash[0])
          : null;
    }
    catch (e) {
      throw new Error(`Path: parse: error parsing Path: \n${e}`);
    }
  }

  append(subpath: string | Path): Path {
    try {
      const newPath: Path = new Path(
        [
          this.toString(),
          new Path(subpath)
            .toString(),
        ].join(
          Path.UrlValidators.CharSet.slash[0],
        ),
      );

      return newPath.isValid ? newPath : this;
    }
    catch (e) {
      throw new Error(`Path: append: error appending Path: \n${e}`);
    }
  }

  static get PathRepeater(): typeof PathRepeater {
    try {
      return Path.Repeaters.PathRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `Path: error loading PathRepeater module: \n${e}`,
      );
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return pa_UrlPart;
    }
    catch (e) {
      throw new ReferenceError(`Path: error loading UrlPart module: \n${e}`);
    }
  }

  static get StringSplitter(): typeof StringSplitter {
    try {
      return importModule(
        "./common/types/strings/StringSplitter",
      ) as typeof StringSplitter;
    }
    catch (e) {
      throw new ReferenceError(
        `Path: error loading StringSplitter module: \n${e}`,
      );
    }
  }
}

module.exports = Path;
