class Words {
  static get OneGram(): typeof OneGram {
    try {
      return importModule("OneGram");
    } catch (e) {
      throw new ReferenceError(
        `Words: OneGram: Error importing OneGram module: \n${e}`,
      );
    }
  }

  static get NGram(): typeof NGram {
    try {
      return Words.OneGram.NGram;
    } catch (e) {
      throw new ReferenceError(
        `Words: NGram: Error importing NGram module: \n${e}`,
      );
    }
  }

  static get Word(): typeof Word {
    try {
      return Words.NGram.Word;
    } catch (e) {
      throw new ReferenceError(
        `Words: Word: Error importing Word module: \n${e}`,
      );
    }
  }

  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return Words.NGram.PositiveInteger;
    } catch (e) {
      throw new ReferenceError(
        `Words: PositiveInteger: Error importing PositiveInteger module: \n${e}`,
      );
    }
  }
}

module.exports = Words;
