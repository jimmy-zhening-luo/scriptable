const sc_ValidUrlPart: typeof ValidUrlPart = importModule(
  "validurlpart/ValidUrlPart",
) as typeof ValidUrlPart;

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
            ...ValidScheme.UrlCharSet.slash,
            ...ValidScheme.UrlCharSet.colon,
          ],
        },
        ValidScheme.UrlCharSet.alphaNumericLower,
        ValidScheme.UrlCharSet.plus,
        ValidScheme.UrlCharSet.hyphen,
        ValidScheme.UrlCharSet.dot,
      );
    }
    catch (e) {
      throw new Error(
        `ValidScheme: constructor: error creating ValidScheme: \n${e}`,
      );
    }
  }

  static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return sc_ValidUrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidScheme: error loading parent ValidUrlPart module: \n${e}`,
      );
    }
  }
}

module.exports = ValidScheme;
