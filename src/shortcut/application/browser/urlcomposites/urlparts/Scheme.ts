const sc_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Scheme extends sc_UrlPart {
  constructor(scheme?: string | Scheme) {
    super(scheme);
  }

  protected parse(scheme: string): string {
    return new SchemeValidator(scheme)
      .validated;
  }
}

module.exports = Scheme;
