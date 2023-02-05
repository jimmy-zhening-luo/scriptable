const hipf_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidHostIPv4Repeater extends hipf_ValidUrlPart {
  constructor(hostIPv4Repeater: string) {
    super(
      hostIPv4Repeater,
      {
        trim: false
      },
      {
        maxLength: 3
      },
      hipf_ValidUrlPart._UrlChar.numbers
    );
  }
}

module.exports = ValidHostIPv4Repeater;
