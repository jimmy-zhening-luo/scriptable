const rp_CharString: typeof CharString = importModule(
  "charstring/CharString",
) as typeof CharString;

class RepeatCharString extends rp_CharString {
  public static get CharString(): typeof CharString {
    try {
      return rp_CharString;
    }
    catch (e) {
      throw new ReferenceError(
        `RepeatCharString: CharString: Error importing CharString module: \n${e as string}`,
      );
    }
  }

  protected _qualifies(candidateCharString: string): boolean {
    try {
      return [...candidateCharString].every(char => this.charset.allows(char));
    }
    catch (e) {
      throw new EvalError(
        `RepeatCharString: qualifies: Error checking if CharString qualifies: \n${e as string}`,
      );
    }
  }
}

module.exports = RepeatCharString;
