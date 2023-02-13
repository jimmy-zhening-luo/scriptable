const pa_ValidUrlRepeater: typeof ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");

class ValidPathRepeater extends pa_ValidUrlRepeater {

  constructor(pathRepeater: string) {
    super(
      pathRepeater,
      {},
      pa_ValidUrlRepeater.UrlChar.pchar
    );
  }

  static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    return pa_ValidUrlRepeater;
  }

}

module.exports = ValidPathRepeater;
