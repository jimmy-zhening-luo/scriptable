const po_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidPort extends po_ValidUrlPart {
  constructor(port: string) {
    super(
      port,
      {
        trimLeading: [
          ...UrlChar.colon
        ]
      },
      {},
      UrlChar.numbers
    );
  }
}

module.exports = ValidPort;
