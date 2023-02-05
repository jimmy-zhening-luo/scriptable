const hips_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidHostIPv6Repeater extends hips_ValidUrlPart {
  constructor(repeater: string) {
    super(repeater, {});
  }
}

module.exports = ValidHostIPv6Repeater;
