const _Word: typeof Word = importModule("word/Word");

class NGram extends _Word {
  readonly n: number;
  readonly remainder: string;
  constructor(
    text: string,
    n: number
  ) {
    const nInt: number = new NGram.positiveInt(n).value ?? 0;
    super(
      nInt === Infinity ?
        text
        : text.length >= nInt ?
          text.slice(0, nInt)
          : String()
    );
    this.n = nInt;
    this.remainder = text.slice(this.word.length);
  }

  get isValid(): boolean {
    return this.hasValue;
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
}

namespace NGram {
  export const positiveInt: typeof PositiveInteger = importModule("./shortcut/application/common/primitives/numbers/PositiveInteger");
}

module.exports = NGram;
