const qu_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidQueryRepeater extends qu_ValidUrlPart {
  constructor(repeater: string) {
    super(repeater, {});
  }
}

module.exports = ValidQueryRepeater;
