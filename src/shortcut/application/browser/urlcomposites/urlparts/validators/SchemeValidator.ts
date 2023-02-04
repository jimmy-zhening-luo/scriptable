const sc_ValidString: typeof ValidString = importModule("./shortcut/application/common/primitives/strings/ValidString");

class SchemeValidator extends sc_ValidString {
  constructor(scheme: string) {
    super(
      scheme,
      {
        toLower: true,
        trimTrailing: [
          UrlChar.slash,
          UrlChar.colon
        ]
      },
      UrlChar.alphaNumericLower,
      UrlChar.plus,
      UrlChar.dot,
      UrlChar.hyphen
    );
  }
}

module.exports = SchemeValidator;
