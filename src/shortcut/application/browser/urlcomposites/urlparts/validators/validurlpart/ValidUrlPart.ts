const url_ValidString: typeof ValidString = importModule("./shortcut/application/common/primitives/strings/ValidString");

abstract class ValidUrlPart extends url_ValidString {
  constructor(
    part: string,
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
      part,
      {
        toLower,
        trim,
        trimLeading,
        trimTrailing
      },
      ...allowedChars
    );
  }
}

namespace ValidUrlPart {
  export const _UrlChar: typeof UrlChar = importModule("./shortcut/application/common/primitives/strings/charstrings/nrepeatcharstring/boundedrepeatcharstring/repeatcharstring/charstring/chars/UrlChar");
}

module.exports = ValidUrlPart;
