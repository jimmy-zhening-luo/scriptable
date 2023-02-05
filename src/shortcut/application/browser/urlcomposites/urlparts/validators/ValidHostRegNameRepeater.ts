const hrn_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidHostRegNameRepeater extends hrn_ValidUrlPart {
  constructor(repeater: string) {
    super(repeater, {});
  }
}

module.exports = ValidHostRegNameRepeater;
