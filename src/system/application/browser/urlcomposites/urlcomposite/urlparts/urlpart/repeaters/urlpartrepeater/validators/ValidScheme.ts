const sc_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidScheme extends sc_ValidUrlPart {

  constructor(scheme: string) {
    super(
      scheme,
      1,
      Infinity,
      {
        toLower: true,
        trimTrailing: [
          ...ValidScheme.UrlChar.slash,
          ...ValidScheme.UrlChar.colon
        ]
      },
      ValidScheme.UrlChar.alphaNumericLower,
      ValidScheme.UrlChar.plus,
      ValidScheme.UrlChar.hyphen,
      ValidScheme.UrlChar.dot
    );
  }

  static get ValidUrlPart(): typeof ValidUrlPart {
    return sc_ValidUrlPart;
  }

}

module.exports = ValidScheme;
