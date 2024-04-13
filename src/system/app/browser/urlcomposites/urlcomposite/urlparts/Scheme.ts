const sc_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class UrlScheme extends sc_UrlPart {
  constructor(scheme?: string | UrlScheme) {
    try {
      super(scheme);
    }
    catch (e) {
      throw new Error(`UrlScheme: constructor: error creating UrlScheme: \n${e as string}`);
    }
  }

  public static get ValidScheme(): typeof ValidScheme {
    try {
      return UrlScheme.UrlValidators.Scheme;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlScheme: error loading module: \n${e as string}`,
      );
    }
  }

  public static get UrlPart(): typeof UrlPart {
    try {
      return sc_UrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlScheme: error loading module: \n${e as string}`,
      );
    }
  }

  protected parse(scheme: string): null | string {
    try {
      const validScheme: string = new UrlScheme.ValidScheme(scheme)
        .toString();
      const charSetAlpha: string[] = UrlScheme.ValidScheme.UrlCharSet.alpha;

      return validScheme === ""
        ? "https"
        : charSetAlpha.includes([...validScheme].shift() ?? "")
          ? validScheme
          : "https";
    }
    catch (e) {
      throw new Error(`UrlScheme: parse: error parsing UrlScheme: \n${e as string}`);
    }
  }
}

module.exports = UrlScheme;
