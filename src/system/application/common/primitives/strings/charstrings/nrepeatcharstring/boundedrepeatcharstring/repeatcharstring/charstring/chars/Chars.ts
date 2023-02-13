class Chars {

  static get UrlChar(): typeof UrlChar {
    return importModule("UrlChar");
  }

  static get Char(): typeof Char {
    return Chars.UrlChar.Char;
  }

}

module.exports = Chars;
