const hips_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidHostIPv6Repeater extends hips_ValidUrlPart {
  constructor(hostIPv6Repeater: string) {
    super(hostIPv6Repeater, {}, {});
  }
}

module.exports = ValidHostIPv6Repeater;
