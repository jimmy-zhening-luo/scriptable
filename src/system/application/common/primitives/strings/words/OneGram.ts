const _NGram: typeof NGram = importModule("ngram/NGram");

class OneGram extends _NGram {

  constructor(
    text: string
  ) {
    super(text, 1);
  }

  static get NGram(): typeof NGram {
    return _NGram;
  }

}

module.exports = OneGram;
