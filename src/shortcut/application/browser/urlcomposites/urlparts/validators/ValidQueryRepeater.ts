const qu_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidQueryRepeater extends qu_ValidUrlPart {
  constructor(queryRepeater: string) {
    super(queryRepeater, {});
  }
}

module.exports = ValidQueryRepeater;
