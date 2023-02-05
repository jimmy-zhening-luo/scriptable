const url_ValidString: typeof ValidString = importModule("./shortcut/application/common/primitives/strings/ValidString");

class ValidUrl extends url_ValidString {
  constructor(url: string) {
    super(
      url,
      {
        trimLeading: [
          UrlChar.space
        ]
      }
    );
  }
}

namespace ValidUrl {
  export const _UrlChar: typeof UrlChar = importModule("./shortcut/application/common/primitives/strings/charstrings/nrepeatcharstring/boundedrepeatcharstring/repeatcharstring/charstring/chars/UrlChar");
}
