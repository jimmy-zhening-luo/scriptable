const sc_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Scheme extends sc_UrlPart {
  constructor(scheme?: string | Scheme) {
    try {
      super(scheme);
    } catch (e) {
      throw new Error(`Scheme: constructor: error creating Scheme: ${e}`);
    }
  }

  protected parse(scheme: string): null | string {
    try {
      const validScheme: string = new this.ValidScheme(scheme).toString();
      const charSetAlpha: string[] = this.ValidScheme.UrlChar.alpha;
      return validScheme === ""
        ? "https"
        : charSetAlpha.includes([...validScheme].shift() ?? "")
        ? validScheme
        : "https";
    } catch (e) {
      throw new Error(`Scheme: parse: error parsing Scheme: ${e}`);
    }
  }

  protected get ValidScheme(): typeof ValidScheme {
    try {
      return this.UrlValidators.Scheme;
    } catch (e) {
      throw new ReferenceError(
        `Scheme: error loading ValidScheme module: ${e}`,
      );
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return sc_UrlPart;
    } catch (e) {
      throw new ReferenceError(
        `Scheme: error loading parent UrlPart module: ${e}`,
      );
    }
  }
}

module.exports = Scheme;
