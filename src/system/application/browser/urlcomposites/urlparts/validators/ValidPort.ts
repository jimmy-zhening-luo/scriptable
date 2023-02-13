const po_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidPort extends po_ValidUrlPart {

  constructor(port: string) {
    super(
      port,
      {
        trimLeading: [
          ...po_ValidUrlPart.UrlChar.colon
        ]
      },
      {},
      po_ValidUrlPart.UrlChar.numbers
    );
  }

  static get ValidUrlPart(): typeof ValidUrlPart {
    return po_ValidUrlPart;
  }

}

module.exports = ValidPort;
