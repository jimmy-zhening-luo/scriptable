const qu_ValidUrlRepeater: typeof ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");

class ValidQueryRepeater extends qu_ValidUrlRepeater {
  constructor(queryRepeater: string) {
    super(
      queryRepeater,
      {},
      qu_ValidUrlRepeater.UrlChar.pchar,
      qu_ValidUrlRepeater.UrlChar.slash,
      qu_ValidUrlRepeater.UrlChar.question
    );
  }
}

module.exports = ValidQueryRepeater;
