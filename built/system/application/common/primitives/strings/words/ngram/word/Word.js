class Word {
    constructor(word) {
        this.word = word;
    }
    get length() {
        return this.word.length;
    }
    get isWord() {
        return this.length > 0;
    }
    get hasValue() {
        return this.isWord;
    }
    get string() {
        return this.word;
    }
    toString() {
        return this.string;
    }
}
module.exports = Word;
//# sourceMappingURL=Word.js.map