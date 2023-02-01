const _NGram = importModule("ngram/NGram");
class OneGram extends _NGram {
    constructor(text) {
        super(text, new _NGram.positiveInt(1));
    }
}
module.exports = OneGram;
//# sourceMappingURL=OneGram.js.map