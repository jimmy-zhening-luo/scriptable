const _NGram: typeof NGram = importModule("ngram/NGram");

class OneGram extends _NGram {
  constructor(text: string) {
    try {
      super(text, 1);
    } catch (e) {
      throw new Error(
        `OneGram: constructor: Error creating OneGram object: \n${e}`,
      );
    }
  }

  static get NGram(): typeof NGram {
    try {
      return _NGram;
    } catch (e) {
      throw new ReferenceError(
        `OneGram: NGram: Error importing NGram module: \n${e}`,
      );
    }
  }
}

module.exports = OneGram;
