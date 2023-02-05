const hipf_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidHostIPv4Repeater extends hipf_ValidUrlPart {
  constructor(repeater: string) {
    super(repeater, {});
  }
}

module.exports = ValidHostIPv4Repeater;
