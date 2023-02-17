const vps_ValidString: typeof ValidString = importModule("./system/application/common/primitives/strings/ValidString");

class ValidFilepathRepeater extends vps_ValidString {

  constructor(
    pathSegment: string = "",
  ) {
    super(
      pathSegment ?? "",
      {
        trim: true
      },
      {
        minLength: 1,
        maxLength: 255,
        negateAllowedChars: true
      },
      ...ValidFilepathRepeater.Char.colon
    )
  }

  static get ValidString(): typeof ValidString {
    return vps_ValidString;
  }

}

module.exports = ValidFilepathRepeater;
