const qu_ValidUrlRepeater: typeof ValidUrlRepeater = importModule(
  "validurlpart/ValidUrlRepeater",
);

class ValidQueryRepeater extends qu_ValidUrlRepeater {
  constructor(queryRepeater: string) {
    try {
      super(
        queryRepeater,
        1,
        Infinity,
        qu_ValidUrlRepeater.UrlChar.pchar,
        qu_ValidUrlRepeater.UrlChar.slash,
        qu_ValidUrlRepeater.UrlChar.question,
      );
    } catch (e) {
      throw new Error(
        `ValidQueryRepeater: constructor: error creating ValidQueryRepeater: ${e}`,
      );
    }
  }

  static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    try {
      return qu_ValidUrlRepeater;
    } catch (e) {
      throw new ReferenceError(
        `ValidQueryRepeater: error loading parent ValidUrlRepeater module: ${e}`,
      );
    }
  }
}

module.exports = ValidQueryRepeater;
