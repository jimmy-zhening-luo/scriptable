const _Word: typeof Word = importModule("word/Word");

class NGram extends _Word {
  readonly n: number;
  readonly remainder: string;

  constructor(text: string, n: number) {
    try {
      const nInt: number = new NGram.PositiveInteger(n).value ?? 0;
      super(
        nInt === Infinity
          ? text
          : text.length >= nInt
          ? text.slice(0, nInt)
          : String(),
      );
      this.n = nInt;
      this.remainder = text.slice(this.length);
    } catch (e) {
      throw new Error(`NGram: constructor: Error creating NGram object: ${e}`);
    }
  }

  get isValidAndFullyConsumed(): boolean {
    try {
      return this.isValid && !this.hasRemainder;
    } catch (e) {
      throw new EvalError(
        `NGram: isValidAndFullyConsumed: Error checking if NGram is valid and fully consumed: ${e}`,
      );
    }
  }

  get hasFiniteLength(): boolean {
    try {
      return this.n !== Infinity;
    } catch (e) {
      throw new EvalError(
        `NGram: hasFixedLength: Error checking if NGram has fixed length: ${e}`,
      );
    }
  }

  get hasRemainder(): boolean {
    try {
      return this.remainder.length > 0;
    } catch (e) {
      throw new EvalError(
        `NGram: hasRemainder: Error checking if NGram has remainder: ${e}`,
      );
    }
  }

  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return importModule("./common/types/numbers/PositiveInteger");
    } catch (e) {
      throw new ReferenceError(
        `NGram: PositiveInteger: Error importing PositiveInteger module: ${e}`,
      );
    }
  }

  static get Word(): typeof Word {
    try {
      return _Word;
    } catch (e) {
      throw new ReferenceError(
        `NGram: Word: Error importing Word module: ${e}`,
      );
    }
  }
}

module.exports = NGram;
