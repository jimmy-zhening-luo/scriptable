class Strings {

  static get ValidString(): typeof ValidString {
    return importModule("ValidString");
  }

  static get CharStrings(): typeof CharStrings {
    return Strings.ValidString.CharStrings;
  }

  static get OneCharString(): typeof OneCharString {
    return Strings.CharStrings.OneCharString;
  }

  static get NRepeatCharString(): typeof NRepeatCharString {
    return Strings.OneCharString.NRepeatCharString;
  }

  static get RepeatCharString(): typeof RepeatCharString {
    return Strings.NRepeatCharString.RepeatCharString;
  }

  static get Chars(): typeof Chars {
    return Strings.CharStrings.Chars;
  }

  static get Char(): typeof Char {
    return Strings.Chars.Char;
  }

  static get UrlChar(): typeof UrlChar {
    return Strings.Chars.UrlChar;
  }

  static get Words(): typeof Words {
    return Strings.ValidString.Words;
  }

  static get OneGram(): typeof OneGram {
    return Strings.Words.OneGram;
  }

  static get NGram(): typeof NGram {
    return Strings.OneGram.NGram;
  }

}

module.exports = Strings;
