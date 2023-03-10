class Chars {
  static get UrlChar(): typeof UrlChar {
    try {
      return importModule("UrlChar");
    } catch (e) {
      throw new ReferenceError(
        `Chars: UrlChar: Error importing UrlChar module: ${e}`,
      );
    }
  }

  static get Char(): typeof Char {
    try {
      return Chars.UrlChar.Char;
    } catch (e) {
      throw new ReferenceError(
        `Chars: Char: Error importing Char module: ${e}`,
      );
    }
  }
}

module.exports = Chars;
