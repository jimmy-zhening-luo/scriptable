abstract class Word {
  readonly word: null | string;

  constructor(word: null | string = "") {
    try {
      this.word = word === null || word === "" ? null : word;
    } catch (e) {
      throw new EvalError(
        `Word: constructor: Error creating Word object: ${e}`,
      );
    }
  }

  get length(): number {
    try {
      return this.word?.length ?? 0;
    } catch (e) {
      throw new EvalError(`Word: length: Error getting length of Word: ${e}`);
    }
  }

  get isWord(): boolean {
    try {
      return this.word !== null;
    } catch (e) {
      throw new EvalError(`Word: isWord: Error checking if Word is word: ${e}`);
    }
  }

  get isValid(): boolean {
    try {
      return this.isWord;
    } catch (e) {
      throw new EvalError(
        `Word: isValid: Error checking if Word is valid: ${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.word ?? "";
    } catch (e) {
      throw new EvalError(
        `Word: toString: Error converting Word to string: ${e}`,
      );
    }
  }
}

module.exports = Word;
