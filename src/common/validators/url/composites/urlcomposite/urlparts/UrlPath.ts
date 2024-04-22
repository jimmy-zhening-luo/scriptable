const pa_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class UrlPath extends pa_UrlPart {
  constructor(path?: string | UrlPath) {
    try {
      super(path);
    }
    catch (e) {
      throw new EvalError(
        `UrlPath: ctor`,
        { cause: e },
      );
    }
  }

  public static get PathRepeater(): typeof PathRepeater {
    try {
      return UrlPath.Repeaters.PathRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlPath: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlPart(): typeof UrlPart {
    try {
      return pa_UrlPart;
    }
    catch (e) {
      throw new ReferenceError(`UrlPath: error loading module: \n${e as string}`);
    }
  }

  public static get StringSplitter(): typeof StringSplitter {
    try {
      return importModule("./common/types/strings/StringSplitter") as typeof StringSplitter;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlPath: error loading module`,
        { cause: e },
      );
    }
  }

  public append(subpath: string | UrlPath): UrlPath {
    try {
      const newPath: UrlPath = new UrlPath([
        this.toString(),
        new UrlPath(subpath)
          .toString(),
      ]
        .join(UrlPath.UrlValidators.CharSet.slash[0]));

      return newPath.isValid
        ? newPath
        : this;
    }
    catch (e) {
      throw new Error(`UrlPath: append: error appending UrlPath: \n${e as string}`);
    }
  }

  protected parse(path: string): null | string {
    try {
      const split: string[] = new UrlPath.StringSplitter(
        path,
        ...UrlPath.UrlValidators.CharSet.slash,
        {
          trim: true,
          trimTokens: true,
          noEmptyTokens: true,
        },
      )
        .merged;

      return split.length === 0
        ? null
        : split
          .every(
            pathRepeater =>
              new UrlPath.PathRepeater(pathRepeater).isValid,
          )
          ? split
            .join(UrlPath.UrlValidators.CharSet.slash[0])
          : null;
    }
    catch (e) {
      throw new EvalError(
        `UrlPath: parse`,
        { cause: e },
      );
    }
  }
}

module.exports = UrlPath;
