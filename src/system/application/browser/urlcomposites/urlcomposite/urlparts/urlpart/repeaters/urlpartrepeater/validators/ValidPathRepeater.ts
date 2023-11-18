const pa_ValidUrlRepeater: typeof ValidUrlRepeater = importModule(
  "validurlpart/ValidUrlRepeater",
) as typeof ValidUrlRepeater;

class ValidPathRepeater extends pa_ValidUrlRepeater {
  constructor(pathRepeater: string) {
    try {
      super(pathRepeater, 0, Infinity, pa_ValidUrlRepeater.UrlCharSet.pchar);
    }
    catch (e) {
      throw new Error(
        `ValidPathRepeater: constructor: error creating ValidPathRepeater: \n${e}`,
      );
    }
  }

  static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    try {
      return pa_ValidUrlRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidPathRepeater: error loading parent ValidUrlRepeater module: \n${e}`,
      );
    }
  }
}

module.exports = ValidPathRepeater;
