const pa_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidPathRepeater extends pa_ValidUrlPart {
  constructor(pathRepeater: string) {
    super(pathRepeater, {});
  }

}

module.exports = ValidPathRepeater;
