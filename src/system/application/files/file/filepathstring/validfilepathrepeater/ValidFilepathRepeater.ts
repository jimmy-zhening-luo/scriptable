const fpr_ValidString: typeof ValidString = importModule(
  "./common/types/strings/ValidString",
);

class ValidFilepathRepeater extends fpr_ValidString {
  constructor(pathSegment: string = "") {
    try {
      super(
        pathSegment,
        1,
        255,
        {},
        {
          negateAllowedChars: true,
        },
        ...ValidFilepathRepeater.Char.colon,
        ...ValidFilepathRepeater.Char.slash,
      );
    } catch (e) {
      throw new Error(
        `ValidFilepathRepeater: constructor: Caught unhandled exception instantiating parent class ValidFilepathRepeater: ${e}`,
      );
    }
  }

  static get ValidString(): typeof ValidString {
    try {
      return fpr_ValidString;
    } catch (e) {
      throw new ReferenceError(
        `ValidFilepathRepeater: ValidString: Failed to import ValidString module: ${e}`,
      );
    }
  }
}

module.exports = ValidFilepathRepeater;
