const po_ValidString: typeof ValidString = importModule("./shortcut/application/common/primitives/strings/ValidString");

class ValidPort extends po_ValidString {
  constructor(port: string) {
    super(
      port,
      {
        trimLeading: [
          UrlChar.colon,
          UrlChar.space
        ]
      },
      UrlChar.numbers
    );
  }
}

module.exports = ValidPort;
