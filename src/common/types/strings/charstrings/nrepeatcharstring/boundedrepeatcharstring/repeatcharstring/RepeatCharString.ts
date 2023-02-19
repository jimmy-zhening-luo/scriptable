const _CharString: typeof CharString = importModule("charstring/CharString");

class RepeatCharString extends _CharString {

  protected qualifies(
    candidateCharString: string
  ): boolean {
    return this.parseCharStringToCharArray(candidateCharString)
      .every(char => this
        .ofChar
        .includes(char)
      );
  }

  protected parseCharStringToCharArray(
    candidateCharString: string
  ): string[] {
    return [...candidateCharString];
  }

  static get CharString(): typeof CharString {
    return _CharString;
  }

}

module.exports = RepeatCharString;
