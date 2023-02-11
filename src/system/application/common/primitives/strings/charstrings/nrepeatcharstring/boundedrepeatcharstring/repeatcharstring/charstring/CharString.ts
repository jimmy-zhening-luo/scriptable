abstract class CharString {
  readonly charstring: null | string;
  readonly ofChar: Char;
  constructor(charstring: string);
  constructor(
    charstring: string,
    ...ofChars: Char[]
  );
  constructor(
    charstring: string,
    ...ofStrings: string[]
  );
  constructor(
    charstring: string,
    ...ofCharsets: string[][]
  );
  constructor(
    charstring: string,
    ...ofCharInputs: Char.CharInput[]
  );
  constructor(
    charstring: string,
    ...charsets: Char.CharInput[]
  ) {
    this.ofChar = new this.Char(...charsets);
    this.charstring = this
      .qualifies(charstring) ?
      charstring
      : null;
  }

  protected abstract qualifies(
    candidateCharString: string
  ): boolean;

  protected get Char(): typeof Char {
    return CharString.Char;
  }

  get isValid(): boolean {
    return this.charstring !== null;
  }

  toString(): string {
    return this.charstring
      ?? "";
  }

  static get Char(): typeof Char {
    return importModule("chars/char/Char");
  }
}

module.exports = CharString;
