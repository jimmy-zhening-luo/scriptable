const hips_ValidUrlRepeater: typeof ValidUrlRepeater = importModule(
  "validurlpart/ValidUrlRepeater",
);

class ValidHostIPv6Repeater extends hips_ValidUrlRepeater {
  constructor(hostIPv6Repeater: string) {
    try {
      super(hostIPv6Repeater, 0, 4, hips_ValidUrlRepeater.UrlChar.hex);
    } catch (e) {
      throw new Error(
        `ValidHostIPv6Repeater: constructor: error creating ValidHostIPv6Repeater: ${e}`,
      );
    }
  }
}

module.exports = ValidHostIPv6Repeater;
