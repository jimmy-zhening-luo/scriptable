const qu_ValidUrlRepeater: typeof ValidUrlRepeater = importModule("validurlpart/ValidUrlRepeater");

class ValidQueryRepeater extends qu_ValidUrlRepeater {
  constructor(queryRepeater: string) {
    super(
      queryRepeater,
      {},
      qu_ValidUrlRepeater._UrlChar.pchar,
      qu_ValidUrlRepeater._UrlChar.slash,
      qu_ValidUrlRepeater._UrlChar.question
    );
  }
}

module.exports = ValidQueryRepeater;
