abstract class Word {
  readonly word: string;
  constructor(
    word: string
  ) {
    this.word = word;
  }

  get length(): number {
    return this.word.length;
  }

  get isWord(): boolean {
    return this.length > 0;
  }

  get hasValue(): boolean {
    return this.isWord;
  }

  get string(): string {
    return this.word;
  }

  toString(): string {
    return this.string;
  }
}

module.exports = Word;
