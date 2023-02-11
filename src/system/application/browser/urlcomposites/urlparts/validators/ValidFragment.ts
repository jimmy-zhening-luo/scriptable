const fr_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidFragment extends fr_ValidUrlPart {
  constructor(fragment: string) {
    super(
      fragment,
      {
        trimLeading: [
          ...ValidFragment.UrlChar.hash
        ]
      },
      {},
      ValidFragment.UrlChar.pchar,
      ValidFragment.UrlChar.slash,
      ValidFragment.UrlChar.question
    );
  }
}

module.exports = ValidFragment;
