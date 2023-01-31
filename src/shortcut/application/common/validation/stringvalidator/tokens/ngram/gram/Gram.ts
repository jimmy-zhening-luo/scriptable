abstract class Gram {
  readonly word: string;
  constructor(
    word: string
  ) {
    this.word = word;
  }

  get length(): number {
    return this.word.length;
  }

  get string(): string {
    return this.word;
  }

  toString(): string {
    return this.string;
  }
}
