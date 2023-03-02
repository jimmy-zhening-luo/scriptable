class Words {
  static get OneGram(): typeof OneGram {
    return importModule("OneGram");
  }

  static get NGram(): typeof NGram {
    return Words.OneGram.NGram;
  }

  static get Word(): typeof Word {
    return Words.NGram.Word;
  }
}

module.exports = Words;
