const sc_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Scheme extends sc_UrlPart {
  protected parse(scheme: string): null | string {
    const validScheme: string = new Scheme._ValidScheme(scheme).toString();
    const charSetAlpha: string[] = Scheme._ValidScheme._UrlChar.alpha;
    return validScheme === "" ?
      "https"
      : charSetAlpha.includes(
          [...validScheme].shift() ?? ""
        ) ?
        validScheme
        : "https";
  }
}

namespace Scheme {
  export const _ValidScheme: typeof ValidScheme = importModule("validators/ValidScheme");
}

module.exports = Scheme;
