const fr_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidFragment extends fr_ValidUrlPart {
  constructor(fragment: string) {
    super(
      fragment,
      {
        trimLeading: [
          UrlChar.hash,
          UrlChar.space
        ]
      }
    );
  }
}

module.exports = ValidFragment;
