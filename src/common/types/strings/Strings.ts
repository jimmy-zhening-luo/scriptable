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
        `Strings: import ValidString: \n${e as string}`,
      );
    }
  }

  public static get CharSet(): typeof CharSet {
    try {
      return Strings.ValidString.CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `Strings: import CharSet: \n${e as string}`,
      );
    }
  }
}

module.exports = Strings;
