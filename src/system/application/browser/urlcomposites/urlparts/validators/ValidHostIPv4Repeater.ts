const hipf_ValidUrlRepeater: typeof ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");

class ValidHostIPv4Repeater extends hipf_ValidUrlRepeater {
  constructor(hostIPv4Repeater: string) {
    super(
      hostIPv4Repeater,
      {
        maxLength: 3
      },
      hipf_ValidUrlRepeater.UrlChar.numbers
    );
  }
}

module.exports = ValidHostIPv4Repeater;
