class Words {
  static get OneGram(): typeof OneGram {
    try {
      return importModule("OneGram");
    } catch (e) {
      throw new ReferenceError(
        `Words: OneGram: Error importing OneGram module: ${e}`,
      );
    }
  }

  static get NGram(): typeof NGram {
    try {
      return Words.OneGram.NGram;
    } catch (e) {
      throw new ReferenceError(
        `Words: NGram: Error importing NGram module: ${e}`,
      );
    }
  }

  static get Word(): typeof Word {
    try {
      return Words.NGram.Word;
    } catch (e) {
      throw new ReferenceError(
        `Words: Word: Error importing Word module: ${e}`,
      );
    }
  }

  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return Words.NGram.PositiveInteger;
    } catch (e) {
      throw new ReferenceError(
        `Words: PositiveInteger: Error importing PositiveInteger module: ${e}`,
      );
    }
  }
}

module.exports = Words;
