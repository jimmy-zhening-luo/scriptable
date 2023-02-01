const _NGram: typeof NGram = importModule("ngram/NGram");

class OneGram extends _NGram {
  constructor(
    text: string
  ) {
    super(text, new _NGram.positiveInt(1));
  }
}

module.exports = OneGram;
