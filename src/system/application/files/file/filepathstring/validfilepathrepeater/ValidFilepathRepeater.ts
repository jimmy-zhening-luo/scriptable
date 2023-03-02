const vps_Strings: typeof Strings = importModule(
  "./common/types/strings/Strings",
);

class ValidFilepathRepeater extends vps_Strings.ValidString {
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

  static get Strings(): typeof Strings {
    try {
      return vps_Strings;
    } catch (e) {
      e = new Error(
        `ValidFilepathRepeater: Strings: Caught unhandled exception while importing Strings class: ${e}`,
      );
      console.error(e);
      throw e;
    }
  }

  static get ValidString(): typeof ValidString {
    return ValidFilepathRepeater.Strings.ValidString;
  }

  static get StringSplitter(): typeof StringSplitter {
    return ValidFilepathRepeater.Strings.StringSplitter;
  }
}

module.exports = ValidFilepathRepeater;
