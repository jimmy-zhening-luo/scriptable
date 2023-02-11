const up_ValidString: typeof ValidString = importModule("./system/application/common/primitives/strings/ValidString");

class ValidUrlPart extends up_ValidString {
  constructor(
    part: string,
    {
      toLower = false,
      trimLeading = [],
      trimTrailing = []
    }: {
        toLower?: boolean,
        trimLeading?: string[],
        trimTrailing?: string[]
      },
    {
      maxLength = Infinity,
    }: {
        maxLength?: number
    },
    ...allowedChars: Char.CharInput[]
  ) {
    super(
      part,
      {
        toLower: toLower,
        trim: true,
        trimLeading: trimLeading,
        trimTrailing: trimTrailing
      },
      {
        minLength: 1,
        maxLength: maxLength
      },
      ...allowedChars
    );
  }
}

namespace ValidUrlPart {
  export const _UrlChar: typeof UrlChar = importModule("./system/application/common/primitives/strings/charstrings/nrepeatcharstring/boundedrepeatcharstring/repeatcharstring/charstring/chars/UrlChar");
}

module.exports = ValidUrlPart;
