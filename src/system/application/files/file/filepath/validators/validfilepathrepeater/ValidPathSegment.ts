const vps_PathSegment: typeof ValidString = importModule("./system/application/common/primitives/strings/ValidString");

class ValidPathSegment extends vps_PathSegment {

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
      ...ValidPathSegment.Char.slash,
      ...ValidPathSegment.Char.colon
    )
  }

  static get ValidString(): typeof ValidString {
    return vps_PathSegment;
  }

}

module.exports = ValidPathSegment;
