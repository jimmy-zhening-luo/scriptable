const pa_ValidUrlRepeater: typeof ValidUrlRepeater = importModule(
  "validurlpart/ValidUrlRepeater",
) as typeof ValidUrlRepeater;

class ValidPathRepeater extends pa_ValidUrlRepeater {
  constructor(pathRepeater: string) {
    try {
      super(
        pathRepeater,
        0,
        Infinity,
        pa_ValidUrlRepeater.CharSet.pchar,
      );
    }
    catch (e) {
      throw new Error(
        `ValidPathRepeater: constructor: error creating ValidPathRepeater`,
        { cause: e },
      );
    }
  }

  public static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    try {
      return pa_ValidUrlRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidPathRepeater: error loading parent ValidUrlRepeater module`,
        { cause: e },
      );
    }
  }
}

module.exports = ValidPathRepeater;
