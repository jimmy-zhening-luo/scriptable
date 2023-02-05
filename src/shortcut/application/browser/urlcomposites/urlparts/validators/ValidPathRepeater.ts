const pa_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidPathRepeater extends pa_ValidUrlPart {
  constructor(repeater: string) {
    super(repeater, {});
  }

}

module.exports = ValidPathRepeater;
