abstract class Word {
  readonly word: null | string;

  constructor(word?: null | string) {
    this.word =
      word === null || word === undefined || word === "" ? null : word;
  }

  get length(): number {
    return this.word?.length ?? 0;
  }

  get isWord(): boolean {
    return this.word !== null;
  }

  get isValid(): boolean {
    return this.isWord;
  }

  toString(): string {
    return this.word ?? "";
  }
}

module.exports = Word;
