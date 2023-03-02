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
      throw new Error(
        `ValidFilepathRepeater: Strings: Caught unhandled exception while importing Strings class: ${e}`,
      );
    }
  }

  static get ValidString(): typeof ValidString {
    try {
      return ValidFilepathRepeater.Strings.ValidString;
    } catch (e) {
      throw new ReferenceError(
        `ValidFilepathRepeater: ValidString: Caught unhandled exception while importing ValidString class: ${e}`,
      );
    }
  }

  static get StringSplitter(): typeof StringSplitter {
    try {
      return ValidFilepathRepeater.Strings.StringSplitter;
    } catch (e) {
      throw new ReferenceError(
        `ValidFilepathRepeater: StringSplitter: Caught unhandled exception while importing StringSplitter class: ${e}`,
      );
    }
  }
}

module.exports = ValidFilepathRepeater;
