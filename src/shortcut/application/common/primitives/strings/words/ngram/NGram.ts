class NGram extends Gram {
  readonly n: number;
  readonly remainder: string;
  constructor(
    text: string,
    n: number = 1
  ) {
    n = Number.isNaN(n) ?
      1
      : Number.isFinite(n) ?
        n >= 1 ?
          Math.round(n)
          : 1
        : n !== -Infinity ?
          Infinity
          : 1;
    super(
      n === Infinity ?
        text
        : text.length >= n ?
          text.slice(0, n)
          : String()
    );
    this.n = n;
    this.remainder = text
      .slice(this.word.length);
  }

  get isToken(): boolean {
    return this.word.length > 0;
  }

  get valid(): boolean {
    return this.isToken;
  }

  get deterministic(): boolean {
    return Number.isFinite(this.n);
  }

  get hasRemainder(): boolean {
    return this.remainder.length > 0;
  }
}
