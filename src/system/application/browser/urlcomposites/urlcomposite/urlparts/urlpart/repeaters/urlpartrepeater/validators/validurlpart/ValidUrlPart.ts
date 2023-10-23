const up_ValidString: typeof ValidString = importModule(
  "./common/types/strings/ValidString",
) as typeof ValidString;

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
    ...allowedChars: ConstructorParameters<typeof CharSet>[1][]
  ) {
    try {
      super(
        part,
        {
          min: minLength,
          max: maxLength,
          allowedChars: allowedChars,
        },
        {
          trim: true,
          toLower: toLower,
          trimLeading: trimLeading,
          trimTrailing: trimTrailing,
        },
      );
    } catch (e) {
      throw new EvalError(
        `ValidUrlPart: constructor: error creating ValidUrlPart: \n${e}`,
      );
    }
  }

  static get ValidString(): typeof ValidString {
    return up_ValidString;
  }
}

module.exports = ValidUrlPart;
