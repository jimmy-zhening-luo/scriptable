const ur_ValidString: typeof ValidString = importModule("./system/application/common/primitives/strings/ValidString");

class ValidUrlRepeater extends ur_ValidString {
  constructor(
    part: string,
    {
      maxLength = Infinity
    }: {
      maxLength?: number
    },
    ...allowedChars: Char.CharInput[]
  ) {
    super(
      part,
      {},
      {
        minLength: 1,
        maxLength: maxLength
      },
      ...allowedChars
    );
  }
}

namespace ValidUrlRepeater {
  export const _UrlChar: typeof UrlChar = importModule("./system/application/common/primitives/strings/charstrings/nrepeatcharstring/boundedrepeatcharstring/repeatcharstring/charstring/chars/UrlChar");
}

module.exports = ValidUrlRepeater;
