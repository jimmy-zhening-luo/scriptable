const hrn_ValidUrlRepeater: typeof ValidUrlRepeater = importModule(
  "validurlpart/ValidUrlRepeater",
) as typeof ValidUrlRepeater;

class ValidHostRegNameRepeater extends hrn_ValidUrlRepeater {
  constructor(hostRegNameRepeater: string) {
    try {
      super(
        hostRegNameRepeater,
        1,
        Infinity,
        hrn_ValidUrlRepeater.UrlCharSet.unreserved,
        hrn_ValidUrlRepeater.UrlCharSet.percentEncoded,
        hrn_ValidUrlRepeater.UrlCharSet.subDelims,
      );
    }
    catch (e) {
      throw new Error(
        `ValidHostRegNameRepeater: constructor: error creating ValidHostRegNameRepeater: \n${e}`,
      );
    }
  }

  static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    try {
      return hrn_ValidUrlRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidHostRegNameRepeater: error loading parent ValidUrlRepeater module: \n${e}`,
      );
    }
  }
}

module.exports = ValidHostRegNameRepeater;
