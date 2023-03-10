const _CharString: typeof CharString = importModule("charstring/CharString");

class RepeatCharString extends _CharString {
  protected qualifies(candidateCharString: string): boolean {
    try {
      return [...candidateCharString].every(char => this.ofChar.includes(char));
    } catch (e) {
      throw new EvalError(
        `RepeatCharString: qualifies: Error checking if CharString qualifies: ${e}`,
      );
    }
  }

  static get CharString(): typeof CharString {
    try {
      return _CharString;
    } catch (e) {
      throw new ReferenceError(
        `RepeatCharString: CharString: Error importing CharString module: ${e}`,
      );
    }
  }
}

module.exports = RepeatCharString;
