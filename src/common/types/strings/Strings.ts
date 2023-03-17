class Strings {
  static get StringSplitter(): typeof StringSplitter {
    try {
      return importModule("StringSplitter");
    } catch (e) {
      throw new ReferenceError(
        `Strings: StringSplitter: Error importing StringSplitter module: \n${e}`,
      );
    }
  }

  static get ValidString(): typeof ValidString {
    try {
      return importModule("ValidString");
    } catch (e) {
      throw new ReferenceError(
        `Strings: ValidString: Error importing ValidString module: \n${e}`,
      );
    }
  }

  static get CharSets(): typeof CharSets {
    try {
      return Strings.ValidString.CharSets;
    } catch (e) {
      throw new ReferenceError(
        `Strings: CharSets: Error importing CharSets module: \n${e}`,
      );
    }
  }

  static get CharSet(): typeof CharSet {
    try {
      return Strings.CharSets.CharSet;
    } catch (e) {
      throw new ReferenceError(
        `Strings: CharSet: Error importing CharSet module: \n${e}`,
      );
    }
  }

  static get UrlCharSet(): typeof UrlCharSet {
    try {
      return Strings.CharSets.UrlCharSet;
    } catch (e) {
      throw new ReferenceError(
        `Strings: UrlCharSet: Error importing UrlCharSet module: \n${e}`,
      );
    }
  }
}

module.exports = Strings;
