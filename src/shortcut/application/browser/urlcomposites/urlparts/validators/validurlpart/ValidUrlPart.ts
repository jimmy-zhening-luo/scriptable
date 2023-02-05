const url_ValidString: typeof ValidString = importModule("./shortcut/application/common/primitives/strings/ValidString");

abstract class ValidUrlPart extends url_ValidString {
  constructor(
    url: string,
    {
      toLower = false,
      trim = true,
      trimLeading = [],
      trimTrailing = []
    }: {
      toLower?: boolean,
      trim?: boolean,
      trimLeading?: string[],
      trimTrailing?: string[]
    },
    ...allowedChars: Char.CharInput[]
  ) {
    super(

    )
    );
  }
}

namespace ValidUrlPart {
  export const _UrlChar: typeof UrlChar = importModule("./shortcut/application/common/primitives/strings/charstrings/nrepeatcharstring/boundedrepeatcharstring/repeatcharstring/charstring/chars/UrlChar");
}

module.exports = ValidUrlPart;
