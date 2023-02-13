const sc_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Scheme extends sc_UrlPart {

  constructor(
    scheme?:
      | null
      | string
      | Scheme
  ) {
    super(scheme);
  }


  protected parse(scheme: string): null | string {
    const validScheme: string = new this.ValidScheme(scheme).toString();
    const charSetAlpha: string[] = this.ValidScheme.UrlChar.alpha;
    return validScheme === "" ?
      "https"
      : charSetAlpha.includes(
          [...validScheme].shift() ?? ""
        ) ?
        validScheme
        : "https";
  }

  protected get ValidScheme(): typeof ValidScheme {
    return this.UrlValidators.Scheme;
  }

  static get UrlPart(): typeof UrlPart {
    return sc_UrlPart;
  }

}

module.exports = Scheme;
