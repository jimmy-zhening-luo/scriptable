const fr_ValidUrlPart: typeof ValidUrlPart = importModule("validurlpart/ValidUrlPart");

class ValidFragment extends fr_ValidUrlPart {
  constructor(fragment: string) {
    super(
      fragment,
      {
        trimLeading: [
          ValidFragment._UrlChar.hash
        ]
      },
      ValidFragment._UrlChar.unreserved,
      ValidFragment._UrlChar.
    );
  }
}

module.exports = ValidFragment;
