const hrn_ValidUrlRepeater: typeof ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");

class ValidHostRegNameRepeater extends hrn_ValidUrlRepeater {
  constructor(hostRegNameRepeater: string) {
    super(
      hostRegNameRepeater,
      {},
      hrn_ValidUrlRepeater._UrlChar.unreserved,
      hrn_ValidUrlRepeater._UrlChar.percentEncoded,
      hrn_ValidUrlRepeater._UrlChar.subDelims
    );
  }
}

module.exports = ValidHostRegNameRepeater;
