const _NGram: typeof NGram = importModule("ngram/NGram");

class OneGram extends _NGram {
  constructor(
    text: string
  ) {
    super(text, 1);
  }
}

module.exports = OneGram;
