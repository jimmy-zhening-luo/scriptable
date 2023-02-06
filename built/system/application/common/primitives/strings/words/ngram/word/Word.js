class Word {
    constructor(word) {
        this.word = (word === null
            || word === undefined
            || word === "") ?
            null
            : word;
    }
    get length() {
        var _a, _b;
        return (_b = (_a = this.word) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
    get isWord() {
        return this.word !== null;
    }
    get isValid() {
        return this.isWord;
    }
    toString() {
        var _a;
        return (_a = this.word) !== null && _a !== void 0 ? _a : "";
    }
}
module.exports = Word;
//# sourceMappingURL=Word.js.map