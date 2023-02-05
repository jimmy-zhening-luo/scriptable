const sc_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Scheme extends sc_UrlPart {
  constructor(scheme?: string | Scheme) {
    super(scheme);
  }

  protected parse(scheme: string): string {
    return new Scheme._ValidScheme(scheme)
      .hasValue ?
      new Scheme._ValidScheme(scheme).toString()
      : "https";
  }
}

namespace Scheme {
  export const _ValidScheme: typeof ValidScheme = importModule("validators/ValidScheme");
}

module.exports = Scheme;
