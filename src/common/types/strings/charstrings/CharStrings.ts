class CharStrings {
  static get OneCharString(): typeof OneCharString {
    try {
      return importModule("OneCharString");
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: OneCharString: Error importing OneCharString module: \n${e}`,
      );
    }
  }

  static get NRepeatCharString(): typeof NRepeatCharString {
    try {
      return CharStrings.OneCharString.NRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: NRepeatCharString: Error importing NRepeatCharString module: \n${e}`,
      );
    }
  }

  static get BoundedRepeatCharString(): typeof BoundedRepeatCharString {
    try {
      return CharStrings.NRepeatCharString.BoundedRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: BoundedRepeatCharString: Error importing BoundedRepeatCharString module: \n${e}`,
      );
    }
  }

  static get RepeatCharString(): typeof RepeatCharString {
    try {
      return CharStrings.BoundedRepeatCharString.RepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: RepeatCharString: Error importing RepeatCharString module: \n${e}`,
      );
    }
  }

  static get CharString(): typeof CharString {
    try {
      return CharStrings.RepeatCharString.CharString;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: CharString: Error importing CharString module: \n${e}`,
      );
    }
  }

  static get CharSets(): typeof CharSets {
    try {
      return CharStrings.CharString.CharSets;
    } catch (e) {
      throw new ReferenceError(
        `CharStrings: CharSets: Error importing CharSets module: \n${e}`,
      );
    }
  }
}

module.exports = CharStrings;
