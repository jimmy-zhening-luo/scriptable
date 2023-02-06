class ValidString {
    constructor(text, { toLower = false, trim = true, trimLeading = [], trimTrailing = [], }, { minLength = 1, maxLength = Infinity }, ...allowedChars) {
        var _a, _b;
        this.raw = text;
        this.cleaned = clean(this.raw, toLower, trim, trimLeading, trimTrailing);
        minLength = (_a = new ValidString._PositiveInteger(maxLength).value) !== null && _a !== void 0 ? _a : 1;
        maxLength = (_b = new ValidString._PositiveInteger(maxLength).value) !== null && _b !== void 0 ? _b : Infinity;
        this.value = (this.cleaned.length > maxLength
            || this.cleaned.length < minLength) ?
            null
            : parseStringToOneGrams(this.cleaned)
                .map(ngram => new ValidString
                ._OneCharString(ngram.toString(), ...allowedChars)).every(charstring => charstring.isValid) ?
                this.cleaned
                : null;
        function clean(text, toLower, trim, trimLeading, trimTrailing) {
            return postTrim(preTrim(trim ?
                toLower ?
                    text.toLowerCase().trim()
                    : text.trim()
                : toLower ?
                    text.toLowerCase()
                    : text, trimLeading), trimTrailing);
            function preTrim(text, wordsToTrim) {
                wordsToTrim
                    .filter(word => word !== "")
                    .forEach(word => {
                    while (text.startsWith(word))
                        text = text.slice(word.length);
                });
                return text;
            }
            function postTrim(text, wordsToTrim) {
                wordsToTrim
                    .filter(word => word !== "")
                    .forEach(word => {
                    while (text.endsWith(word))
                        text = text.slice(0, 0 - word.length);
                });
                return text;
            }
        }
        function parseStringToOneGrams(text) {
            return [...text]
                .map(char => new ValidString._OneGram(char));
        }
    }
    get isValid() {
        return this.value !== null;
    }
    toString() {
        var _a;
        return (_a = this.value) !== null && _a !== void 0 ? _a : "";
    }
}
(function (ValidString) {
    ValidString._OneGram = importModule("words/OneGram");
    ValidString._OneCharString = importModule("charstrings/OneCharString");
    ValidString._PositiveInteger = importModule("./system/application/common/primitives/numbers/PositiveInteger");
})(ValidString || (ValidString = {}));
module.exports = ValidString;
//# sourceMappingURL=ValidString.js.map