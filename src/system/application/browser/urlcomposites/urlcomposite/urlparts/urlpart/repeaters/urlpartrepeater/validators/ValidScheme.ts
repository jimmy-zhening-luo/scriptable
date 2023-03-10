const sc_ValidUrlPart: typeof ValidUrlPart = importModule(
  "validurlpart/ValidUrlPart",
);

class ValidScheme extends sc_ValidUrlPart {
  constructor(scheme: string) {
    try {
      super(
        scheme,
        1,
        Infinity,
        {
          toLower: true,
          trimTrailing: [
            ...ValidScheme.UrlChar.slash,
            ...ValidScheme.UrlChar.colon,
          ],
        },
        ValidScheme.UrlChar.alphaNumericLower,
        ValidScheme.UrlChar.plus,
        ValidScheme.UrlChar.hyphen,
        ValidScheme.UrlChar.dot,
      );
    } catch (e) {
      throw new Error(
        `ValidScheme: constructor: error creating ValidScheme: \n${e}`,
      );
    }
  }

  static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return sc_ValidUrlPart;
    } catch (e) {
      throw new ReferenceError(
        `ValidScheme: error loading parent ValidUrlPart module: \n${e}`,
      );
    }
  }
}

module.exports = ValidScheme;
