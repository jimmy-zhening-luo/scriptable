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

  static get Chars(): typeof Chars {
    try {
      return Strings.CharStrings.Chars;
    } catch (e) {
      throw new ReferenceError(
        `Strings: Chars: Error importing Chars module: \n${e}`,
      );
    }
  }

  static get Char(): typeof Char {
    try {
      return Strings.Chars.Char;
    } catch (e) {
      throw new ReferenceError(
        `Strings: Char: Error importing Char module: \n${e}`,
      );
    }
  }

  static get UrlChar(): typeof UrlChar {
    try {
      return Strings.Chars.UrlChar;
    } catch (e) {
      throw new ReferenceError(
        `Strings: UrlChar: Error importing UrlChar module: \n${e}`,
      );
    }
  }

  static get OneGram(): typeof OneGram {
    try {
      return Strings.ValidString.OneGram;
    } catch (e) {
      throw new ReferenceError(
        `Strings: OneGram: Error importing OneGram module: \n${e}`,
      );
    }
  }

  static get NGram(): typeof NGram {
    try {
      return Strings.OneGram.NGram;
    } catch (e) {
      throw new ReferenceError(
        `Strings: NGram: Error importing NGram module: \n${e}`,
      );
    }
  }

  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return Strings.NGram.PositiveInteger;
    } catch (e) {
      throw new ReferenceError(
        `Strings: PositiveInteger: Error importing PositiveInteger module: \n${e}`,
      );
    }
  }
}

module.exports = Strings;
