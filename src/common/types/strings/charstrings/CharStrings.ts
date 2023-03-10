class CharStrings {
  static get OneCharString(): typeof OneCharString {
    try {
      return importModule("OneCharString");
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: OneCharString: Error importing OneCharString module: ${e}`,
      );
    }
  }

  static get NRepeatCharString(): typeof NRepeatCharString {
    try {
      return CharStrings.OneCharString.NRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: NRepeatCharString: Error importing NRepeatCharString module: ${e}`,
      );
    }
  }

  static get BoundedRepeatCharString(): typeof BoundedRepeatCharString {
    try {
      return CharStrings.NRepeatCharString.BoundedRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: BoundedRepeatCharString: Error importing BoundedRepeatCharString module: ${e}`,
      );
    }
  }

  static get RepeatCharString(): typeof RepeatCharString {
    try {
      return CharStrings.BoundedRepeatCharString.RepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: RepeatCharString: Error importing RepeatCharString module: ${e}`,
      );
    }
  }

  static get CharString(): typeof CharString {
    try {
      return CharStrings.RepeatCharString.CharString;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: CharString: Error importing CharString module: ${e}`,
      );
    }
  }

  static get Chars(): typeof Chars {
    try {
      return CharStrings.CharString.Chars;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: Chars: Error importing Chars module: ${e}`,
      );
    }
  }
}

module.exports = CharStrings;
