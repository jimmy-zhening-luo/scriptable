const hrn_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidHostRegNameRepeater extends hrn_ValidUrlPart {
  constructor(hostRegNameRepeater: string) {
    super(
      hostRegNameRepeater,
      {
        trim: false
      },
      {},
      hrn_ValidUrlPart._UrlChar.unreserved,
      hrn_ValidUrlPart._UrlChar.percentEncoded,
      hrn_ValidUrlPart._UrlChar.subDelims
    );
  }
}

module.exports = ValidHostRegNameRepeater;
