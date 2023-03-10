abstract class Word {
  readonly word: null | string;

  constructor(word: null | string = "") {
    try {
      this.word = word === null || word === "" ? null : word;
    } catch (e) {
      throw new EvalError(
        `Word: constructor: Error creating Word object: \n${e}`,
      );
    }
  }

  get length(): number {
    try {
      return this.word?.length ?? 0;
    } catch (e) {
      throw new EvalError(`Word: length: Error getting length of Word: \n${e}`);
    }
  }

  get isWord(): boolean {
    try {
      return this.word !== null;
    } catch (e) {
      throw new EvalError(
        `Word: isWord: Error checking if Word is word: \n${e}`,
      );
    }
  }

  get isValid(): boolean {
    try {
      return this.isWord;
    } catch (e) {
      throw new EvalError(
        `Word: isValid: Error checking if Word is valid: \n${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.word ?? "";
    } catch (e) {
      throw new EvalError(
        `Word: toString: Error converting Word to string: \n${e}`,
      );
    }
  }
}

module.exports = Word;
