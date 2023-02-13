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

  static get ValidUrlPart(): typeof ValidUrlPart {
    return fr_ValidUrlPart;
  }

}

module.exports = ValidFragment;
