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
    get isValid() {
        return this.charstring !== null;
    }
    toString() {
        var _a;
        return (_a = this.charstring) !== null && _a !== void 0 ? _a : "";
    }
}
module.exports = CharString;
//# sourceMappingURL=CharString.js.map