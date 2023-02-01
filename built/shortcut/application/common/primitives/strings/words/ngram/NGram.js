const _Word = importModule("word/Word");
class NGram extends _Word {
    constructor(text, n = new NGram.positiveInt(1)) {
        var _a;
        const nInt = (_a = n.value) !== null && _a !== void 0 ? _a : 0;
        super(nInt === Infinity ?
            text
            : text.length >= nInt ?
                text.slice(0, nInt)
                : String());
        this.n = nInt;
        this.remainder = text.slice(this.word.length);
    }
    get isWord() {
        return this.word.length > 0;
    }
    get hasValue() {
        return this.isWord;
    }
    get isValid() {
        return this.hasValue;
    }
    get hasFixedLength() {
        return this.n !== Infinity;
    }
    get hasRemainder() {
        return this.remainder.length > 0;
    }
}
(function (NGram) {
    NGram.positiveInt = importModule("./shortcut/application/common/primitives/numbers/PositiveInteger.ts");
})(NGram || (NGram = {}));
module.exports = NGram;
//# sourceMappingURL=NGram.js.map