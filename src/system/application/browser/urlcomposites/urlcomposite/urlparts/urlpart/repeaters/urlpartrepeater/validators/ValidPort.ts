const po_ValidUrlPart: typeof ValidUrlPart = importModule(
  "validurlpart/ValidUrlPart",
);

class ValidPort extends po_ValidUrlPart {
  constructor(port: string) {
    try {
      super(
        port,
        1,
        Infinity,
        {
          trimLeading: [...po_ValidUrlPart.UrlChar.colon],
        },
        po_ValidUrlPart.UrlChar.numbers,
      );
    } catch (e) {
      throw new Error(`ValidPort: constructor: error creating ValidPort: ${e}`);
    }
  }

  static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return po_ValidUrlPart;
    } catch (e) {
      throw new ReferenceError(
        `ValidPort: error loading parent ValidUrlPart module: ${e}`,
      );
    }
  }
}

module.exports = ValidPort;
