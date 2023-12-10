class Strings {
  public static get StringSplitter(): typeof StringSplitter {
    try {
      return importModule("StringSplitter") as typeof StringSplitter;
    }
    catch (e) {
      throw new ReferenceError(
        `Strings: StringSplitter: Error importing StringSplitter module: \n${e as string}`,
      );
    }
  }

  public static get ValidString(): typeof ValidString {
    try {
      return importModule("ValidString") as typeof ValidString;
    }
    catch (e) {
      throw new ReferenceError(
        `Strings: ValidString: Error importing ValidString module: \n${e as string}`,
      );
    }
  }

  public static get CharSets(): typeof CharSets {
    try {
      return Strings.ValidString.CharSets;
    }
    catch (e) {
      throw new ReferenceError(
        `Strings: CharSets: Error importing CharSets module: \n${e as string}`,
      );
    }
  }

  public static get CharSet(): typeof CharSet {
    try {
      return Strings.CharSets.CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `Strings: CharSet: Error importing CharSet module: \n${e as string}`,
      );
    }
  }

  public static get UrlCharSet(): typeof UrlCharSet {
    try {
      return Strings.CharSets.UrlCharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `Strings: UrlCharSet: Error importing UrlCharSet module: \n${e as string}`,
      );
    }
  }
}

module.exports = Strings;
