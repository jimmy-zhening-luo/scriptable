const _Word = importModule("word/Word");
class NGram extends _Word {
    constructor(text, n) {
        var _a;
        const nInt = (_a = new NGram.positiveInt(n).value) !== null && _a !== void 0 ? _a : 0;
        super(nInt === Infinity ?
            text
            : text.length >= nInt ?
                text.slice(0, nInt)
                : String());
        this.n = nInt;
        this.remainder = text.slice(this.length);
    }
    get isValidAndFullyConsumed() {
        return this.isValid && !this.hasRemainder;
    }
    get hasFixedLength() {
        return this.n !== Infinity;
    }
    get hasRemainder() {
        return this.remainder.length > 0;
    }
}
(function (NGram) {
    NGram.positiveInt = importModule("./system/application/common/primitives/numbers/PositiveInteger");
})(NGram || (NGram = {}));
module.exports = NGram;
//# sourceMappingURL=NGram.js.map