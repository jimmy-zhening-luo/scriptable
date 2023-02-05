const sc_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Scheme extends sc_UrlPart {
  constructor(scheme?: string | Scheme) {
    super(scheme);
  }

  protected parse(scheme: string): null | string {
    const validScheme: ValidScheme = new Scheme._ValidScheme(scheme);
    const firstChar: string = [...validScheme.toString()].shift() ?? "";
    const alpha: string[] = Scheme._ValidScheme._UrlChar.alpha;
    return (validScheme.isValid && alpha.includes(firstChar)) ?
    validScheme.toString()
    : "https";
  }
}

namespace Scheme {
  export const _ValidScheme: typeof ValidScheme = importModule("validators/ValidScheme");
}

module.exports = Scheme;
