const qu_ValidUrlRepeater: typeof ValidUrlRepeater = importModule(
  "validurlpart/ValidUrlRepeater",
) as typeof ValidUrlRepeater;

class ValidQueryRepeater extends qu_ValidUrlRepeater {
  constructor(queryRepeater: string) {
    try {
      super(
        queryRepeater,
        1,
        Infinity,
        qu_ValidUrlRepeater.CharSet.pchar,
        qu_ValidUrlRepeater.CharSet.slash,
        qu_ValidUrlRepeater.CharSet.question,
      );
    }
    catch (e) {
      throw new Error(
        `ValidQueryRepeater: constructor: error creating ValidQueryRepeater`,
        { cause: e },
      );
    }
  }

  public static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    try {
      return qu_ValidUrlRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidQueryRepeater: error loading parent ValidUrlRepeater module`,
        { cause: e },
      );
    }
  }
}

module.exports = ValidQueryRepeater;
