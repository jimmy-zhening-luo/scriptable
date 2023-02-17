class ValidPath extends ValidString {

  constructor(
    path: string,
    {
      toLower = false,
      trim = false,
      trimLeadingExcept = false,
      trimTrailingExcept = false,
      trimLeading = [],
      trimTrailing = [],
    }: {
      toLower?: boolean,
      trim?: boolean,
      trimLeadingExcept?: boolean,
      trimTrailingExcept?: boolean,
      trimLeading?: string[],
      trimTrailing?: string[]
    },
    {
      minLength = 0,
      maxLength = Infinity,
      negateAllowedChars = false,
      isValid = true
    }: {
      minLength?: number,
      maxLength?: number,
      negateAllowedChars?: boolean,
      isValid?: boolean
    },
    ...allowedChars: Char.CharInput[]
  ) {
    super(
      path,
      {
        trim: true,
        trimLeading: [
          ...trimLeading,
          ...Char.slash
        ],
        trimTrailing: [
          ...trimTrailing,
          ...Char.slash
        ]
      },
      {
        minLength,
        maxLength,
        negateAllowedChars,
        isValid
      },
      ...allowedChars,
      ...Char.slash
    );
  }

  static get ValidPathSegment(): typeof ValidPathSegment {
    return importModule("ValidPathSegment");
  }

}

module.exports = ValidPath;
