class CharStrings {
  static get OneCharString(): typeof OneCharString {
    return importModule("OneCharString");
  }

  static get NRepeatCharString(): typeof NRepeatCharString {
    return CharStrings.OneCharString.NRepeatCharString;
  }

  static get BoundedRepeatCharString(): typeof BoundedRepeatCharString {
    return CharStrings.NRepeatCharString.BoundedRepeatCharString;
  }

  static get RepeatCharString(): typeof RepeatCharString {
    return CharStrings.BoundedRepeatCharString.RepeatCharString;
  }

  static get CharString(): typeof CharString {
    return CharStrings.RepeatCharString.CharString;
  }

  static get Chars(): typeof Chars {
    return CharStrings.CharString.Chars;
  }
}

module.exports = CharStrings;
