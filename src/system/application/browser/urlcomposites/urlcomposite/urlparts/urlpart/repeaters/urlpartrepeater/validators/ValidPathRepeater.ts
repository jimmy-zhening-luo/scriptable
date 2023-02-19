const pa_ValidUrlRepeater: typeof ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");

class ValidFilepathRepeater extends pa_ValidUrlRepeater {

  constructor(pathRepeater: string) {
    super(
      pathRepeater,
      {
        minLength: 0
      },
      pa_ValidUrlRepeater.UrlChar.pchar
    );
  }

  static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    return pa_ValidUrlRepeater;
  }

}

module.exports = ValidFilepathRepeater;
