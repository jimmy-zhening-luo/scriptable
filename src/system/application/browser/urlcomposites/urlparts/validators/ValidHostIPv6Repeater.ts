const hips_ValidUrlRepeater: typeof ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");

class ValidHostIPv6Repeater extends hips_ValidUrlRepeater {
  constructor(hostIPv6Repeater: string) {
    super(
      hostIPv6Repeater,
      {
        maxLength: 4
      },
      hips_ValidUrlRepeater.UrlChar.hex
    );
  }
}

module.exports = ValidHostIPv6Repeater;
