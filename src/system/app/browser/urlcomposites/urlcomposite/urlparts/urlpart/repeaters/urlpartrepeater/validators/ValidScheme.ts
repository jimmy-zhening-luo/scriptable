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
            ...ValidScheme.CharSet.slash,
            ...ValidScheme.CharSet.colon,
          ],
        },
        ValidScheme.CharSet.alphaNumericLower,
        ValidScheme.CharSet.plus,
        ValidScheme.CharSet.hyphen,
        ValidScheme.CharSet.dot,
      );
    }
    catch (e) {
      throw new Error(
        `ValidScheme: constructor: error creating ValidScheme: \n${e as string}`,
      );
    }
  }

  public static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return sc_ValidUrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidScheme: error loading parent ValidUrlPart module: \n${e as string}`,
      );
    }
  }
}

module.exports = ValidScheme;
