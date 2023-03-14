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

  static get CharStrings(): typeof CharStrings {
    try {
      return Strings.ValidString.CharStrings;
    } catch (e) {
      throw new ReferenceError(
        `Strings: CharStrings: Error importing CharStrings module: \n${e}`,
      );
    }
  }

  static get OneCharString(): typeof OneCharString {
    try {
      return Strings.CharStrings.OneCharString;
    } catch (e) {
      throw new ReferenceError(
        `Strings: OneCharString: Error importing OneCharString module: \n${e}`,
      );
    }
  }

  static get NRepeatCharString(): typeof NRepeatCharString {
    try {
      return Strings.OneCharString.NRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `Strings: NRepeatCharString: Error importing NRepeatCharString module: \n${e}`,
      );
    }
  }

  static get RepeatCharString(): typeof RepeatCharString {
    try {
      return Strings.NRepeatCharString.RepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `Strings: RepeatCharString: Error importing RepeatCharString module: \n${e}`,
      );
    }
  }

  static get CharSets(): typeof CharSets {
    try {
      return Strings.CharStrings.CharSets;
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
