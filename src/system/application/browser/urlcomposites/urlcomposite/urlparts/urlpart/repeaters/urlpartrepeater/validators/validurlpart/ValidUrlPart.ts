const up_ValidString: typeof ValidString = importModule(
  "./common/types/strings/ValidString",
);

class ValidUrlPart extends up_ValidString {
  constructor(
    part: string,
    minLength: number = 1,
    maxLength: number = Infinity,
    {
      toLower = false,
      trimLeading = [],
      trimTrailing = [],
    }: {
      toLower?: boolean;
      trimLeading?: string[];
      trimTrailing?: string[];
    },
    ...allowedChars: Char.CharInput[]
  ) {
    super(
      part,
      minLength,
      maxLength,
      {
        trim: true,
        toLower: toLower,
        trimLeading: trimLeading,
        trimTrailing: trimTrailing,
      },
      {},
      ...allowedChars,
    );
  }

  static get ValidString(): typeof ValidString {
    return up_ValidString;
  }
}

module.exports = ValidUrlPart;
