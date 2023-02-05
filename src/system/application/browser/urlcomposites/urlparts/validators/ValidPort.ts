const po_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidPort extends po_ValidUrlPart {
  constructor(port: string) {
    super(
      port,
      {
        trimLeading: [
          ...po_ValidUrlPart._UrlChar.colon
        ]
      },
      {},
      po_ValidUrlPart._UrlChar.numbers
    );
  }
}

module.exports = ValidPort;
