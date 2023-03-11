abstract class CharString {
  readonly charstring: null | string;
  readonly ofChar: CharSet;
  readonly negate: boolean = false;

  constructor(
    charstring: string,
    negate?: boolean | CharSet.CharInput,
    ...charsets: CharSet.CharInput[]
  ) {
    try {
      if (negate === undefined) negate = false;
      else if (typeof negate === "boolean") this.negate = negate;
      else charsets.unshift(negate);

      this.ofChar = new CharString.Chars.CharSet(...charsets);
      this.charstring = this.qualifies(charstring) ? charstring : null;
    } catch (e) {
      throw new Error(
        `CharString: constructor: Error creating CharString object: \n${e}`,
      );
    }
  }

  protected abstract qualifies(candidateCharString: string): boolean;

  get isValid(): boolean {
    try {
      return this.charstring !== null;
    } catch (e) {
      throw new EvalError(
        `CharString: isValid: Error checking if CharString is valid: \n${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.charstring ?? "";
    } catch (e) {
      throw new EvalError(
        `CharString: toString: Error converting CharString to string: \n${e}`,
      );
    }
  }

  static get Chars(): typeof Chars {
    try {
      return importModule("chars/Chars");
    } catch (e) {
      throw new ReferenceError(
        `CharString: Chars: Error importing Chars module: \n${e}`,
      );
    }
  }
}

module.exports = CharString;
