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
        `RepeatCharString: import CharString`,
        { cause: e },
      );
    }
  }

  protected _qualifies(candidate: string): boolean {
    try {
      return candidate === "" || [...candidate]
        .every(
          char =>
            this.charset.allows(char),
        );
    }
    catch (e) {
      throw new EvalError(
        `RepeatCharString: _qualifies`,
        { cause: e },
      );
    }
  }
}

module.exports = RepeatCharString;
