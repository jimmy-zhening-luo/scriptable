abstract class CharString {

  readonly charstring: null | string;
  readonly ofChar: Char;

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

  get Chars(): typeof Chars {
    return CharString.Chars;
  }

  get Char(): typeof Char {
    return CharString.Char;
  }

  get UrlChar(): typeof UrlChar {
    return CharString.UrlChar;
  }

  get isValid(): boolean {
    return this.charstring !== null;
  }

  toString(): string {
    return this.charstring
      ?? "";
  }

  static get Chars(): typeof Chars {
    return importModule("chars/Chars");
  }

  static get Char(): typeof Char {
    return CharString.Chars.Char;
  }

  static get UrlChar(): typeof UrlChar {
    return CharString.Chars.UrlChar;
  }

}

module.exports = CharString;
