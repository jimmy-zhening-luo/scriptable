class Strings {

  static get ValidString(): typeof ValidString {
    return importModule("ValidString");
  }

  static get CharStrings(): typeof CharStrings {
    return Strings.ValidString.CharStrings;
  }

  static get Chars(): typeof Chars {
    return Strings.CharStrings.Chars;
  }

  static get Words(): typeof Words {
    return Strings.ValidString.Words;
  }

}

module.exports = Strings;
