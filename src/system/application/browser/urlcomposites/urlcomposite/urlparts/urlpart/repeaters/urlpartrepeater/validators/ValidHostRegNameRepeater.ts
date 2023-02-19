const hrn_ValidUrlRepeater: typeof ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");

class ValidHostRegNameRepeater extends hrn_ValidUrlRepeater {

  constructor(hostRegNameRepeater: string) {
    super(
      hostRegNameRepeater,
      {},
      hrn_ValidUrlRepeater.UrlChar.unreserved,
      hrn_ValidUrlRepeater.UrlChar.percentEncoded,
      hrn_ValidUrlRepeater.UrlChar.subDelims
    );
  }

  static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    return hrn_ValidUrlRepeater;
  }

}

module.exports = ValidHostRegNameRepeater;
