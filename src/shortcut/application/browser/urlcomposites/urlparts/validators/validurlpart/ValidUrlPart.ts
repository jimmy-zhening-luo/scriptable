const url_ValidString: typeof ValidString = importModule("./shortcut/application/common/primitives/strings/ValidString");

class ValidUrlPart extends url_ValidString {}

namespace ValidUrlPart {
  export const _UrlChar: typeof UrlChar = importModule("./shortcut/application/common/primitives/strings/charstrings/nrepeatcharstring/boundedrepeatcharstring/repeatcharstring/charstring/chars/UrlChar");
}

module.exports = ValidUrlPart;
