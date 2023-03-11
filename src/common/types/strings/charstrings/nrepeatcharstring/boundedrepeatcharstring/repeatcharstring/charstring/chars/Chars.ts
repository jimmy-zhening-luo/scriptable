class Chars {
  static get UrlCharSet(): typeof UrlCharSet {
    try {
      return importModule("UrlCharSet");
    } catch (e) {
      throw new ReferenceError(
        `Chars: UrlCharSet: Error importing UrlCharSet module: \n${e}`,
      );
    }
  }

  static get CharSet(): typeof CharSet {
    try {
      return Chars.UrlCharSet.CharSet;
    } catch (e) {
      throw new ReferenceError(
        `Chars: CharSet: Error importing CharSet module: \n${e}`,
      );
    }
  }
}

module.exports = Chars;
