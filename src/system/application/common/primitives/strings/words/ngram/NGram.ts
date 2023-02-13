const _Word: typeof Word = importModule("word/Word");

class NGram extends _Word {

  readonly n: number;
  readonly remainder: string;

  constructor(
    text: string,
    n: number
  ) {
    const nInt: number = new NGram.PositiveInteger(n).value ?? 0;
    super(
      nInt === Infinity ?
        text
        : text.length >= nInt ?
          text.slice(0, nInt)
          : String()
    );
    this.n = nInt;
    this.remainder = text.slice(this.length);
  }

  get isValidAndFullyConsumed(): boolean {
    return this.isValid && !this.hasRemainder;
  }

  get hasFixedLength(): boolean {
    return this.n !== Infinity;
  }

  get hasRemainder(): boolean {
    return this.remainder.length > 0;
  }

  get PositiveInteger(): typeof PositiveInteger {
    return NGram.PositiveInteger;
  }

  get Word(): typeof Word {
    return NGram.Word;
  }

  static get PositiveInteger(): typeof PositiveInteger {
    return importModule("./system/application/common/primitives/numbers/PositiveInteger");
  }

  static get Word(): typeof Word {
    return _Word;
  }

}

module.exports = NGram;
