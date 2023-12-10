const po_ValidUrlPart: typeof ValidUrlPart = importModule(
  "validurlpart/ValidUrlPart",
) as typeof ValidUrlPart;

class ValidPort extends po_ValidUrlPart {
  constructor(port: string) {
    try {
      super(
        port,
        1,
        Infinity,
        {
          trimLeading: [...po_ValidUrlPart.UrlCharSet.colon],
        },
        po_ValidUrlPart.UrlCharSet.numbers,
      );
    }
    catch (e) {
      throw new Error(
        `ValidPort: constructor: error creating ValidPort: \n${e as string}`,
      );
    }
  }

  public static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return po_ValidUrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidPort: error loading parent ValidUrlPart module: \n${e as string}`,
      );
    }
  }
}

module.exports = ValidPort;
