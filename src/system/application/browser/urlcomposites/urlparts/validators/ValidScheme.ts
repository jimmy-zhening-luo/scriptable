const sc_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidScheme extends sc_ValidUrlPart {
  constructor(scheme: string) {
    super(
      scheme,
      {
        toLower: true,
        trimTrailing: [
          ...ValidScheme.UrlChar.slash,
          ...ValidScheme.UrlChar.colon
        ]
      },
      {},
      ValidScheme.UrlChar.alphaNumericLower,
      ValidScheme.UrlChar.plus,
      ValidScheme.UrlChar.hyphen,
      ValidScheme.UrlChar.dot
    );
  }
}

module.exports = ValidScheme;
