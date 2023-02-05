const hrn_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidHostRegNameRepeater extends hrn_ValidUrlPart {
  constructor(hostRegNameRepeater: string) {
    super(hostRegNameRepeater, {});
  }
}

module.exports = ValidHostRegNameRepeater;
