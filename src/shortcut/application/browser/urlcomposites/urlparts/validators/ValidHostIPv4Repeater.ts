const hipf_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidHostIPv4Repeater extends hipf_ValidUrlPart {
  constructor(hostIPv4Repeater: string) {
    super(hostIPv4Repeater, {}, {});
  }
}

module.exports = ValidHostIPv4Repeater;
