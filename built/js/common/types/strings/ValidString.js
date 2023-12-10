"use strict";
class ValidString {
    constructor(candidateString = "", { min = 0, max = Infinity, negate = false, allowedChars = [], } = {}, cleanOptions = {}) {
        try {
            this.cleaned = ValidString._clean(candidateString, cleanOptions);
            this._boundedRepeatCharString = new ValidString.BoundedRepeatCharString(min, max, this.cleaned, negate, ...allowedChars);
        }
        catch (e) {
            throw new Error(`ValidString: constructor: Error creating ValidString object: \n${e}`);
        }
    }
    static get BoundedRepeatCharString() {
        try {
            return importModule("charstrings/BoundedRepeatCharString");
        }
        catch (e) {
            throw new ReferenceError(`ValidString: error importing BoundedRepeatCharString module: \n${e}`);
        }
    }
    static get CharSets() {
        try {
            return ValidString.BoundedRepeatCharString.CharSets;
        }
        catch (e) {
            throw new ReferenceError(`ValidString: error importing CharSets module: \n${e}`);
        }
    }
    static get CharSet() {
        try {
            return ValidString.CharSets.CharSet;
        }
        catch (e) {
            throw new ReferenceError(`ValidString: error importing CharSet module: \n${e}`);
        }
    }
    static get UrlCharSet() {
        try {
            return ValidString.CharSets.UrlCharSet;
        }
        catch (e) {
            throw new ReferenceError(`ValidString: error importing UrlCharSet module: \n${e}`);
        }
    }
    get value() {
        return this._boundedRepeatCharString.value;
    }
    get isValid() {
        try {
            return this.value !== null;
        }
        catch (e) {
            throw new EvalError(`ValidString: isValid: Error getting validity: \n${e}`);
        }
    }
    get min() {
        try {
            return this._boundedRepeatCharString.min;
        }
        catch (e) {
            throw new EvalError(`ValidString: min: Error getting min: \n${e}`);
        }
    }
    get max() {
        try {
            return this._boundedRepeatCharString.max;
        }
        catch (e) {
            throw new EvalError(`ValidString: max: Error getting max: \n${e}`);
        }
    }
    static _clean(raw, { toLower = false, trim = false, trimLeadingExcept = false, trimTrailingExcept = false, trimLeading = [], trimTrailing = [], }) {
        try {
            if (toLower)
                raw = raw.toLowerCase();
            if (trim)
                raw = raw.trim();
            const preprocessed = raw;
            return ValidString._trimEdge(ValidString._trimEdge(preprocessed, trimLeading, ValidString.Edge.Leading, trimLeadingExcept), trimTrailing, ValidString.Edge.Trailing, trimTrailingExcept);
        }
        catch (e) {
            throw new EvalError(`ValidString: clean: Error cleaning string: \n${e}`);
        }
    }
    static _trimEdge(string, wordsToTrim = [], edge, trimExcept = false) {
        try {
            const isLeading = edge === ValidString.Edge.Leading;
            const lookFn = isLeading
                ? "startsWith"
                : "endsWith";
            const lookCondition = !trimExcept;
            wordsToTrim
                .filter(word => word !== "")
                .forEach(word => {
                while (string[lookFn](word) === lookCondition)
                    string = isLeading
                        ? string.slice(trimExcept
                            ? 1
                            : word.length)
                        : string.slice(0, 0 - (trimExcept
                            ? 1
                            : word.length));
            });
            return string;
        }
        catch (e) {
            throw new EvalError(`ValidString: trimEdge: Error trimming edge: \n${e}`);
        }
    }
    toString() {
        var _a;
        try {
            return (_a = this.value) !== null && _a !== void 0 ? _a : "";
        }
        catch (e) {
            throw new EvalError(`ValidString: toString: Error converting to string: \n${e}`);
        }
    }
}
(function (ValidString) {
    let Edge;
    (function (Edge) {
        Edge[Edge["Leading"] = 0] = "Leading";
        Edge[Edge["Trailing"] = 1] = "Trailing";
    })(Edge = ValidString.Edge || (ValidString.Edge = {}));
})(ValidString || (ValidString = {}));
module.exports = ValidString;
