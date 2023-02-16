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
      minLength = undefined,
      maxLength = Infinity
    }: {
      minLength?: number,
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
        minLength: minLength ?? 1,
        maxLength: maxLength
      },
      ...allowedChars
    );
  }

  static get ValidString(): typeof ValidString {
    return up_ValidString;
  }

}

module.exports = ValidUrlPart;
