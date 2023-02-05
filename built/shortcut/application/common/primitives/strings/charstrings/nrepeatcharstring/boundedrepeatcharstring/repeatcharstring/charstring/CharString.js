class CharString {
    constructor(charstring, ...charsets) {
        this.ofChar = new this.Char(...charsets);
        this.charstring = this
            .qualifies(charstring) ?
            charstring
            : null;
    }
    get Char() {
        return importModule("chars/char/Char");
    }
    get hasValue() {
        return this.charstring !== null;
    }
    get isValid() {
        return this.hasValue;
    }
    get string() {
        var _a;
        return (_a = this.charstring) !== null && _a !== void 0 ? _a : String();
    }
    toString() {
        return this.string;
    }
}
module.exports = CharString;
//# sourceMappingURL=CharString.js.map