const vps_Strings: typeof Strings = importModule("./common/types/strings/Strings");

class ValidFilepathRepeater extends (vps_Strings.ValidString) {

  constructor(
    pathSegment: string = "",
  ) {
    super(
      pathSegment ?? "",
      1,
      255,
      {},
      {
        negateAllowedChars: true
      },
      ...ValidFilepathRepeater.Char.colon,
      ...ValidFilepathRepeater.Char.slash
    );
  }

  static get Strings(): typeof Strings {
    try {
      return vps_Strings;
    } catch (e) {
      console.error(`ValidFilepathRepeater: Strings: Error importing Strings class: ${e}`);
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
