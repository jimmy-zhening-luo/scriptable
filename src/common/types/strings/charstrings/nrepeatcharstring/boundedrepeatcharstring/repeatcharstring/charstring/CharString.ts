abstract class CharString {
  readonly charstring: null | string;
  readonly ofChar: Char;

  constructor(charstring: string, ...charsets: Char.CharInput[]) {
    try {
      this.ofChar = new CharString.Chars.Char(...charsets);
      this.charstring = this.qualifies(charstring) ? charstring : null;
    } catch (e) {
      throw new Error(
        `CharString: constructor: Error creating CharString object: ${e}`,
      );
    }
  }

  protected abstract qualifies(candidateCharString: string): boolean;

  get isValid(): boolean {
    try {
      return this.charstring !== null;
    } catch (e) {
      throw new EvalError(
        `CharString: isValid: Error checking if CharString is valid: ${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.charstring ?? "";
    } catch (e) {
      throw new EvalError(
        `CharString: toString: Error converting CharString to string: ${e}`,
      );
    }
  }

  static get Chars(): typeof Chars {
    try {
      return importModule("chars/Chars");
    } catch (e) {
      throw new ReferenceError(
        `CharString: Chars: Error importing Chars module: ${e}`,
      );
    }
  }
}

module.exports = CharString;
