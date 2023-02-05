const pa_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidPathRepeater extends pa_ValidUrlPart {
  constructor(pathRepeater: string) {
    super(
      pathRepeater,
      {
        trim: false
      },
      {},
      pa_ValidUrlPart._UrlChar.pchar
    );
  }

}

module.exports = ValidPathRepeater;
