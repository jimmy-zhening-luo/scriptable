const fr_ValidString: typeof ValidString = importModule("./shortcut/application/common/primitives/strings/ValidString");


class FragmentValidator extends fr_ValidString {
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

module.exports = FragmentValidator;
