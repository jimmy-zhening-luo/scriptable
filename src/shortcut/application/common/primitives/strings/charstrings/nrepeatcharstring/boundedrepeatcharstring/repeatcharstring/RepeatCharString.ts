const _CharString: typeof CharString = importModule("charstring/CharString");

class RepeatCharString extends CharString {
  protected qualifies(
    candidateCharString: string
  ): boolean {
    return this
      .parseCharStringToCharArray(candidateCharString)
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
}


module.exports = RepeatCharString;
